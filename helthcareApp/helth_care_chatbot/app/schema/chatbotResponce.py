from pydantic import BaseModel


class ChatBotResponce(BaseModel):
    message : str


class UserRequset(BaseModel):
    userMesage : str