from pydantic import BaseModel, EmailStr, Field



class UserRegister(BaseModel):
    Name: str = Field(..., min_length=2, max_length=100)
    Qualification: str = Field(..., max_length=100)
    Specialization: str 
    Email: EmailStr
    PhoneNumber: str 
    HospitalName: str 
    RegistrationNumber: str 
    Password: str = Field(..., min_length=8, max_length=100)
    Roles : str


class UserLogin(BaseModel):
    Email : str
    Password : str
