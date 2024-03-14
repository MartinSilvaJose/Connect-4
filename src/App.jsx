import { useState } from 'react'
import './App.css'

const PLAYER = {
  RED: 'redCoin',
  YELLOW: 'yellowCoin'
}

export function App() {
  const [board, setBoard] = useState(Array(7).fill(Array(7).fill(null)));

  const [player, setPlayer] = useState(PLAYER.RED);
  

  const updateBoard = (index) => {
    const [y, x] = index;
    //If there is something it does nothing
    if(board[y][x]) return 
    //Copia profunda
    const newBoard = Array.from(JSON.parse(JSON.stringify(board)));
    //We look for the index of the square we want to mark and mark it
    newBoard[y][x] = player;
    setBoard(newBoard);
    //Change player
    const newPlayer = player === PLAYER.RED ? PLAYER.YELLOW : PLAYER.RED;
    setPlayer(newPlayer);

  }
  const resetGame = () => console.log('jaja saludos')
  return (
    <>
      <h1>Connect 4</h1>
      <button onClick={resetGame}>Reset game</button>
      <section>
        <main className='game'>
          {
            //Find the first level of the array
            board.map((row, i) => {
              return (
                //Find the second level of the array
                board[i].map((cell, j) => {
                  //We return the square for each cell of the column index located in each row.
                  return (
                    <Square
                      key={i + j}
                      index={[i,j]}
                      updateBoard={updateBoard}
                    >
                      {cell}
                    </Square>
                  )
                })
              )
              
            })
          }
        </main>
    </section>


    </>
  )
}

const ROWS = {
  0: '7',
  1: '6',
  2: '5',
  3: '4',
  4: '3',
  5: '2',
  6: '1',

}

// eslint-disable-next-line react/prop-types
export function Square({children, index, updateBoard}) {
  const handleClick = () =>{
    updateBoard(index)
  }
  const [row,column] = index;
  return (
    <div
      className={`square ${children ?? ''}`}
      onClick={handleClick}
      style={{gridRow: ROWS[row], gridColumn: column + 1}}
    >
      {row +' '+ column}
    </div>
  )

}