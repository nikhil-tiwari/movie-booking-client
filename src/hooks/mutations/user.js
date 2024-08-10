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
        },
        onError: async (error) => {
            console.error('Signin error:', error.response?.data || error.message);
        }
    })
    return mutation;
}


export const useUserSignup = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async function ({ firstName, lastName, email, password, city }) {
            console.log({
                firstName: firstName, 
                lastName: lastName, 
                email: email, 
                password: password, 
                location: { city: city }
            });
            const data = await apiV1Instance.post('/auth/signup', { 
                firstName: firstName, 
                lastName: lastName, 
                email: email, 
                password: password, 
                location: {city: city} 
            });
            return data;
        },
        onSuccess: async ({ data }) => {
            console.log("Data from mutation", data);
            const token = data.token;
            localStorage.setItem('token', token);
            await queryClient.invalidateQueries({ queryKey: 'user' });
        },
        onError: (error) => {
            // Handle error logic
            console.error('Signup error:', error);
        }
    });

    return mutation;
};