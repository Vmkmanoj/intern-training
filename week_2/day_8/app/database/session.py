from sqlalchemy.orm import sessionmaker
from app.database.get_db import engine

sessionLocal = sessionmaker(
    autoflush=False,
    bind = engine,
    autocommit = False
)

def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()


        