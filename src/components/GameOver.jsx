export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner} has won the game !!!</p>}
      {!winner && (
        <>
          <p>It's a draw :-(</p>
          <p>Please play again ...</p>
        </>
      )}
      <p>
        <button onClick={onRestart}>Rematch!</button>
      </p>
    </div>
  );
}
