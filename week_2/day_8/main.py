from fastapi import FastAPI
from app import apiRouter
app = FastAPI()

app.include_router(
    apiRouter
)
