import { api } from "./axios";

export interface DoctorApiRecord {
  Id: string;
  Name: string;
}

export interface DoctorApiResponse {
  data: DoctorApiRecord[];
}

export const doctor = async (): Promise<DoctorApiResponse> => {
  const response = await api.get("/doctor/get-all-doctor", {
    headers: {
      "Authorization": `bearer ${localStorage.getItem("bearer")}`,
    },
  });
  return response.data;
};
