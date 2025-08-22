from pathlib import Path

from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi import HTTPException
from jinja2 import Environment, FileSystemLoader

from ..utils import exception_details
from .services import ServicoService, SessaoDeAtendimentosService, AtendimentosService, ATENDIMENTO_STATUS_CHOICES
from .schemas import ServicoSchema, CreateServicoSchema, SessaoDeAtendimentoSchema, CreateSessaoDeAtendimentoSchema, CreateAtendimentosSchema, ListAtendimentosQuerySchema

TEMPLATES_DIR = Path(__file__).parent / "templates"
templates = Environment(loader=FileSystemLoader(TEMPLATES_DIR))


async def sessao_admin_page(db: AsyncSession):
    sessao_service = SessaoDeAtendimentosService(db)
    servico_service = ServicoService(db)

    sessoes = await sessao_service.list_sessao()
    servicos = await servico_service.list_servicos()

    template = templates.get_template("sessao_atendimento.html")
    data = {
        "sessoes": sessoes,
        "servicos": servicos,
    }
    return HTMLResponse(template.render(data))


async def atendimentos_admin_page(query: ListAtendimentosQuerySchema, db: AsyncSession):
    sessao_service = SessaoDeAtendimentosService(db)
    servico_service = ServicoService(db)
    atendimentos_service = AtendimentosService(db)

    sessoes = await sessao_service.list_sessao()
    sessoes.reverse()
    servicos = await servico_service.list_servicos()
    results = await atendimentos_service.list_atendimentos(query)

    template = templates.get_template("gerenciar_atendimentos.html")
    data = {
        "arendimento_status_choices": ATENDIMENTO_STATUS_CHOICES,
        "servicos": servicos,
        "sessoes": sessoes,
        "results": results,
    }
    return HTMLResponse(template.render(data))


async def create_servico(servico_data: CreateServicoSchema, db: AsyncSession):
    service = ServicoService(db)
    servico = await service.create(servico_data)

    return JSONResponse(servico.model_dump(mode="json"))


async def list_servico(db: AsyncSession):
    service = ServicoService(db)
    results = await service.list_servicos()

    return JSONResponse([result.model_dump(mode="json") for result in results])


async def create_sessao_atendimento(sessao_data: CreateSessaoDeAtendimentoSchema, db: AsyncSession):
    service = SessaoDeAtendimentosService(db)
    sessao_atendimentos = await service.create(sessao_data)

    return JSONResponse(sessao_atendimentos.model_dump(mode="json"))


async def add_servico(sessao_id: int, servico_id: int, db: AsyncSession):
    try:
        service = SessaoDeAtendimentosService(db)
        sessao_atendimentos = await service.add_servico(sessao_id, servico_id)

        return JSONResponse(sessao_atendimentos.model_dump(mode="json"))

    except (
        service.Exceptions.ServicoNotFound,
        service.Exceptions.SessaoDeAtendimentosNotFound,
    ) as e:
        raise HTTPException(status_code=404, detail=exception_details(e))


async def list_sessao(db: AsyncSession):
    service = SessaoDeAtendimentosService(db)
    results = await service.list_sessao()

    return JSONResponse([result.model_dump(mode="json") for result in results])


async def sessao_info(id: int, db: AsyncSession):
    try:
        service = SessaoDeAtendimentosService(db)
        sessao_atendimentos = await service.read(id)

        return JSONResponse(sessao_atendimentos.model_dump(mode="json"))

    except service.Exceptions.SessaoDeAtendimentosNotFound as e:
        raise HTTPException(status_code=404, detail=exception_details(e))


async def create_atendimento(atendimento_data: CreateAtendimentosSchema, db: AsyncSession):
    try:
        service = AtendimentosService(db)
        atendimento = await service.create(atendimento_data)

        return JSONResponse(atendimento.model_dump(mode="json"))

    except (
        service.Exceptions.SessaoDeAtendimentosNotFound,
        service.Exceptions.ServicoNotFound,
        service.Exceptions.CPFNotFound,
    ) as e:
        raise HTTPException(status_code=404, detail=exception_details(e))

    except (
        service.Exceptions.SessaoDeAtendimentosFinished,
        service.Exceptions.ServicoNotInSessaoDeAtendimentos,
    ) as e:
        raise HTTPException(status_code=403, detail=exception_details(e))


async def read_atendimento(id: int, db: AsyncSession):
    try:
        service = AtendimentosService(db)
        atendimento = await service.read(id)

        return JSONResponse(atendimento.model_dump(mode="json"))

    except service.Exceptions.AtendimentoNotFound as e:
        raise HTTPException(status_code=404, detail=exception_details(e))


async def close_atendimento(id: int, db: AsyncSession):
    try:
        service = AtendimentosService(db)
        atendimento = await service.close_atendimento(id)

        return JSONResponse(atendimento.model_dump(mode="json"))

    except service.Exceptions.AtendimentoNotFound as e:
        raise HTTPException(status_code=404, detail=exception_details(e))

    except service.Exceptions.AtendimentoAlreadyClosed as e:
        raise HTTPException(status_code=403, detail=exception_details(e))
