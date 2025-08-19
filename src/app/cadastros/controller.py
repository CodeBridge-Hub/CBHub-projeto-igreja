from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from ..dependencies import get_db
from .schemas import CadastroGeralSchema, CPFValidator
from .views import create_cadastro, read_cadastro, cadastro_form


router = APIRouter(prefix="/cadastros", tags=["cadastros"])


@router.get("/")
async def cadastro_form_route():
    return await cadastro_form()


@router.post("/create/")
async def create_cadastro_route(user_data: CadastroGeralSchema, db: AsyncSession = Depends(get_db)):
    return await create_cadastro(user_data, db)


@router.get("/read/{cpf}/")
async def read_cadastro_route(cpf: CPFValidator = Depends(), db: AsyncSession = Depends(get_db)):
    return await read_cadastro(cpf.cpf, db)
