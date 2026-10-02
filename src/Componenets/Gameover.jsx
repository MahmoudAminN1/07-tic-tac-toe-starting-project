import React from 'react'

export default function Gameover({winner ,onRestart}) {
  return (
    <div id='game-over'>
        <h2>GAME OVER!</h2>
        {winner&&<p>{winner} Won!</p>}
        {!winner&&<p>it's a draw</p>}
        <p>
            <button onClick={onRestart}>REMATCH ?</button>
        </p>
    </div>
  )
}
