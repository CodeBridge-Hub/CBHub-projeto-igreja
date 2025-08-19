from datetime import datetime
from pydantic import BaseModel, field_validator, model_validator, Field, ConfigDict
from typing import Optional


class CreateServicoSchema(BaseModel):
    nome: str


class ServicoSchema(CreateServicoSchema):
    model_config = ConfigDict(from_attributes=True)

    id: int


class CreateSessaoDeAtendimentoSchema(BaseModel):
    inicio: datetime
    fim: datetime


class SessaoDeAtendimentoSchema(CreateSessaoDeAtendimentoSchema):
    model_config = ConfigDict(from_attributes=True)

    id: int
    servicos_disponiveis: Optional[list["ServicoSchema"]] = []
