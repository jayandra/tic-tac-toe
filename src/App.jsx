import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

const DefaultGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const DefaultPlayers = {
  X: "Player 1",
  O: "Player 2",
};

function determineGameBoard(gameTurns) {
  // We need a deep copy; else updating gameTurns to [] doesn't get reflected in the board
  let gameBoard = [...DefaultGameBoard.map((row) => [...row])];
  for (let turn of gameTurns) {
    let { player, moveMade } = turn;
    let { x, y } = moveMade;

    gameBoard[x][y] = player;
  }
  return gameBoard;
}

function determineCurrentPlayer(gameTurns) {
  let activePlayer = "X";
  if (gameTurns.length > 0) {
    let lastMoveMadeBy = gameTurns[0].player;
    activePlayer = lastMoveMadeBy === "X" ? "O" : "X";
  }
  return activePlayer;
}

function determineWinner(gb) {
  let winner = null;

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
      if (line[0] && line.every((cell) => cell === line[0])) {
        winner = line[0]; // Set the winner flag to true if a line matches
        break;
      }
    }
    if (winner) break;
  }
  return winner;
}

function App() {
  const [gameTurns, updategameTurns] = useState([]);
  const [players, updatePlayers] = useState(DefaultPlayers);

  const activePlayer = determineCurrentPlayer(gameTurns);
  const gameBoard = determineGameBoard(gameTurns);
  const winningPlayer = determineWinner(gameBoard);

  function handlePlayersMove({ rowIndex, colIndex }) {
    updategameTurns((currentList) => {
      let currentListCopy = [
        { player: activePlayer, moveMade: { x: rowIndex, y: colIndex } },
        ...currentList,
      ];

      return currentListCopy;
    });
  }
  function resetGameBoard() {
    updategameTurns([]);
  }
  function handleNameChange(playerName, symbol) {
    updatePlayers((currentNames) => {
      return {
        ...currentNames,
        [symbol]: playerName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={players.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handleNameChange}
          />
          <Player
            initialName={players.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handleNameChange}
          />
        </ol>
        {winningPlayer && (
          <GameOver
            winner={players[winningPlayer]}
            onRestart={resetGameBoard}
          ></GameOver>
        )}
        <GameBoard gameBoard={gameBoard} onSquareSelect={handlePlayersMove} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
