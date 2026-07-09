import { api } from "./axios";


interface Userlogin{
    Email : string,
    Password : string
}

export interface UserRegister{
  Name : string,
  Qualification : string,
  Specialization : string,
  Email : string,
  PhoneNumber : string,
  HospitalName : string,
  RegistrationNumber : string,
  Password : string,
  Roles : string
}




export const login = async (userLogin: Userlogin) => {
  const response = await api.post("/auth/login", userLogin);
  return response.data;
};

export const register = async (userRegister: UserRegister) => {
  const response = await api.post("/auth/register", userRegister);
  return response.data;
};