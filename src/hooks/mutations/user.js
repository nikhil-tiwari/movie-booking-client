import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiV1Instance } from "../../api"

export const useUserSignin = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async function ({ email, password }) {
            const data = await apiV1Instance.post('/auth/signin', { email: email, password: password });
            return data;
        },
        onSuccess: async ({ data }) => {
            // validate
            const token = data.token;
            localStorage.setItem('token', token);
            await queryClient.invalidateQueries({ queryKey: 'user' })
        }
    })
    return mutation;
}