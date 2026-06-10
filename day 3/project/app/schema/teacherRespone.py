from pydantic import BaseModel


class TeacherRespone(BaseModel):
    name: str
    age: int
    address: str
