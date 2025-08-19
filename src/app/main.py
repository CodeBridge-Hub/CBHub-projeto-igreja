from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse

from . import config
from . import testapp, cadastros, atendimentos
from .db import init_db
from .schemas import rebuild_schemas


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    rebuild_schemas()
    yield


app = FastAPI(debug=config.DEBUG, lifespan=lifespan)


@app.get("/static/{subfolder}/{file}")
async def static(subfolder: str, file: str):
    static_path = Path(config.STATIC_DIR) / subfolder / file

    if not static_path.exists():
        raise HTTPException(status_code=404, detail="File not found")

    return FileResponse(static_path)


app.include_router(testapp.router)
app.include_router(cadastros.router)
app.include_router(atendimentos.router)
