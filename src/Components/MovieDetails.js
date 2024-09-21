import { useEffect, useState } from "react";
import Loader from "./Loader";
import StarRating from "./StarRating";

const KEY = "f84fc31d";

export default  function MovieDetails({ selectedId,handleCloseMovieDetails, handleAddMovie }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');

 




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


  function handleAdd(){
     const newMovie={
    Title:title,
    Year:year,
    Poster:poster,
    //To split the number from the string
    Runtime: Number(runtime.replace(/\D/g, '')),
    imdbRating,
    userRating
  }

  handleAddMovie(newMovie)



  }
 



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
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                   
                  
                  />
                 
                    <button className="btn-add" onClick={handleAdd}>
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