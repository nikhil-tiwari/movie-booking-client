import { useQuery } from "@tanstack/react-query"
import { apiV1Instance } from "../../api";


export const useCurrentTheatre = () => {
    const query = useQuery({
        queryKey: ['theatre'],
        queryFn: async function() {
            const { data } = await apiV1Instance.get('/theatres');
            return data;
        },
        staleTime: Infinity,
        cacheTime: Infinity,
    })
    return {...query, theatre: query.data};
}