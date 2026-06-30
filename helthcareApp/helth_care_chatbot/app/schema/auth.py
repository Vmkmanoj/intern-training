from pydantic import BaseModel

class UserRegiser(BaseModel):
    name : str
    email : str
    password : str


class login(BaseModel):
    email : str
    password : str
