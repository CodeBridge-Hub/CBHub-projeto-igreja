from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession

from .schemas import CreateCadastroGeral
from src.app.dependencies import get_db

router = APIRouter(prefix="/cadastros", tags=["cadastros"])


@router.post("/create/", response_model=CreateCadastroGeral)
async def create_cadastro_route(user_data: CreateCadastroGeral, db: AsyncSession = Depends(get_db)):
    return JSONResponse(user_data.model_dump(mode="json"))
