import React from 'react'

export default function ({turns}) {
  return (
    <ol id='log'>
    {turns.map(turn=><li key={`${turn.square.row}${turn.square.col}`}>{turn.player} seleced {turn.square.row},{turn.square.col}</li>)}
    </ol>
)
}
