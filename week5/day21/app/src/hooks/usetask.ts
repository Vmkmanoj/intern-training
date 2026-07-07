import { useQuery , useQueryClient ,useMutation} from "@tanstack/react-query";
import { taskData ,postTaskData, getAllPost} from "../api/task";

export const useGetAllTask = () =>{
    return useQuery(
        {
            queryKey : ["task"],
            queryFn : ()=>getAllPost(),
            staleTime:1000*60*1
        }
    )

}

export const useTask =(id: string)=>{

    return useQuery(
        {
            queryKey:["tasks",id],
            queryFn :()=>taskData(id),
            staleTime:1000*60*1
        }
    )
}

export const useCreatePost = () =>{
    const queryClient = useQueryClient();

    return useMutation(
        {
            mutationFn:postTaskData,

            onSuccess:()=>{
                queryClient.invalidateQueries({
                    queryKey: ["tasks"],
                })
            }
        }
    )

}

