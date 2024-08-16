import React, { useState } from "react";

const MovieModal = ({ isOpen, onClose, onSave }) => {
  const [movieDetails, setMovieDetails] = useState({
    title: "",
    description: "",
    releaseYear: "",
    director: "",
    imdbRating: "",
    rating: "",
    runtime: "",
    poster: "",
    cast: "",
    genre: "",
    languages: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!movieDetails.title) newErrors.title = "Title is required";
    if (!movieDetails.description) newErrors.description = "Description is required";
    if (!movieDetails.releaseYear) newErrors.releaseYear = "Release Year is required";
    if (!movieDetails.imdbRating) newErrors.imdbRating = "IMDb Rating is required";
    if (!movieDetails.rating) newErrors.rating = "Rating is required";
    if (!movieDetails.runtime) newErrors.runtime = "Runtime is required";
    if (!movieDetails.cast) newErrors.cast = "Cast is required";
    if (!movieDetails.genre) newErrors.genre = "Genre is required";
    if (!movieDetails.languages) newErrors.languages = "Languages are required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateFields()) {
      const formattedDetails = {
        ...movieDetails,
        cast: movieDetails.cast.split(",").map((item) => item.trim()),
        genre: movieDetails.genre.split(",").map((item) => item.trim()),
        languages: movieDetails.languages.split(",").map((item) => item.trim()),
        director: movieDetails.director || null,
        poster: movieDetails.poster || null,
      };
      onSave(formattedDetails);
      resetForm();
    }
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setMovieDetails({
      title: "",
      description: "",
      releaseYear: "",
      director: "",
      imdbRating: "",
      rating: "",
      runtime: "",
      poster: "",
      cast: "",
      genre: "",
      languages: ""
    });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-900 text-neutral-200 rounded-lg overflow-auto max-h-[90vh] w-11/12 md:w-2/3 lg:w-1/2 p-6">
        <h2 className="text-2xl mb-4">Add/Update Movie</h2>
        <div className="space-y-4">
          {Object.keys(errors).length > 0 && (
            <div className="bg-red-600 text-white p-2 rounded mb-4">
              <ul>
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <label className="block mb-2">Title <span className="text-red-600">*</span></label>
            <input
              type="text"
              name="title"
              value={movieDetails.title}
              onChange={handleChange}
              required
              className={`w-full p-2 bg-gray-800 rounded border ${errors.title ? 'border-red-600' : 'border-gray-700'}`}
            />
          </div>
          <div>
            <label className="block mb-2">Description <span className="text-red-600">*</span></label>
            <textarea
              name="description"
              value={movieDetails.description}
              onChange={handleChange}
              required
              className={`w-full p-2 bg-gray-800 rounded border ${errors.description ? 'border-red-600' : 'border-gray-700'}`}
            />
          </div>
          <div>
            <label className="block mb-2">Release Year <span className="text-red-600">*</span></label>
            <input
              type="text"
              name="releaseYear"
              value={movieDetails.releaseYear}
              onChange={handleChange}
              required
              className={`w-full p-2 bg-gray-800 rounded border ${errors.releaseYear ? 'border-red-600' : 'border-gray-700'}`}
            />
          </div>
          <div>
            <label className="block mb-2">Director</label>
            <input
              type="text"
              name="director"
              value={movieDetails.director}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 rounded border border-gray-700"
            />
          </div>
          <div>
            <label className="block mb-2">IMDb Rating <span className="text-red-600">*</span></label>
            <input
              type="text"
              name="imdbRating"
              value={movieDetails.imdbRating}
              onChange={handleChange}
              required
              className={`w-full p-2 bg-gray-800 rounded border ${errors.imdbRating ? 'border-red-600' : 'border-gray-700'}`}
            />
          </div>
          <div>
            <label className="block mb-2">Rating <span className="text-red-600">*</span></label>
            <input
              type="text"
              name="rating"
              value={movieDetails.rating}
              onChange={handleChange}
              required
              className={`w-full p-2 bg-gray-800 rounded border ${errors.rating ? 'border-red-600' : 'border-gray-700'}`}
            />
          </div>
          <div>
            <label className="block mb-2">Runtime <span className="text-red-600">*</span></label>
            <input
              type="text"
              name="runtime"
              value={movieDetails.runtime}
              onChange={handleChange}
              required
              className={`w-full p-2 bg-gray-800 rounded border ${errors.runtime ? 'border-red-600' : 'border-gray-700'}`}
            />
          </div>
          <div>
            <label className="block mb-2">Poster</label>
            <input
              type="text"
              name="poster"
              value={movieDetails.poster}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 rounded border border-gray-700"
            />
          </div>
          <div>
            <label className="block mb-2">Cast (comma-separated) <span className="text-red-600">*</span></label>
            <input
              type="text"
              name="cast"
              value={movieDetails.cast}
              onChange={handleChange}
              required
              className={`w-full p-2 bg-gray-800 rounded border ${errors.cast ? 'border-red-600' : 'border-gray-700'}`}
            />
          </div>
          <div>
            <label className="block mb-2">Genre (comma-separated) <span className="text-red-600">*</span></label>
            <input
              type="text"
              name="genre"
              value={movieDetails.genre}
              onChange={handleChange}
              required
              className={`w-full p-2 bg-gray-800 rounded border ${errors.genre ? 'border-red-600' : 'border-gray-700'}`}
            />
          </div>
          <div>
            <label className="block mb-2">Languages (comma-separated) <span className="text-red-600">*</span></label>
            <input
              type="text"
              name="languages"
              value={movieDetails.languages}
              onChange={handleChange}
              required
              className={`w-full p-2 bg-gray-800 rounded border ${errors.languages ? 'border-red-600' : 'border-gray-700'}`}
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
