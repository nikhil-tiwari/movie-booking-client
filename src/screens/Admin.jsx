import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useCurrentTheatre } from "../hooks/query/theatre";
import { useMovieList } from "../hooks/query/movie";

const Admin = ({ userProfile }) => {
  const navigate = useNavigate();
  const theatre = useCurrentTheatre();
  const { data: movieList } = useMovieList();
  const [currentTheatre, setCurrentTheatre] = useState(null);

  useEffect(() => {
    if (userProfile?.role !== "admin") {
      navigate("/");
    }
  }, [userProfile, navigate]);

  const handleTheatreSelection = (theatreId) => {
    const selectedTheatre = theatre?.data?.data.find((t) => t._id === theatreId);
    setCurrentTheatre(selectedTheatre);
  };

  const getMovieTitleById = (movieId) => {
    const movie = movieList?.data.find((m) => m._id === movieId);
    return movie ? movie.title : "Unknown Movie";
  };

  const handleAddMovie = () => {
    navigate('/admin/addmovie');
  }

  return (
    <div className="bg-gray-900 text-neutral-200 min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <div className="border-r-4 border-gray-700 w-1/4 p-4 bg-gray-800">
          {theatre?.data?.data.map(
            (value) =>
              value.createdBy === userProfile?.id && (
                <button
                  key={value._id}
                  onClick={() => handleTheatreSelection(value._id)}
                  className="w-full mb-4 p-2 bg-blue-600 hover:bg-blue-700 rounded text-center"
                >
                  {value.name}
                </button>
              )
          )}
          <button className="w-full mt-4 p-2 bg-green-600 hover:bg-green-700 rounded">
            Add New Theatre
          </button>
        </div>
        <div className="w-3/4 p-4 bg-gray-800">
          {currentTheatre ? (
            <>
              <div className="flex flex-wrap justify-between items-center">
                <h1 className="text-3xl mb-4">{currentTheatre.name}</h1>
                <button className="px-8 h-10 bg-green-600 hover:bg-green-700 rounded" onClick={handleAddMovie}>Add a movie</button>
              </div>
              <div>
                <h2 className="text-xl mb-2">Movies Listed:</h2>
                <div className="flex flex-wrap p-4">
                  {currentTheatre.movieListed.length > 0 ? (
                    currentTheatre.movieListed.map((movieId, index) => (
                      <div key={index+1} className="mb-2 p-2 w-64 h-32 bg-gray-700 rounded">
                        <button>{getMovieTitleById(movieId)}</button>
                      </div>
                    ))
                  ) : (
                    <p className="mt-4">No movies listed for this theatre.</p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <p className="text-2xl">Please select a theatre to see its listed movies.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
