from datetime import date

from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import types, ForeignKey, Table, Column

from ..utils import ChoiceType
from ..db import Base
from .schemas import GENDER_CHOICES, OCUPACAO_CHOICES, ESCOLARIDADE_CHOICES, ESTADO_CIVIL_CHOICES


dependentes_association = Table(
    "dependentes_association",
    Base.metadata,
    Column("responsavel_id", ForeignKey("cadastro_geral.cpf"), primary_key=True),
    Column("dependente_id", ForeignKey("cadastro_geral.cpf"), primary_key=True),
)


class CadastroGeral(Base):
    __tablename__ = "cadastro_geral"

    cpf: Mapped[str] = mapped_column(types.String(11), nullable=False, primary_key=True)
    telefone: Mapped[str] = mapped_column(types.String(11), nullable=True)
    nome: Mapped[str] = mapped_column(nullable=False)
    dt_nascimento: Mapped[date] = mapped_column(nullable=False)
    sexo: Mapped[str] = mapped_column(
        ChoiceType(choices=GENDER_CHOICES),
        nullable=False,
    )
    estado_civil: Mapped[str] = mapped_column(
        ChoiceType(choices=ESTADO_CIVIL_CHOICES),
        nullable=False,
    )
    escolaridade: Mapped[str] = mapped_column(
        ChoiceType(choices=ESCOLARIDADE_CHOICES),
        nullable=False,
    )
    ocupacao: Mapped[str] = mapped_column(
        ChoiceType(choices=OCUPACAO_CHOICES),
        nullable=False,
    )
    ocupacao_text: Mapped[str] = mapped_column(nullable=True)

    # O2O com Endereco
    endereco: Mapped["Endereco"] = relationship(lazy="joined")
    endereco_id: Mapped[int] = mapped_column(ForeignKey("endereco.id"))

    # M2M com CadastroGeral
    responsaveis: Mapped[list["CadastroGeral"]] = relationship(
        "CadastroGeral",
        secondary=dependentes_association,
        primaryjoin=cpf == dependentes_association.c.dependente_id,
        secondaryjoin=cpf == dependentes_association.c.responsavel_id,
        back_populates="dependentes",
        lazy="selectin",
    )

    # M2M com CadastroGeral
    dependentes: Mapped[list["CadastroGeral"]] = relationship(
        "CadastroGeral",
        secondary=dependentes_association,
        primaryjoin=cpf == dependentes_association.c.responsavel_id,
        secondaryjoin=cpf == dependentes_association.c.dependente_id,
        back_populates="responsaveis",
        lazy="selectin",
    )

    # M2O com Atendimentos
    atendimentos: Mapped[list["Atendimentos"]] = relationship(back_populates="cadastro_geral", lazy="selectin")


class Endereco(Base):
    __tablename__ = "endereco"

    id: Mapped[int] = mapped_column(primary_key=True)

    bairro: Mapped[str] = mapped_column()
    rua: Mapped[str] = mapped_column()
    numero: Mapped[str] = mapped_column()
