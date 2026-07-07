from fastapi import FastAPI
from app.router import apiRouter

from app.database.base import Base
from app.database.database import engine
from app.migrations.runner import run_migrations
from fastapi.middleware.cors import CORSMiddleware


Base.metadata.create_all(bind=engine)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

run_migrations()
app.include_router(apiRouter)
