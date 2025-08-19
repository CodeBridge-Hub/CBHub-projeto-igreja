from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError

from .models import CadastroGeral, Endereco
from .schemas import CreateCadastroGeralSchema, CadastroGeralSchema


class CadastroGeralService:
    class Exceptions:
        class CPFAlreadyUsed(Exception):
            """O CPF especificado já está cadastrado"""

        class CPFNotFound(Exception):
            """Nenhum cadastro encontrado com o CPF especificado"""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, user_data: CreateCadastroGeralSchema):
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

        await self.db.refresh(cadastro_geral)
        return CadastroGeralSchema.model_validate(cadastro_geral)

    async def add_dependente(self, responsavel_cpf: str, dependente_cpf: str):
        responsavel = await self.db.get(CadastroGeral, responsavel_cpf)
        dependente = await self.db.get(CadastroGeral, dependente_cpf)
        if responsavel is None or dependente is None:
            msg = "Nenhum cadastro encontrado com o CPF especificado. Ambos CPFs precisam estar cadastrados antes de adicionar dependentes."
            raise self.Exceptions.CPFNotFound(msg)

        await self.db.refresh(responsavel)
        responsavel.dependentes.append(dependente)
        await self.db.commit()

        await self.db.refresh(responsavel)
        return CadastroGeralSchema.model_validate(responsavel)

    async def list_cadastro(self):
        stmt = select(CadastroGeral)
        results = await self.db.execute(stmt)

        # recarrega cada um dos resultados a fim de salvar suas relações de dependente
        # e responsável no cache antes de convertê-los em models pydantic
        refreshed_results = []
        for result in results.scalars().all():
            await self.db.refresh(result)
            refreshed_results.append(result)

        return [CadastroGeralSchema.model_validate(result) for result in refreshed_results]
