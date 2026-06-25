from pydantic import BaseModel
from datetime import datetime

class UsersData(BaseModel):
    userName: str
    emailId: str
    about: str
    createdby: str
    updatedby: str


