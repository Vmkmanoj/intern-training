from pydantic import BaseModel



class CreateConvertion(BaseModel):
    name : str
    isgroup : bool

class message(BaseModel):
    message : str

    

