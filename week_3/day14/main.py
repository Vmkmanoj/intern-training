from fastapi import FastAPI
from app.router import apiRouter

from app.database.base import Base
from app.database.database import engine
from app.migrations.runner import run_migrations


Base.metadata.create_all(bind=engine)

app = FastAPI()

run_migrations()
app.include_router(apiRouter)
