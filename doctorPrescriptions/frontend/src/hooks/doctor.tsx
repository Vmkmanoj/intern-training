import { useQuery } from "@tanstack/react-query";
import { doctor, type DoctorApiResponse } from "../api/doctor";

export const useDoctor = () => {
  return useQuery<DoctorApiResponse>({
    queryKey: ["doctor"],
    queryFn: () => doctor(),
    staleTime: 1000 * 60 * 5,
  });
};

