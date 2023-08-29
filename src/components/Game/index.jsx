import React, { useEffect, useState } from "react";
import "./Game.css";
import Board from "../Board";
import { Alert } from "@material-ui/lab";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

const Game = () => {
  const [tiles, setTiles] = useState(3);
  const [board, setBoard] = useState(Array(tiles).fill(Array(tiles).fill("")));
  const [currentPlayer, setCurrentPlayer] = useState("red");
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    setWinner(null);
    setDraw(false);
  }, [tiles]);

  const handleCountChange = (count) => {
    const totalTiles = count + tiles;
    if (totalTiles >= 3) {
      setTiles(totalTiles);
      setBoard(Array(totalTiles).fill(Array(totalTiles).fill("")));
    }
  };

  const checkWin = (player, row, col, newBoard) => {
    // Horizontal Win
    let horizontalCount = 0;
    for (let c = 0; c < tiles; c++) {
      if (newBoard[row][c] === player) {
        horizontalCount++;
        if (horizontalCount === tiles) {
          return true;
        }
      } else {
        horizontalCount = 0;
        break;
      }
    }

    // Vertical Win
    let verticalCount = 0;
    for (let r = 0; r < tiles; r++) {
      if (newBoard[r][col] === player) {
        verticalCount++;
        if (verticalCount === tiles) {
          return true;
        }
      } else {
        verticalCount = 0;
        break;
      }
    }

    // Diagonal Wins
    let mainDiagonalCount = 0;
    let antiDiagonalCount = 0;
    for (let i = 0; i < tiles; i++) {
      if (newBoard[i][i] === player) {
        mainDiagonalCount++;
        if (mainDiagonalCount === tiles) {
          return true;
        }
      } else {
        mainDiagonalCount = 0;
      }

      if (newBoard[i][tiles - 1 - i] === player) {
        antiDiagonalCount++;
        if (antiDiagonalCount === tiles) {
          return true;
        }
      } else {
        antiDiagonalCount = 0;
      }
    }

    return false;
  };

  const isDraw = (newBoard) => {
    for (let row = 0; row < tiles; row++) {
      for (let col = 0; col < tiles; col++) {
        if (newBoard[row][col] === "") {
          return false;
        }
      }
    }
    return true;
  };

  const handleClick = (row, col) => {
    if (board[row][col] != "") {
      return;
    }
    // new board
    const newBoard = board.map((row) => [...row]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    // changing players
    const newCurrentPlayer = currentPlayer === "red" ? "yellow" : "red";
    setCurrentPlayer(newCurrentPlayer);

    // lets check if there is a winner or draw
    if (checkWin(currentPlayer, row, col, newBoard)) {
      setWinner(currentPlayer);
      // restartGame();
    } else if (isDraw(newBoard)) {
      setDraw(true);
    }
  };

  const restartGame = () => {
    setBoard(Array(tiles).fill(Array(tiles).fill("")));
    setCurrentPlayer("yellow");
    setWinner(null);
    setDraw(false);
  };
  return (
    <div className="gameContainer">
      <h2>Tic Tac Toe</h2>
      <div className="setTiles">
        <button onClick={() => handleCountChange(-1)}>-</button>
        <p>Cells: {tiles}</p>
        <button onClick={() => handleCountChange(1)}>+</button>
      </div>

      <div className="board">
        <Board
          handleCellClick={handleClick}
          currentPlayer={currentPlayer}
          board={board}
        />
      </div>
      {winner && (
        <>
          {" "}
          <div className="winner">
            <Alert severity="success">{winner} player wins the game</Alert>
            <button onClick={restartGame}>Restart Game</button>
          </div>
          <Confetti width={width} height={height} />
        </>
      )}
      {draw && (
        <div className="winner">
          <Alert severity="info">Draw Match</Alert>
          <button onClick={restartGame}>Restart Game</button>
        </div>
      )}
    </div>
  );
};

export default Game;
