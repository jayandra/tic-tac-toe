import React from "react";
export default function GameBoard({ onSquareSelect, gameBoard }) {
  function addPlayerSymbol(row, col) {
    if (gameBoard[row][col] == null) {
      onSquareSelect({ rowIndex: row, colIndex: col });
    }
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((col, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => addPlayerSymbol(rowIndex, colIndex)}>
                  {col}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
