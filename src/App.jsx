import { useState } from "react";
import Gameboard from "./Componenets/Gameboard";
import Player from "./Componenets/Player";
import Log from "./Componenets/Log";
import Gameover from './Componenets/Gameover'
import {WINNING_COMBINATIONS} from './Componenets/winning-combinations'
let PLAYERS={
  X:"player 1",
  O:"player 2"
}
  let intializeGameboard =[
    [null,null,null],
    [null,null,null],
    [null,null,null]
]
function deriveActivePlayer (gameTurns) {
  let currentPlayer='X'
  if(gameTurns.length > 0&&gameTurns[0].player==="X"){
    currentPlayer="O"
  }
  return currentPlayer
}

function deriveGameboard (gameTurns) {
      let gameboard=[...intializeGameboard.map(array=>[...array])]
    for(let turn of gameTurns){
        let {square ,player} = turn
        let {row , col} = square

        gameboard[row][col]=player
    }
    return gameboard
}

function deriveWinner (gameboard,players) {
  let winner
  for(let compinations of WINNING_COMBINATIONS){
    let firstSquareSymbol = gameboard[compinations[0].row][compinations[0].column]
    let secoundSquareSymbol = gameboard[compinations[1].row][compinations[1].column]
    let thirdSquareSymbol = gameboard[compinations[2].row][compinations[2].column]
    
    if (firstSquareSymbol&&
      firstSquareSymbol==secoundSquareSymbol&&
      firstSquareSymbol==thirdSquareSymbol
    ) {
      winner=players[firstSquareSymbol]
    }
  }
  return winner
}
function App() {
  let [players,setPlayers]=useState(PLAYERS)
  let [gameTurns, setGameTurns] = useState([]);
  let activePlayer=deriveActivePlayer(gameTurns)

    let gameboard=deriveGameboard(gameTurns)

   let winner =deriveWinner(gameboard,players)
  let hasDraw =!winner&&gameTurns.length===9
  function handelSelect(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let activePlayer=deriveActivePlayer(prevTurns)
      let updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, 
          player: activePlayer },
        ...prevTurns,
      ];
      return updatedTurns
    });
  }
  function handleRestart () {
    setGameTurns([])
  }

  function handlePlayerNameChange (symbol,newName) {
    setPlayers(prevPlayers=>{
      return{
        ...prevPlayers,
        [symbol]:newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={PLAYERS.X} symbol="X" isActive={activePlayer == "X"} onChangeName={handlePlayerNameChange}/>
          <Player name={PLAYERS.O} symbol="O" isActive={activePlayer == "O"} onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner||hasDraw)&&<Gameover onRestart={handleRestart} winner={winner}/>}
        <Gameboard
          onSelectSquare={handelSelect}
          board={gameboard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
