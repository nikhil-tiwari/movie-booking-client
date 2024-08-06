import { useMutation } from "@tanstack/react-query";
import { apiV1Instance } from "../../api";


export const useCreateTheatre = () => {
    const mutation = useMutation({
        mutationFn: async function ({ name, location: { city, lat = null, long = null, address }}) {
            const { data } = await apiV1Instance.post('/theatres/create', { name: name, location: { city: city, lat: lat, long: long, address: address }});
            return data;
        },
    })
    return mutation;
}