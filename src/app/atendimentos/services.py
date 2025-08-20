from datetime import datetime
import asyncio

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from .. import config
from ..cadastros.models import CadastroGeral
from .models import Servico, SessaoDeAtendimentos, Atendimentos
from .schemas import CreateServicoSchema, CreateSessaoDeAtendimentoSchema, ServicoSchema, SessaoDeAtendimentoSchema, CreateAtendimentosSchema, AtendimentosSchema, ATENDIMENTO_STATUS_CHOICES

create_atendimento_lock = asyncio.Lock()


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


class AtendimentosService:
    def __init__(self, db: AsyncSession):
        self.db = db

    class Exceptions:
        class AtendimentoNotFound(Exception):
            """Nenhum atendimento encontrado com o id especificado"""

        class AtendimentoAlreadyClosed(Exception):
            """O atendimento especificado já foi encerrado"""

        class SessaoDeAtendimentosNotFound(Exception):
            """Nenhuma sessão de atendimentos foi encontrada com o id especificado"""

        class ServicoNotFound(Exception):
            """Nenhum serviço foi encontrada com o id especificado"""

        class CPFNotFound(Exception):
            """Nenhum cadastro encontrado com o CPF especificado"""

        class SessaoDeAtendimentosFinished(Exception):
            """A sessão de atendimento especificada já se encerrou"""

        class ServicoNotInSessaoDeAtendimentos(Exception):
            """O serviço especificado não está disponível na sessão de atendimentos especificada"""

    async def create(self, atendimento_data: CreateAtendimentosSchema):
        async with create_atendimento_lock:
            tasks = [
                self.db.get(SessaoDeAtendimentos, atendimento_data.sessao_atendimento_id),
                self.db.get(CadastroGeral, atendimento_data.cadastro_geral_cpf),
                self.db.get(Servico, atendimento_data.servico_id),
            ]
            sessao_atendimento: SessaoDeAtendimentos
            cadastro_geral: CadastroGeral
            servico: Servico
            sessao_atendimento, cadastro_geral, servico = await asyncio.gather(*tasks)

            # erros relacionados a registros inexistentes
            if sessao_atendimento is None:
                msg = "Nenhuma sessão de atendimentos foi encontrada com o id especificado"
                raise self.Exceptions.SessaoDeAtendimentosNotFound(msg)
            if cadastro_geral is None:
                msg = "Nenhum cadastro encontrado com o CPF especificado"
                raise self.Exceptions.CPFNotFound(msg)
            if servico is None:
                msg = "Nenhum serviço foi encontrada com o id especificado"
                raise self.Exceptions.ServicoNotFound(msg)

            # erros relacionados à sessão de atendimentos
            await self.db.refresh(sessao_atendimento)

            fim_datetime = sessao_atendimento.fim.replace(tzinfo=config.TIMEZONE)
            if fim_datetime < datetime.now(config.TIMEZONE):
                msg = "A sessão de atendimento especificada já se encerrou"
                raise self.Exceptions.SessaoDeAtendimentosFinished(msg)

            if servico not in sessao_atendimento.servicos_disponiveis:
                msg = "O serviço especificado não está disponível na sessão de atendimentos especificada"
                raise self.Exceptions.ServicoNotInSessaoDeAtendimentos(msg)

            # instancia o atendimento e seta valores padrão
            atendimento = Atendimentos()
            atendimento.ordem_chegada = sessao_atendimento.atendimento_count + 1
            atendimento.cadastro_geral_cpf = cadastro_geral.cpf
            atendimento.sessao_atendimento_id = sessao_atendimento.id
            atendimento.servico_id = servico.id
            atendimento.status = ATENDIMENTO_STATUS_CHOICES[1]

            # atualiza a contagem de atendimentos na sessão atual
            sessao_atendimento.atendimento_count += 1

            # salva alterações no banco de dados
            self.db.add(atendimento)
            await self.db.commit()

        await self.db.refresh(atendimento)
        return AtendimentosSchema.model_validate(atendimento)

    async def read(self, id: int):
        atendimento = await self.db.get(Atendimentos, id)
        if atendimento is None:
            msg = "Nenhum atendimento encontrado com o id especificado"
            raise self.Exceptions.AtendimentoNotFound(msg)

        await self.db.refresh(atendimento)
        return AtendimentosSchema.model_validate(atendimento)

    async def close_atendimento(self, id: int):
        atendimento = await self.db.get(Atendimentos, id)
        if atendimento is None:
            msg = "Nenhum atendimento encontrado com o id especificado"
            raise self.Exceptions.AtendimentoNotFound(msg)

        if atendimento.status == ATENDIMENTO_STATUS_CHOICES[2]:
            msg = "O atendimento especificado já foi encerrado"
            raise self.Exceptions.AtendimentoAlreadyClosed(msg)

        atendimento.status = ATENDIMENTO_STATUS_CHOICES[2]
        atendimento.dt_encerramento = datetime.now(config.TIMEZONE)

        await self.db.commit()

        await self.db.refresh(atendimento)
        return AtendimentosSchema.model_validate(atendimento)
