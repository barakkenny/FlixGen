/* eslint-disable react/prop-types */
import MovieCard from "./MovieCard";

// eslint-disable-next-line react/prop-types
const MovieList = ({ title, movies }) => {
  return (
    <div className="p-6 bg-black text-white">
        <h1 className='text-4xl font-bold py-6'>{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
