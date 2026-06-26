from pydantic import BaseModel


class CreateSession(BaseModel):
    session_name: str
    createdby: str
