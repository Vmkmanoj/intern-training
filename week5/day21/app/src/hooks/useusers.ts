import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../api/users";

export const usersGetTask = (id : string) => {
    return useQuery(
        {
            queryKey: ["users", id],
            queryFn: () => getUserData(id),
            staleTime: 1000 * 60 * 5
        }
    )
}