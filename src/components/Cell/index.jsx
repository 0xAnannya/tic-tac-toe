import React from "react";
import "./Cell.css";

const Cell = ({ color, onClick, winner }) => {
  const bgColor =
    color === "red" ? "cell red" : color === "yellow" ? "cell yellow" : "cell";
  return (
    <button
      disabled={winner ? true : false}
      className={bgColor}
      onClick={onClick}
    ></button>
  );
};

export default Cell;
