from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

from . import config

engine = create_async_engine(config.DATABASE_URL)
SessionLocal = async_sessionmaker(engine)


async def init_db():
    async with engine.begin() as conn:
        pass
