from pathlib import Path
from zoneinfo import ZoneInfo

TIMEZONE = ZoneInfo("America/Sao_Paulo")
DATABASE_URL = "sqlite+aiosqlite:///sqlite3.db"
STATIC_DIR = str(Path(__file__).parent / "static")
DEBUG = False
