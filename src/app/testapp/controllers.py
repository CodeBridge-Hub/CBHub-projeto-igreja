from fastapi.routing import APIRouter

from .views import testapp

router = APIRouter(tags=["testapp"])


@router.get("/")
async def testapp_route(name: str = "World"):
    return await testapp(name)
