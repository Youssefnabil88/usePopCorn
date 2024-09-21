import WatchedMovie from './WatchedMovie'

export default  function WatchedMoviesList({ watched}) {
  return (
    <ul className="list box">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}
