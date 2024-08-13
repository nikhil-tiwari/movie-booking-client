import { useQuery } from "@tanstack/react-query"
import { apiV1Instance } from "../../api";


export const useMovieList = () => {
    const query = useQuery({
        queryKey: ['movie'],
        queryFn: async function() {
            const { data } = await apiV1Instance.get('/movies');
            return data;
        },
        staleTime: Infinity,
        cacheTime: Infinity,
    })
    return {...query, movie: query.data};
}