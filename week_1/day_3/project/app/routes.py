from fastapi import APIRouter

from .api.teacher import router as Teacher_router



api_router = APIRouter()

api_router.include_router(
    Teacher_router,
    prefix ="/teacher",
    tags = ["CreateTeacher"]
)


