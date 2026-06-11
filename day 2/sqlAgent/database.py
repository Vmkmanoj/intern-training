from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from sqlalchemy.engine import URL

DATABASE_URL = URL.create(
    drivername="postgresql+psycopg2",
    username="postgres",
    password="admin@123",
    host="localhost",
    port=5432,
    database="myProject",
)

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():   
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

