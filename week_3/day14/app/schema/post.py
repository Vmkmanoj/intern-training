from pydantic import BaseModel
from datetime import datetime
from uuid import UUID



class Poster(BaseModel):
    userId : UUID
    description : str
    # createdAt : datetime
    createdBy : str
    updatedBy : str
    # updatedAt : datetime

