from app.database.database import engine
from app.database.base import Base
from fastapi import FastAPI
from app.routes import api_router
# from app.model.chatModel import mainSheet
from fastapi.middleware.cors import CORSMiddleware
from app.migrations.runner import run_migrations

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

# mainSheet()
run_migrations()









