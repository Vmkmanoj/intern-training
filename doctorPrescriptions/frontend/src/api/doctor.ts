import { api } from "./axios";



export const doctor = async () => {
  const response = await api.get("/doctor/get-all-doctor",{
    headers:{
        "Authorization" : `bearer ${localStorage.getItem("bearer")}`
    }
  });
  return response.data;
};
