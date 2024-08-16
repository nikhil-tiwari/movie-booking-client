import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useMovieList } from "../hooks/query/movie";
import MovieModal from "../components/MovieModal";
import { useCreateMovie } from "../hooks/mutations/movie";

const ListedMovie = ({ userProfile }) => {
  const movieList = useMovieList();
  const navigate = useNavigate();
  const { mutateAsync: createMovieAsync } = useCreateMovie();

  const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleSaveMovie = async (movieData) => {
        console.log('Movie data to be saved:', movieData);
        try {
            await createMovieAsync(movieData);
            console.log("Movie saved successfully");
        } catch (err) {
            console.error("Error saving movie", err);
        }
    };

  useEffect(() => {
    if (userProfile?.role !== "admin") {
      navigate("/");
    }
  }, [navigate, userProfile]);

  return (
    <div>
      <Header />
      <div className="p-4 flex flex-wrap justify-between items-center text-neutral-200">
        <h1 className="text-3xl">Available Movies</h1>
        <button onClick={openModal} className="px-8 h-10 bg-green-600 hover:bg-green-700 rounded">
          Add a movie for listing
        </button>
        <input
          type="text"
          placeholder="Search for a movie"
          className="ml-4 p-2 rounded bg-gray-800 text-white"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {movieList?.data?.data.map((movie) => (
          <div
            key={movie._id}
            className="relative bg-gray-700 rounded-lg overflow-hidden shadow-lg"
            style={{
              backgroundImage: `url(${movie.poster || "default-poster-url"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "350px",
            }}
          >
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4">
              <h2 className="text-xl text-white">{movie.title}</h2>
            </div>
          </div>
        ))}
      </div>
      <MovieModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveMovie}/>
    </div>
  );
};

export default ListedMovie;
