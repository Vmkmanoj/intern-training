from pydantic import BaseModel



class UserLoginSuccess(BaseModel):
    access_token : str
    token_type : str


class UserLogin(BaseModel):
    email : str
    password : str

class UserRegisterSuccess(BaseModel):
    message : str

class Users(BaseModel):
    username : str
    email : str
    password : str
    profilepic : str
    isOnline : bool