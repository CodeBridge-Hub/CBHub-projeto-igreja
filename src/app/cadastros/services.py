from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError

from .models import CadastroGeral, Endereco
from .schemas import CadastroGeralSchema, EnderecoSchema


class CadastroGeralService:
    class Exceptions:
        class CPFAlreadyUsed(Exception):
            """O CPF especificado já está cadastrado"""

        class CPFNotFound(Exception):
            """Nenhum cadastro encontrado com o CPF especificado"""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, user_data: CadastroGeralSchema):
        try:
            cadastro_geral = CadastroGeral(**user_data.model_dump())
            cadastro_geral.endereco = Endereco(**user_data.endereco.model_dump())
            self.db.add(cadastro_geral)
            await self.db.commit()
            await self.db.refresh(cadastro_geral)

            return CadastroGeralSchema.model_validate(cadastro_geral)

        except IntegrityError:
            msg = "O CPF especificado já está cadastrado"
            raise self.Exceptions.CPFAlreadyUsed(msg)

    async def read(self, cpf: str):
        cadastro_geral = await self.db.get(CadastroGeral, cpf)
        if cadastro_geral is None:
            msg = "Nenhum cadastro encontrado com o CPF especificado"
            raise self.Exceptions.CPFNotFound(msg)

        return CadastroGeralSchema.model_validate(cadastro_geral)
