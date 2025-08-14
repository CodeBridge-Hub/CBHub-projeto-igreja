import sys

import uvicorn

if __name__ == "__main__":
    command = sys.argv[1]

    match command:
        case "runserver":
            from src.app.main import app

            uvicorn.run(app)
