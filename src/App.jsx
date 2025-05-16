import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";

function App() {
  const [activePlayer, updateActivePlayer] = useState("X");
  function handlePlayersMove() {
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
          onSquareSelect={handlePlayersMove}
          currentActivePlayer={activePlayer}
        />
        {/* {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )} */}
        {/* <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} /> */}
      </div>
      {/* <Log turns={gameTurns} /> */}
    </main>
  );
}

export default App;
