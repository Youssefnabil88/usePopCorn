import { useEffect, useState } from "react";
import NavBar, { Logo, Result, SearchBar } from "./Components/NavBar";
import Main from "./Components/Main";

import Summary from './Components/Summary'
import Box from "./Components/Box";
import MovieList from "./Components/MovieList";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import MovieDetails from "./Components/MovieDetails";
import WatchedMoviesList from "./Components/WatchedMoviesList";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },

];

const KEY = "dc768bc";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedID] = useState(null);

  const tempQuery = "joker";

  function handleSelectMovie(movieID) {
    movieID === selectedId ? setSelectedID(null):  setSelectedID(movieID);
  }

  function handleCloseMovieDetails(){
    setSelectedID(null);
  }

  function handleAddMovie(newMovie){
    setWatched([...watched, newMovie])
    setSelectedID(null);
  }

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        if (!res.ok) {
          throw new Error("something went wrong with fetching movies");
        }

        const data = await res.json();

        if (data.Response === "False") {
          throw new Error("Movie not found");
        }
        setMovies(data.Search || []);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, [query]);

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <Result movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {error ? (
            <Error>{error}</Error>
          ) : isLoading ? (
            <Loader />
          ) : (
            <MovieList handleSelectMovie={handleSelectMovie} movies={movies} />
          )}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails selectedId={selectedId} handleCloseMovieDetails={handleCloseMovieDetails} handleAddMovie={handleAddMovie}/>
          ) : (
            <>
              <Summary watched={watched} /> <WatchedMoviesList watched={watched} />
            </>
          )}  
        </Box>
      </Main>
    </>
  );
}
