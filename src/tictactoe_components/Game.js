import React from "react";
import Board from "./Board";

export default function Game() {
  return (
    <div>
      <div className="gameBoard">
        <Board></Board>
      </div>

      <div className="gameInfo"></div>
    </div>
  );
}
