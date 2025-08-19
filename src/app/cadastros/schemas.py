from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel, field_validator, model_validator, Field, ConfigDict

GENDER_CHOICES = {
    1: "M",
    2: "F",
}

ESTADO_CIVIL_CHOICES = {
    1: "Solteiro(a)",
    2: "Casado(a)",
    3: "União estável",
    4: "Divorciado(a)",
    5: "Viúvo(a)",
}

ESCOLARIDADE_CHOICES = {
    1: "Analfabeto",
    2: "Educação Infantil",
    3: "Ensino Fundamental",
    4: "Ensino Médio",
    5: "Ensino Superior Incompleto",
    6: "Ensino Superior Completo",
}

OCUPACAO_CHOICES = {
    1: "Desempregado(a)",
    2: "Autônomo(a)",
    3: "Estudante",
    4: "Outra",
    5: "Do lar/Dona de casa",
    6: "Vigia/Segurança",
    7: "Eletricista",
    8: "Doméstica/Diarista/Babá",
    9: "Vendedor",
    10: "Vendedor Ambulante/Camelô",
    11: "Secretária/ Administrativo",
    12: "Auxiliar de Serviços Gerais",
    13: "Pescador",
    14: "Costureira",
    15: "Professor(a)",
}


# TODO: adicionar validação usando os dígitos verificadores do CPF
class CreateCadastroGeralSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    cpf: str = Field(..., min_length=11, max_length=11)
    telefone: str = Field(..., min_length=11, max_length=11)
    name: str
    dt_nascimento: date
    sexo: str
    estado_civil: str
    escolaridade: str
    ocupacao: str
    ocupacao_text: Optional[str] = None

    endereco: "EnderecoSchema"

    @field_validator("cpf", "telefone")
    def validate_only_digits(cls, v):
        if not v.isdigit():
            raise ValueError("Este campo deve conter apenas números")
        return v

    @field_validator("sexo")
    def validate_sexo(cls, v):
        if v not in GENDER_CHOICES.values():
            raise ValueError(f"Valor inválido para o atributo 'sexo'. Escolha um dos valores da lista: {list(GENDER_CHOICES.values())}")
        return v

    @field_validator("estado_civil")
    def validate_estado_civil(cls, v):
        if v not in ESTADO_CIVIL_CHOICES.values():
            raise ValueError(f"Valor inválido para o atributo 'estado_civil'. Escolha um dos valores da lista: {list(ESTADO_CIVIL_CHOICES.values())}")
        return v

    @field_validator("escolaridade")
    def validate_escolaridade(cls, v):
        if v not in ESCOLARIDADE_CHOICES.values():
            raise ValueError(f"Valor inválido para o atributo 'escolaridade'. Escolha um dos valores da lista: {list(ESCOLARIDADE_CHOICES.values())}")
        return v

    @field_validator("ocupacao")
    def validate_ocupacao(cls, v):
        if v not in OCUPACAO_CHOICES.values():
            raise ValueError(f"Valor inválido para o atributo 'ocupacao'. Escolha um dos valores da lista: {list(OCUPACAO_CHOICES.values())}")
        return v

    @field_validator("ocupacao_text")
    def validate_ocupacao_text(cls, v, info):
        if info.data.get("ocupacao") == "Outra" and not v:
            raise ValueError("'ocupacao_text' é obrigatório quando 'ocupacao' é 'Outra'")
        elif info.data.get("ocupacao") != "Outra" and v:
            raise ValueError("'ocupacao_text' só é necessário quando 'ocupacao' é 'Outra'")

        return v


class CadastroGeralSchema(CreateCadastroGeralSchema):
    model_config = ConfigDict(from_attributes=True)

    responsaveis: Optional[list["CreateCadastroGeralSchema"]] = []
    dependentes: Optional[list["CreateCadastroGeralSchema"]] = []
    atendimentos: Optional[list["AtendimentoCadastroGeralSchema"]]


class AtendimentoCadastroGeralSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    ordem_chegada: int
    status: str
    dt_encerramento: datetime

    servico: "ServicoSchema"

    @field_validator("status")
    def validate_cadastro_geral_cpf(cls, v):
        from ..atendimentos.schemas import ATENDIMENTO_STATUS_CHOICES

        if v not in ATENDIMENTO_STATUS_CHOICES.values():
            raise ValueError(f"Valor inválido para o atributo 'status'. Escolha um dos valores da lista: {list(ATENDIMENTO_STATUS_CHOICES.values())}")
        return v


# TODO: adicionar validação usando os dígitos verificadores do CPF
class CPFValidator(BaseModel):
    cpf: str = Field(..., min_length=11, max_length=11)

    @field_validator("cpf")
    def validate_only_digits(cls, v):
        if not v.isdigit():
            raise ValueError("Este campo deve conter apenas números")
        return v


class ResposavelDependenteCPFValidator(BaseModel):
    responsavel_cpf: str = Field(..., min_length=11, max_length=11)
    dependente_cpf: str = Field(..., min_length=11, max_length=11)

    @field_validator("responsavel_cpf", "dependente_cpf")
    def validate_only_digits(cls, v):
        if not v.isdigit():
            raise ValueError("Este campo deve conter apenas números")
        return v

    @model_validator(mode="after")
    def check_cpfs_are_different(self):
        if self.responsavel_cpf == self.dependente_cpf:
            raise ValueError("O CPF do responsável deve ser diferente do CPF do dependente")
        return self


class EnderecoSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    bairro: str
    rua: str
    numero: str

    @field_validator("numero")
    def validate_only_digits(cls, v):
        if not v.isdigit():
            raise ValueError("Este campo deve conter apenas números")
        return v
