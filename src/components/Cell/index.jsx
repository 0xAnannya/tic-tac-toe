import React from "react";
import "./Cell.css";

const Cell = ({ color, onClick, winner }) => {
  const cellClasses = [
    "cell",
    color === "red" ? "cell--red" : color === "yellow" ? "cell--yellow" : "",
  ].join(" ");

  return (
    <button
      disabled={winner ? true : false}
      className={cellClasses}
      onClick={onClick}
    ></button>
  );
};

export default Cell;
