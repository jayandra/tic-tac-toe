import React from "react";
const DefaultGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSquareSelect, currentActivePlayer }) {
  const [gameBoard, updateGameBoard] = React.useState(DefaultGameBoard);

  function addPlayerSymbol(row, col) {
    if (gameBoard[row][col] == null) {
      updateGameBoard((gb) => {
        let gameBoardCopy = [...gameBoard.map((r) => [...r])];
        gameBoardCopy[row][col] = currentActivePlayer;
        if (checkWinner(gameBoardCopy) == true) {
          alert(currentActivePlayer + " has wone the game!!!! ");
        }
        return gameBoardCopy;
      });

      onSquareSelect();
    }
  }

  function checkWinner(gb) {
    let winner = false;

    // Check all possible winning lines (rows, columns, diagonals)
    const lines = [
      // Rows group
      [gb[0], gb[1], gb[2]],
      // Columns group
      [
        [gb[0][0], gb[1][0], gb[2][0]],
        [gb[0][1], gb[1][1], gb[2][1]],
        [gb[0][2], gb[1][2], gb[2][2]],
      ],
      // Diagonals group
      [
        [gb[0][0], gb[1][1], gb[2][2]],
        [gb[0][2], gb[1][1], gb[2][0]],
      ],
    ];

    for (const group of lines) {
      for (const line of group) {
        console.log(line);
        if (line[0] && line.every((cell) => cell === line[0])) {
          winner = true; // Set the winner flag to true if a line matches
          break;
        }
      }
      if (winner) break;
    }
    return winner;
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
