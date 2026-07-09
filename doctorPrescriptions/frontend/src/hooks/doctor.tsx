import { useMutation, useQuery } from "@tanstack/react-query";
import {doctor} from "../api/doctor"


export const useDoctor = () =>{
  return useQuery(
    {
        queryKey:["doctor"],
        queryFn:()=>doctor(),
        staleTime : 1000 * 60 * 5
      
    }
  ) 
}

