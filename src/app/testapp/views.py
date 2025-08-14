from pathlib import Path

from fastapi.responses import HTMLResponse
from jinja2 import Environment, FileSystemLoader

TEMPLATES_DIR = Path(__file__).parent / "templates"
templates = Environment(loader=FileSystemLoader(TEMPLATES_DIR))


async def testapp(name: str):
    data = {"name": name}
    template = templates.get_template("testapp.html")
    return HTMLResponse(template.render(data))
