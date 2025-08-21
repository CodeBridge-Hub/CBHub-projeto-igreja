from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from ..dependencies import get_db
from .schemas import CreateCadastroGeralSchema, CPFValidator, ResposavelDependenteCPFValidator
from .views import create_cadastro, read_cadastro, cadastro_form, add_dependente, list_cadastro, create_and_redirect_to_dependentes, add_dependente_page


router = APIRouter(prefix="/cadastros", tags=["cadastros"])


@router.get("/", tags=["páginas"])
async def cadastro_form_route(
    responsavel: Optional[str] = Query(default=None, min_length=11, max_length=11, regex=r"^\d+$"),
):
    return await cadastro_form(responsavel)


@router.post("/create_and_redirect_to_dependentes/", tags=["páginas"])
async def create_cadastro_redirect_route(
    user_data: CreateCadastroGeralSchema,
    responsavel: Optional[str] = Query(default=None, min_length=11, max_length=11, regex=r"^\d+$"),
    db: AsyncSession = Depends(get_db),
):
    return await create_and_redirect_to_dependentes(user_data, db, responsavel)


@router.get("/dependentes/{cpf}/", tags=["páginas"])
async def manage_dependentes_route(
    cpf: CPFValidator = Depends(),
    db: AsyncSession = Depends(get_db),
):
    return await add_dependente_page(cpf.cpf, db)


@router.post("/create/")
async def create_cadastro_route(
    user_data: CreateCadastroGeralSchema,
    db: AsyncSession = Depends(get_db),
):
    return await create_cadastro(user_data, db)


@router.post("/add_dependente/")
async def add_dependente_route(
    cpfs: ResposavelDependenteCPFValidator,
    db: AsyncSession = Depends(get_db),
):
    return await add_dependente(cpfs.responsavel_cpf, cpfs.dependente_cpf, db)


@router.get("/read/{cpf}/")
async def read_cadastro_route(
    cpf: CPFValidator = Depends(),
    db: AsyncSession = Depends(get_db),
):
    return await read_cadastro(cpf.cpf, db)


@router.get("/list/")
async def list_cadastro_route(db: AsyncSession = Depends(get_db)):
    return await list_cadastro(db)
