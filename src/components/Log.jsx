export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.moveMade.x}${turn.moveMade.y}`}>
          {turn.player} selected {turn.moveMade.x},{turn.moveMade.y}
        </li>
      ))}
    </ol>
  );
}
