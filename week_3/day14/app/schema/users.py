from pydantic import BaseModel


class UsersData(BaseModel):
    userName: str
    emailId: str
    about: str
    createdby: str
    updatedby: str
