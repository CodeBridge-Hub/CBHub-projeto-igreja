from datetime import datetime

from sqlalchemy import Table, Column, ForeignKey
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


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

    servicos_disponiveis: Mapped[list["Servico"]] = relationship(
        "Servico",
        secondary=servico_sessao_association,
        primaryjoin=id == servico_sessao_association.c.sessao_atendimento_id,
        lazy="selectin",
    )
