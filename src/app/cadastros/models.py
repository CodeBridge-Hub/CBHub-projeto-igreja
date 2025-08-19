from datetime import date

from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import types, ForeignKey

from src.app.utils import ChoiceType
from .schemas import GENDER_CHOICES, OCUPACAO_CHOICES, ESCOLARIDADE_CHOICES, ESTADO_CIVIL_CHOICES


class Base(DeclarativeBase):
    pass


class CadastroGeral(Base):
    __tablename__ = "cadastro_geral"

    cpf: Mapped[str] = mapped_column(types.String(11), nullable=False, primary_key=True)
    telefone: Mapped[str] = mapped_column(types.String(11), nullable=True)
    name: Mapped[str] = mapped_column(nullable=False)
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

    endereco: Mapped["Endereco"] = relationship(lazy="joined")
    endereco_id: Mapped[int] = mapped_column(ForeignKey("endereco.id"))


class Endereco(Base):
    __tablename__ = "endereco"

    id: Mapped[int] = mapped_column(primary_key=True)
    # residente: Mapped["CadastroGeral"] = relationship(back_populates="endereco")

    bairro: Mapped[str] = mapped_column()
    rua: Mapped[str] = mapped_column()
    numero: Mapped[str] = mapped_column()
