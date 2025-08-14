from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse

from . import config
from . import testapp

app = FastAPI(debug=True)


@app.get("/static/{subfolder}/{file}")
async def static(subfolder: str, file: str):
    static_path = Path(config.STATIC_DIR) / subfolder / file
    print(static_path)

    if not static_path.exists():
        raise HTTPException(status_code=404, detail="File not found")

    return FileResponse(static_path)


app.include_router(testapp.router)
