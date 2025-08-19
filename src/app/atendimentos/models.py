from datetime import datetime

from sqlalchemy import Table, Column, ForeignKey, types
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

from ..utils import ChoiceType
from ..db import Base
from .schemas import ATENDIMENTO_STATUS_CHOICES


servico_sessao_association = Table(
    "servico_sessao_association",
    Base.metadata,
    Column("sessao_atendimento_id", ForeignKey("sessao_atendimentos.id"), primary_key=True),
    Column("servico_id", ForeignKey("servico.id"), primary_key=True),
)


class Servico(Base):
    __tablename__ = "servico"

    id: Mapped[int] = mapped_column(primary_key=True)
    nome: Mapped[str] = mapped_column()


class SessaoDeAtendimentos(Base):
    __tablename__ = "sessao_atendimentos"

    id: Mapped[int] = mapped_column(primary_key=True)
    inicio: Mapped[datetime] = mapped_column()
    fim: Mapped[datetime] = mapped_column()
    atendimento_count: Mapped[int] = mapped_column(default=0)

    # M2M com Servico
    servicos_disponiveis: Mapped[list["Servico"]] = relationship(
        "Servico",
        secondary=servico_sessao_association,
        primaryjoin=id == servico_sessao_association.c.sessao_atendimento_id,
        lazy="selectin",
    )

    # M2O com Atendimentos
    atendimentos: Mapped[list["Atendimentos"]] = relationship(back_populates="sessao_atendimento", lazy="selectin")


class Atendimentos(Base):
    __tablename__ = "atendimentos"

    id: Mapped[int] = mapped_column(primary_key=True)
    ordem_chegada: Mapped[int]
    status: Mapped[str] = mapped_column(ChoiceType(choices=ATENDIMENTO_STATUS_CHOICES))
    dt_encerramento: Mapped[datetime] = mapped_column(nullable=True)

    # O2O com Servico
    servico: Mapped["Servico"] = relationship(lazy="joined")
    servico_id: Mapped[int] = mapped_column(ForeignKey("servico.id"))

    # O2M com CadastroGeral
    cadastro_geral: Mapped["CadastroGeral"] = relationship(back_populates="atendimentos", lazy="joined")
    cadastro_geral_cpf: Mapped[str] = mapped_column(ForeignKey("cadastro_geral.cpf"))

    # O2M com SessaoDeAtendimentos
    sessao_atendimento: Mapped["SessaoDeAtendimentos"] = relationship(back_populates="atendimentos", lazy="joined")
    sessao_atendimento_id: Mapped[int] = mapped_column(ForeignKey("sessao_atendimentos.id"))
