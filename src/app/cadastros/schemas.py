from datetime import date
from pydantic import BaseModel, field_validator, ValidationError, Field
from typing import Optional

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


class CreateCadastroGeral(BaseModel):
    cpf: str = Field(..., min_length=11, max_length=11)
    telefone: str = Field(..., min_length=11, max_length=11)
    name: str
    dt_nascimento: date
    sexo: str
    estado_civil: str
    escolaridade: str
    ocupacao: str
    ocupacao_text: Optional[str] = None

    @field_validator("cpf", "telefone")
    def validate_only_digits(cls, v):
        if not v.isdigit():
            raise ValueError("Field must contain only numbers")
        return v

    @field_validator("sexo")
    def validate_sexo(cls, v):
        if v not in GENDER_CHOICES.values():
            raise ValueError(f"Invalid sexo choice. Must be one of {list(GENDER_CHOICES.values())}")
        return v

    @field_validator("estado_civil")
    def validate_estado_civil(cls, v):
        if v not in ESTADO_CIVIL_CHOICES.values():
            raise ValueError(f"Invalid estado_civil choice. Must be one of {list(ESTADO_CIVIL_CHOICES.values())}")
        return v

    @field_validator("escolaridade")
    def validate_escolaridade(cls, v):
        if v not in ESCOLARIDADE_CHOICES.values():
            raise ValueError(f"Invalid escolaridade choice. Must be one of {list(ESCOLARIDADE_CHOICES.values())}")
        return v

    @field_validator("ocupacao")
    def validate_ocupacao(cls, v):
        if v not in OCUPACAO_CHOICES.values():
            raise ValueError(f"Invalid ocupacao choice. Must be one of {list(OCUPACAO_CHOICES.values())}")
        return v

    @field_validator("ocupacao_text")
    def validate_ocupacao_text(cls, v, info):
        if info.data.get("ocupacao") == "Outra" and not v:
            raise ValueError("ocupacao_text is required when ocupacao is 'Outra'")
        elif info.data.get("ocupacao") != "Outra" and v:
            raise ValueError("ocupacao_text is only required when ocupacao is 'Outra'")

        return v
