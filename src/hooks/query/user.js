import { useQuery } from "@tanstack/react-query"
import { apiV1Instance } from "../../api";


export const useCurrentUser = () => {
    const query = useQuery({
        queryKey: ['user'],
        queryFn: async function() {
            const { data } = await apiV1Instance.get('/auth/profile');
            return data.profile;
        },
        staleTime: Infinity,
        cacheTime: Infinity,
    })
    return {...query, user: query.data};
}