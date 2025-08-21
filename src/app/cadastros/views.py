from pathlib import Path

from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi import HTTPException
from jinja2 import Environment, FileSystemLoader

from ..utils import exception_details
from .schemas import CreateCadastroGeralSchema
from .services import CadastroGeralService
from .schemas import GENDER_CHOICES, ESTADO_CIVIL_CHOICES, ESCOLARIDADE_CHOICES, OCUPACAO_CHOICES


TEMPLATES_DIR = Path(__file__).parent / "templates"
templates = Environment(loader=FileSystemLoader(TEMPLATES_DIR))


# views relacionadas às páginas
async def cadastro_form(responsavel: str | None = None):
    template = templates.get_template("criar_cadastro.html")
    data = {
        "responsavel": responsavel,
        "gender_choices": GENDER_CHOICES,
        "estado_civil_choices": ESTADO_CIVIL_CHOICES,
        "escolaridade_choices": ESCOLARIDADE_CHOICES,
        "ocupacao_choices": OCUPACAO_CHOICES,
    }
    return HTMLResponse(template.render(data))


async def create_and_redirect_to_dependentes(user_data: CreateCadastroGeralSchema, db: AsyncSession, responsavel_cpf: str | None = None):
    try:
        service = CadastroGeralService(db)
        cadastro_geral = await service.create(user_data)

        if responsavel_cpf:
            redirect_url = f"/cadastros/dependentes/{responsavel_cpf}/"
            await service.add_dependente(responsavel_cpf, cadastro_geral.cpf)
        else:
            redirect_url = f"/cadastros/dependentes/{cadastro_geral.cpf}/"

        return JSONResponse({"redirect_url": redirect_url})

    except service.Exceptions.CPFAlreadyUsed as e:
        raise HTTPException(
            status_code=403,
            detail=exception_details(e),
        )


async def add_dependente_page(cpf: str, db: AsyncSession):
    try:
        service = CadastroGeralService(db)
        cadastro = await service.read(cpf)

        template = templates.get_template("add_dependente.html")
        data = {
            "responsavel_cpf": cpf,
            "dependentes": cadastro.dependentes,
        }

        return HTMLResponse(template.render(data))
    except service.Exceptions.CPFNotFound as e:
        raise HTTPException(
            status_code=404,
            detail=exception_details(e),
        )


async def create_cadastro(user_data: CreateCadastroGeralSchema, db: AsyncSession):
    try:
        service = CadastroGeralService(db)
        cadastro_geral = await service.create(user_data)

    except service.Exceptions.CPFAlreadyUsed as e:
        raise HTTPException(
            status_code=403,
            detail=exception_details(e),
        )

    return JSONResponse(cadastro_geral.model_dump(mode="json"), status_code=201)


async def read_cadastro(cpf: str, db: AsyncSession):
    try:
        service = CadastroGeralService(db)
        cadastro_geral = await service.read(cpf)
        return JSONResponse(cadastro_geral.model_dump(mode="json"))

    except service.Exceptions.CPFNotFound as e:
        raise HTTPException(
            status_code=404,
            detail=exception_details(e),
        )


async def add_dependente(responsavel_cpf: str, dependente_cpf: str, db: AsyncSession):
    try:
        service = CadastroGeralService(db)
        cadastro_geral = await service.add_dependente(responsavel_cpf, dependente_cpf)
        return JSONResponse(cadastro_geral.model_dump(mode="json"), status_code=200)

    except service.Exceptions.CPFNotFound as e:
        raise HTTPException(
            status_code=404,
            detail=exception_details(e),
        )

    except (
        service.Exceptions.SameCPFError,
        service.Exceptions.DependenteAlreadyRegistered,
    ) as e:
        raise HTTPException(
            status_code=403,
            detail=exception_details(e),
        )


async def list_cadastro(db: AsyncSession):
    service = CadastroGeralService(db)
    results = await service.list_cadastro()

    return JSONResponse([result.model_dump(mode="json") for result in results])
