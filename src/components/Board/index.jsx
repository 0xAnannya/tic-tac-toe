import React from "react";
import "./Board.css";
import Cell from "../Cell";

const Board = ({ handleCellClick, board }) => (
  <div className="board">
    {board.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((color, colIndex) => (
          <Cell
            key={colIndex}
            color={color}
            onClick={() => handleCellClick(rowIndex, colIndex)}
          />
        ))}
      </div>
    ))}
  </div>
);

export default Board;
