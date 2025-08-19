from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from .models import Servico, SessaoDeAtendimentos
from .schemas import CreateServicoSchema, CreateSessaoDeAtendimentoSchema, ServicoSchema, SessaoDeAtendimentoSchema


class ServicoService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, servico_data: CreateServicoSchema):
        servico = Servico(**servico_data.model_dump())
        self.db.add(servico)
        await self.db.commit()

        await self.db.refresh(servico)
        return ServicoSchema.model_validate(servico)

    async def list_servicos(self):
        stmt = select(Servico)
        results = await self.db.execute(stmt)
        results = [ServicoSchema.model_validate(result) for result in results.scalars().all()]

        return results


class SessaoDeAtendimentosService:
    class Exceptions:
        class SessaoDeAtendimentosNotFound(Exception):
            """Nenhuma sessão de atendimentos foi encontrada com o id especificado"""

        class ServicoNotFound(Exception):
            """Nenhum serviço foi encontrada com o id especificado"""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, sessao_data: CreateSessaoDeAtendimentoSchema):
        sessao_atendimentos = SessaoDeAtendimentos(**sessao_data.model_dump())
        self.db.add(sessao_atendimentos)
        await self.db.commit()

        await self.db.refresh(sessao_atendimentos)
        return SessaoDeAtendimentoSchema.model_validate(sessao_atendimentos)

    async def add_servico(self, sessao_id: int, servico_id: int):
        sessao = await self.db.get(SessaoDeAtendimentos, sessao_id)
        servico = await self.db.get(Servico, servico_id)

        if sessao is None:
            msg = "Nenhuma sessão de atendimentos foi encontrada com o id especificado"
            raise self.Exceptions.SessaoDeAtendimentosNotFound(msg)
        if servico is None:
            msg = "Nenhum serviço foi encontrada com o id especificado"
            raise self.Exceptions.ServicoNotFound(msg)

        sessao.servicos_disponiveis.append(servico)
        await self.db.commit()

        await self.db.refresh(sessao)
        return SessaoDeAtendimentoSchema.model_validate(sessao)

    async def list_sessao(self):
        stmt = select(SessaoDeAtendimentos)
        results = await self.db.execute(stmt)
        results = [SessaoDeAtendimentoSchema.model_validate(result) for result in results.scalars().all()]

        return results

    async def read(self, id: int):
        sessao = await self.db.get(SessaoDeAtendimentos, id)
        if sessao is None:
            msg = "Nenhuma sessão de atendimentos foi encontrada com o id especificado"
            raise self.Exceptions.SessaoDeAtendimentosNotFound(msg)

        self.db.refresh(sessao)

        return SessaoDeAtendimentoSchema.model_validate(sessao)
