import React from "react";
import "./Cell.css";

const Cell = ({ color, onClick }) => {
  const bgColor =
    color === "red" ? "cell red" : color === "yellow" ? "cell yellow" : "cell";
  return <button className={bgColor} onClick={onClick}></button>;
};

export default Cell;
