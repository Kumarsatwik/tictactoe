import { useEffect, useState } from "react";
import { MdCelebration } from "react-icons/md";
import celebrationImg from "./assets/celebration.png";
import "./App.css";
import Square from "./Components/Square";

const initialState = ["", "", "", "", "", "", "", "", "", ""];

function App() {
  const [gameState, setGameState] = useState(initialState);
  const [steps, setSteps] = useState(0);
  const [winner, setWinner] = useState(null);
  const [xscore, setxscore] = useState(0);
  const [oscore, setoscore] = useState(0);

  const clickHandler = (event) => {
    // console.log("event: ", event.target.id);
    const copyOfGameState = [...gameState];
    if (!event.target.innerText) {
      copyOfGameState[event.target.id] = steps % 2 == 0 ? "X" : "O";
      setSteps(steps + 1);
      setGameState(copyOfGameState);
    }
  };
  const resetGame = () => {
    setGameState(initialState);
    setSteps(0);
    setWinner(null);
  };

  const checkForWinner = (gameState) => {
    const winningCondition = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winningCondition.forEach((condition) => {
      const [a, b, c] = condition;

      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        setWinner(gameState[a]);
        if (gameState[a] == "X") {
          setxscore(xscore + 1);
        } else {
          setoscore(oscore + 1);
        }
        // console.log("winner ", gameState[a]);
      }
    });
  };

  const resetScore= ()=>{
    setxscore(0);
    setoscore(0);
  }


  useEffect(() => {
    checkForWinner(gameState);
  }, [gameState]);

  return (
    <>
      <div className="score-panel">
        <div className="score">
          <span>X - Score</span> <p>{xscore}</p>
        </div>
        <div className="score">
          <span>O - Score</span> <p>{oscore}</p>
        </div>
      </div>
      <div className="container">
        <div className="left-wrapper">
          <div className="left-text"> Let's Play the Tic-tac-toe Game!</div>
          <div className="buttons">
            <div className="button" onClick={resetGame}>
              Start a New Game
            </div>
            {(xscore > 0 || oscore > 0) && (
              <div className="button" onClick={resetScore}>
                Clear Score
              </div>
            )}
          </div>
        </div>

        {!winner && steps != 9 && (
          <div className="right-wrapper">
            <div className="players">
              <div className={`player ${steps % 2 === 0 && "player-X"}`}>
                Player X
              </div>
              <div className={`player ${steps % 2 === 1 && "player-O"}`}>
                Player O
              </div>
            </div>
            <div className="game-wrapper" onClick={clickHandler}>
              <Square
                id={0}
                state={gameState[0]}
                className="border-right-bottom"
              />
              <Square
                id={1}
                state={gameState[1]}
                className="border-right-bottom"
              />
              <Square id={2} state={gameState[2]} className="border-bottom" />
              <Square
                id={3}
                state={gameState[3]}
                className="border-right-bottom"
              />
              <Square
                id={4}
                state={gameState[4]}
                className="border-right-bottom"
              />
              <Square id={5} state={gameState[5]} className="border-bottom" />
              <Square id={6} state={gameState[6]} className="border-right" />
              <Square id={7} state={gameState[7]} className="border-right" />
              <Square id={8} state={gameState[8]} />
            </div>
          </div>
        )}
        {winner && (
          <div className="winner-wrapper">
            <img src={celebrationImg} alt="celebration" />
            <div className="winner-text">{`${winner} Wins!  🥳`}</div>
          </div>
        )}
        {!winner && steps == 9 && (
          <div className="winner-wrapper">
            <div className="winner-text">It's a Draw! 😐</div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
