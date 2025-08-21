from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends

from ..dependencies import get_db
from .schemas import CreateServicoSchema, CreateSessaoDeAtendimentoSchema, CreateAtendimentosSchema
from .views import create_servico, list_servico, create_sessao_atendimento, add_servico, list_sessao, sessao_info, create_atendimento, read_atendimento, close_atendimento


router = APIRouter(prefix="/atendimentos", tags=["gestão de atendimentos"])


# rotas relacionadas a serviços
@router.post("/servico/", tags=["serviços"])
async def create_servico_route(servico_data: CreateServicoSchema, db: AsyncSession = Depends(get_db)):
    return await create_servico(servico_data, db)


@router.get("/servico/", tags=["serviços"])
async def list_servico_route(db: AsyncSession = Depends(get_db)):
    return await list_servico(db)


# rotas relacionadas a sessões de atendimentos
@router.post("/sessao/", tags=["sessão de atendimentos"])
async def create_sessao_atendimento_route(
    sessao_data: CreateSessaoDeAtendimentoSchema,
    db: AsyncSession = Depends(get_db),
):
    return await create_sessao_atendimento(sessao_data, db)


@router.post("/sessao/add_servico", tags=["sessão de atendimentos"])
async def add_servico_route(sessao_id: int, servico_id: int, db: AsyncSession = Depends(get_db)):
    return await add_servico(sessao_id, servico_id, db)


@router.get("/sessao/", tags=["sessão de atendimentos"])
async def sessao_list_route(db: AsyncSession = Depends(get_db)):
    return await list_sessao(db)


@router.get("/sessao/{id}", tags=["sessão de atendimentos"])
async def sessao_info_route(id: int, db: AsyncSession = Depends(get_db)):
    return await sessao_info(id, db)


# rotas relacionadas a atendimentos
@router.post("/atendimento/", tags=["atendimentos"])
async def create_atendimento_route(atendimento_data: CreateAtendimentosSchema, db: AsyncSession = Depends(get_db)):
    return await create_atendimento(atendimento_data, db)


@router.get("/atendimento/{id}/", tags=["atendimentos"])
async def read_atendimento_route(id: int, db: AsyncSession = Depends(get_db)):
    return await read_atendimento(id, db)


@router.post("/atendimento/close/{id}/", tags=["atendimentos"])
async def read_atendimento_route(id: int, db: AsyncSession = Depends(get_db)):
    return await close_atendimento(id, db)
