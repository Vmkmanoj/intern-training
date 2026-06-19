from pydantic import BaseModel



class ApiSuccessResponce(BaseModel):
    message : str
    success : bool


class UserDetails(BaseModel):
    id : int
    name : str
    age : int