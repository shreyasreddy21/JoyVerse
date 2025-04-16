import { useEffect, useState } from "react";
import "./App.css";

const shapes = ["⬤", "▲", "■", "◆", "★"];
const totalTiles = 25;
const GAME_DURATION = 60; // in seconds

function App() {
  const [tileValues, setTileValues] = useState([]);
  const [revealed, setRevealed] = useState([]);
  const [correctTiles, setCorrectTiles] = useState([]);
  const [currentTarget, setCurrentTarget] = useState("");
  const [score, setScore] = useState(0);
  const [totalTarget, setTotalTarget] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setupGame();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setGameOver(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const setupGame = () => {
    const pool = [];
    shapes.forEach((shape) => {
      for (let i = 0; i < 5; i++) pool.push(shape);
    });

    const shuffled = shuffleArray(pool);
    setTileValues(shuffled);
    setRevealed(new Array(totalTiles).fill(true));
    setCorrectTiles(new Array(totalTiles).fill(false));
    setGameOver(false);
    setTimeLeft(GAME_DURATION);
    setScore(0);

    setTimeout(() => {
      setRevealed(new Array(totalTiles).fill(false));
    }, 5000);

    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    setCurrentTarget(shape);
    setTotalTarget(pool.filter((v) => v === shape).length);
  };

  const handleClick = (index) => {
    if (gameOver || revealed[index] || correctTiles[index]) return;

    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);

    if (tileValues[index] === currentTarget) {
      const newCorrect = [...correctTiles];
      newCorrect[index] = true;
      setCorrectTiles(newCorrect);
      setScore(score + 1);
    } else {
      setTimeout(() => {
        newRevealed[index] = false;
        setRevealed([...newRevealed]);
      }, 2000);
    }
  };

  return (
    <div className="container">
      <h1>Shape Memory Game</h1>
      <p className="prompt">Find all tiles with: {currentTarget}</p>
      <p className="timer">Time Left: {timeLeft}s</p>
      <div className="grid">
        {tileValues.map((shape, idx) => {
          const isRevealed = revealed[idx];
          const isCorrect = correctTiles[idx];
          const isWrong =
            isRevealed && shape !== currentTarget && !isCorrect;

          return (
            <div
              key={idx}
              className={`tile ${isCorrect ? "correct" : isWrong ? "wrong" : isRevealed ? "revealed" : "hidden"}`}
              onClick={() => handleClick(idx)}
            >
              {(isRevealed || isCorrect) ? shape : ""}
            </div>
          );
        })}
      </div>
      <p className="score">Score: {score} / {totalTarget}</p>
      {gameOver && <p className="game-over">Time's up! Game Over.</p>}
    </div>
  );
}

export default App;


