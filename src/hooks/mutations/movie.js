import { useMutation } from "@tanstack/react-query";
import { apiV1Instance } from "../../api";


export const useCreateMovie = () => {
    const mutation = useMutation({
        mutationFn: async function ({ title, description, releaseYear, director = null, poster = null, rating, runtime, cast, genre, languages, imdbRating }) {
            const { data } = await apiV1Instance.post('/movies/create', { title: title, description: description, releaseYear: releaseYear, director: director, poster: poster, rating: rating, runtime: runtime, cast: cast, genre: genre, languages: languages, imdbRating: imdbRating });
            return data;
        },
    })
    return mutation;
}