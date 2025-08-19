from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends

from ..dependencies import get_db
from .schemas import CreateServicoSchema, CreateSessaoDeAtendimentoSchema
from .views import create_servico, list_servico, create_sessao_atendimento, add_servico, list_sessao, sessao_info


router = APIRouter(prefix="/atendimentos", tags=["atendimentos"])


@router.post("/servico/")
async def create_servico_route(servico_data: CreateServicoSchema, db: AsyncSession = Depends(get_db)):
    return await create_servico(servico_data, db)


@router.get("/servico/")
async def list_servico_route(db: AsyncSession = Depends(get_db)):
    return await list_servico(db)


@router.post("/sessao/")
async def create_sessao_atendimento_route(sessao_data: CreateSessaoDeAtendimentoSchema, db: AsyncSession = Depends(get_db)):
    return await create_sessao_atendimento(sessao_data, db)


@router.post("/sessao/add_servico")
async def add_servico_route(sessao_id: int, servico_id: int, db: AsyncSession = Depends(get_db)):
    return await add_servico(sessao_id, servico_id, db)


@router.get("/sessao/")
async def sessao_list_route(db: AsyncSession = Depends(get_db)):
    return await list_sessao(db)


@router.get("/sessao/{id}")
async def sessao_info_route(id: int, db: AsyncSession = Depends(get_db)):
    return await sessao_info(id, db)
