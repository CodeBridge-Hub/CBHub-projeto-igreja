from pathlib import Path

DATABASE_URL = "sqlite+aiosqlite:///sqlite3.db"
STATIC_DIR = str(Path(__file__).parent / "static")
DEBUG = False
