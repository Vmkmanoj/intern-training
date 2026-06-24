from sqlalchemy import create_engine 
from sqlalchemy.orm import sessionmaker


DATA_BASE = "postgresql://postgres:admin%40123@localhost:5432/myproject"

engine = create_engine(DATA_BASE)

sessionLocal = sessionmaker(
    autoflush= False,
    autocommit = False,
    bind= engine
)

def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()
        
    
    

