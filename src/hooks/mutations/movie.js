import { useMutation } from "@tanstack/react-query";
import { apiV1Instance } from "../../api";
import { useQueryClient } from "@tanstack/react-query";


export const useCreateMovie = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async function (moviePayload) {
            const { data } = await apiV1Instance.post('/movies/create', moviePayload);
            return data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: 'movie' })
        },
        onError: async (error) => {
            console.error('Signin error:', error.response?.data || error.message);
        }
    })
    return mutation;
}