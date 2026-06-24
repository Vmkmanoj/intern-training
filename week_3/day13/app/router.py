from fastapi import APIRouter
from app.rotutes.post import postRouter
from app.rotutes.users import userPoster



apiRouter = APIRouter()

apiRouter.include_router(
    postRouter,
    prefix="/post",
    tags=["post"]
)

apiRouter.include_router(
    userPoster,
    prefix="/users",
    tags=["users"]
)





