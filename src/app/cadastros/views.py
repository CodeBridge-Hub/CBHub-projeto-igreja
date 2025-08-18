from pathlib import Path

from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi import HTTPException
from jinja2 import Environment, FileSystemLoader

from ..utils import exception_details
from .schemas import CadastroGeralSchema
from .services import CadastroGeralService
from .schemas import GENDER_CHOICES, ESTADO_CIVIL_CHOICES, ESCOLARIDADE_CHOICES, OCUPACAO_CHOICES


TEMPLATES_DIR = Path(__file__).parent / "templates"
templates = Environment(loader=FileSystemLoader(TEMPLATES_DIR))


async def create_cadastro(user_data: CadastroGeralSchema, db: AsyncSession):
    try:
        service = CadastroGeralService(db)
        await service.create(user_data)

    except service.Exceptions.CPFAlreadyUsed as e:
        raise HTTPException(
            status_code=403,
            detail=exception_details(e),
        )

    return JSONResponse(user_data.model_dump(mode="json"), status_code=201)


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


async def cadastro_form():
    template = templates.get_template("criar_cadastro.html")
    data = {
        "gender_choices": GENDER_CHOICES,
        "estado_civil_choices": ESTADO_CIVIL_CHOICES,
        "escolaridade_choices": ESCOLARIDADE_CHOICES,
        "ocupacao_choices": OCUPACAO_CHOICES,
    }
    return HTMLResponse(template.render(data))
