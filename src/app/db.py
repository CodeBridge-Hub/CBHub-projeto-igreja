from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

from . import config

engine = create_async_engine(config.DATABASE_URL)
SessionLocal = async_sessionmaker(engine)


async def init_db():
    from . import cadastros, atendimentos

    async with engine.begin() as conn:
        await conn.run_sync(cadastros.Base.metadata.create_all)
        await conn.run_sync(atendimentos.Base.metadata.create_all)
