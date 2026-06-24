from fastapi import FastAPI
from app.router import apiRouter

from app.database.base import Base
from app.database.database import engine


Base.metadata.create_all(bind=engine)

app = FastAPI()


app.include_router(apiRouter)

