from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.responses import JSONResponse
from fastapi import HTTPException

from ..utils import exception_details
from .schemas import CadastroGeralSchema
from .services import CadastroGeralService


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
