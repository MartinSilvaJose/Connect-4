import { useState } from 'react'
import './App.css'
import { PLAYER, ROWS, POSITIONS } from './constants';
import confetti from 'canvas-confetti';

export function App() {

  const [board, setBoard] = useState(Array(7).fill(Array(7).fill(null)));

  const [player, setPlayer] = useState(PLAYER.RED);

  const [winner, setWinner] = useState(null);

  const checkWinner = (index, player, board) => {
    const [row, column] = index;
    for (const [nextRow, nextColumn] of POSITIONS) {
      let contador = 1; // Incluye la ficha que acaba de ser colocada

      // Verificar en una dirección
      for (let i = 1; i < 4; i++) {
        const newRow = row + (nextRow * i);
        const newColumn = column + (nextColumn * i);
        if (newRow < 0 || newRow >= 7 || newColumn < 0 || newColumn >= 7 || board[newRow][newColumn] !== player) break;
        contador++;
      }

      // Verificar en la dirección opuesta
      for (let i = 1; i < 4; i++) {
        const newRow = row - nextRow * i;
        const newColumn = column - nextColumn * i;
        if (newRow < 0 || newRow >= 7 || newColumn < 0 || newColumn >= 7 || board[newRow][newColumn] !== player) break;
        contador++;
      }

      if (contador >= 4) return true;
    }

    return null;
  }
  // const checkEndGame = (newBoard) => {
  //   //Revisamos si el tablero esta lleno
  //   return newBoard.every((square) => square !== null);
  // }

  const gravitity = (index, board) => {
    // eslint-disable-next-line no-unused-vars
    const [y, x] = index;
    let place = 0;
    do {
      if (board[place][x] !== null) {
        place++
      } else {
        return [place, x];
      }
    } while (place < 7);
  }

  const updateBoard = (index) => {
    // const [y, x] = index;
    const [y, x] = gravitity(index, board);
    //If there is something it does nothing
    if (board[y][x] || winner) return
    //Copia profunda
    const newBoard = Array.from(JSON.parse(JSON.stringify(board)));
    //We look for the index of the square we want to mark and mark it
    newBoard[y][x] = player;
    setBoard(newBoard);

    const newWinner = checkWinner([y, x], player, newBoard);
    console.log(newWinner);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
      // } else if(checkEndGame(newBoard)){
      //   setWinner(false);
    }
    //Change player
    const newPlayer = player === PLAYER.RED ? PLAYER.YELLOW : PLAYER.RED;
    setPlayer(newPlayer);

  }
  const resetGame = () => {
    setBoard(Array(7).fill(Array(7).fill(null)));
    setPlayer(PLAYER.RED);
    setWinner(null);
  }
  return (
    <>
      <h1>Connect 4</h1>
      <h3>Le toca al jugador</h3>
      <div className={`player ${player}`}></div>
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
                      index={[i, j]}
                      updateBoard={updateBoard}
                    >
                      {cell}
                    </Square>
                  )
                })
              )

            })
          }
          {/* Ganador */}
          {
            winner !== null && (
              <section className="winner">
                <div className='text'>
                  <h2>
                    {winner === false ? 'Empate' : 'Ganó'}
                  </h2>

                  <header className='win'>
                    {winner && (
                      <div className={`${player !== PLAYER.RED ? PLAYER.RED : PLAYER.YELLOW}`}></div>
                    )}
                  </header>

                  <footer>
                    <button onClick={resetGame}>Empezar de nuevo</button>
                  </footer>
                </div>
              </section>
            )
          }
        </main>
      </section>


    </>
  )
}

// eslint-disable-next-line react/prop-types
export function Square({ children, index, updateBoard }) {

  const [row, column] = index;

  const handleClick = () => {
    updateBoard(index);
  }

  return (
    <div
      className={`square ${children ?? ''} ${row === 6 ? 'last' : ''}`}
      onClick={handleClick}
      style={{ gridRow: ROWS[row], gridColumn: column + 1 }}
    >
    </div>
  )

}