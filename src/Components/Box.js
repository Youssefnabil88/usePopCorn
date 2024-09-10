import { useState } from "react";
import Movie from "./Movie";
import { Summary } from "./WhatcedList";

export default function Box({children}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
<button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
