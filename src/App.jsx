import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

function App() {
  const [activePlayer, updateActivePlayer] = useState("X");
  const [gameTruns, updateGameTruns] = useState([]);

  function handlePlayersMove({ rowIndex, colIndex }) {
    updateGameTruns((currentList) => {
      let currentListCopy = [
        { player: activePlayer, moveMade: { x: rowIndex, y: colIndex } },
        ...currentList,
      ];

      return currentListCopy;
    });

    updateActivePlayer((currentActivePlayer) =>
      currentActivePlayer === "X" ? "O" : "X"
    );
  }
  function handleNameChange(playerName, symbol) {}

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handleNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handleNameChange}
          />
        </ol>
        <GameBoard
          turns={gameTruns}
          onSquareSelect={handlePlayersMove}
          currentActivePlayer={activePlayer}
        />
        {/* {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )} */}
        {/* <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} /> */}
      </div>
      <Log turns={gameTruns} />
    </main>
  );
}

export default App;
