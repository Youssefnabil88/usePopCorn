import { useEffect, useState } from "react";
import Loader from "./Loader";
import StarRating from "./StarRating";

const KEY = "f84fc31d";

export default  function MovieDetails({ selectedId, onAddWatched, watched,handleCloseMovieDetails }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
 




  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;






  // function handleAdd() {
  //   const newWatchedMovie = {
  //     imdbID: selectedId,
  //     title,
  //     year,
  //     poster,
  //     imdbRating: Number(imdbRating),
  //     runtime: Number(runtime.split(" ").at(0)),
  //     userRating
  //   };

  //   onAddWatched(newWatchedMovie);
  //   onCloseMovie();
  
  // }


  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
        // console.log(`Clean up effect for movie ${title}`);
      };
    },
    [title]
  );

  return (
    <div className="details box ">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleCloseMovieDetails}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>


          <section>
            <div className="rating">
              
               
                  <StarRating
                    numberOfStars={10}
                    size={24}
                  
                  />
                 
                    <button className="btn-add" >
                      + Add to list
                    </button>
            
              
                <p>
                  You rated with movie  <span>⭐️</span>
                </p>
            
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}