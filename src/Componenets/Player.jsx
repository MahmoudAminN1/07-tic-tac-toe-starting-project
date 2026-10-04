import React, { useState } from "react";

export default function Player(props) {
  let [playerName, setPlayerName] = useState(props.name);
  let [isEditing, setIsEditing] = useState(false);
  function handleEditClick() {
    setIsEditing((e) => !e);
    if (isEditing) props.onChangeName(props.symbol, playerName);
  }
  return (
    <li className={props.isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            defaultValue={playerName}
            onChange={(e) => {
              setPlayerName(e.target.value);
            }}
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{props.symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
