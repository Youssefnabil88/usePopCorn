import { useState } from "react";
import BoxList from "./BoxList";
import WatchedList from "./WhatcedList";

export default function Main({ movies, tempWatchedData }) {
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <main className="main">
      <BoxList movies={movies} />
      <WatchedList tempWatchedData={tempWatchedData} watched={watched} />
    </main>
  );
}
