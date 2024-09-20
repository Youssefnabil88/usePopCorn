import Movie from "./Movie";

export default function MovieList({ movies, handleSelectMovie }) {
  return (
    <div className="box">
      <ul className="list">
        {movies?.map((movie) => (
          <Movie movie={movie} key={movie.imdbID} handleSelectMovie={handleSelectMovie}/>
        ))}
      </ul>
    </div>
  );
}
