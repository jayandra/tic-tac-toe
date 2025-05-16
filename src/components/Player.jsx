import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [playerName, updatePlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  let editablePlayerName = <span className="player-name">{playerName}</span>;

  function handleEditClick() {
    console.log(playerName);
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(playerName, symbol);
    }
  }
  function handleChange(event) {
    updatePlayerName(event.target.value);
  }

  if (isEditing) {
    editablePlayerName = (
      <input type="text" value={playerName} onChange={handleChange} />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
