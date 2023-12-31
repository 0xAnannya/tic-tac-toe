import React from "react";
import "./Board.css";
import Cell from "../Cell";

const Board = ({ handleCellClick, board, winner }) => (
  <div className="board">
    {board.map((row, rowIndex) => (
      <div key={rowIndex} className="board__row">
        {row.map((color, colIndex) => (
          <Cell
            key={colIndex}
            color={color}
            onClick={() => handleCellClick(rowIndex, colIndex)}
            winner={winner}
          />
        ))}
      </div>
    ))}
  </div>
);

export default Board;
