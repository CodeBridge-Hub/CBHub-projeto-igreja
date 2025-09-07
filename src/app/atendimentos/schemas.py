from datetime import datetime
from typing import Optional

from pydantic import BaseModel, field_validator, model_validator, Field, ConfigDict


ATENDIMENTO_STATUS_CHOICES = {
    1: "Pendente",
    2: "Encerrado",
}


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
    atendimento_count: int
    servicos_disponiveis: Optional[list["ServicoSchema"]] = []
    # atendimentos: Optional[list["AtendimentosSessaoDeAtendimentoSchema"]]


class AtendimentosSessaoDeAtendimentoSchema(BaseModel):
    id: int
    ordem_chegada: int
    status: str
    dt_encerramento: datetime

    cadastro_geral: "CadastroGeralSchema"
    servico: ServicoSchema


class CreateAtendimentosSchema(BaseModel):
    sessao_atendimento_id: int
    cadastro_geral_cpf: str = Field(..., min_length=11, max_length=11)
    servico_id: int

    @field_validator("cadastro_geral_cpf")
    def validate_only_digits(cls, v):
        if not v.isdigit():
            raise ValueError("Este campo deve conter apenas números")
        return v


class AtendimentosSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    ordem_chegada: int
    status: str
    dt_encerramento: Optional[datetime] = None

    sessao_atendimento: SessaoDeAtendimentoSchema
    servico: ServicoSchema
    cadastro_geral: "CreateCadastroGeralSchema"


class ListAtendimentosQuerySchema(BaseModel):
    status: Optional[str] = None
    sessao_id: Optional[int | str] = None
    servico_id: Optional[int | str] = None
    cpf: Optional[str] = Field(None, min_length=11, max_length=11)
