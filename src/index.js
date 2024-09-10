import React from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./Components/StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StarRating />
    <StarRating color="red" size={29} />
    <StarRating color="red" size={29} />
    <StarRating arr={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']}/>
  </React.StrictMode>
);
