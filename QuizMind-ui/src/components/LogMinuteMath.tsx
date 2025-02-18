import { useState, useEffect } from "react";
import { Button, Card, CardContent, Input } from "@/components/ui";

type LogProblem = {
  question: string;
  answer: number;
};

const generateLogProblem = (): LogProblem => {
  const base = Math.floor(Math.random() * 9) + 2; // Random base between 2 and 10
  const exponent = Math.floor(Math.random() * 5) + 1; // Random exponent between 1 and 5
  const result = Math.pow(base, exponent);
  return {
    question: `log_${base}(${result}) = ?`,
    answer: exponent,
  };
};

export default function LogMinuteMath() {
  const [problem, setProblem] = useState<LogProblem>(generateLogProblem());
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const checkAnswer = () => {
    if (parseInt(userAnswer) === problem.answer) {
      setFeedback("Correct!");
      setScore((prevScore) => prevScore + 1);
    } else {
      setFeedback("Incorrect. Try again.");
    }
    setProblem(generateLogProblem());
    setUserAnswer("");
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setIsActive(true);
    setProblem(generateLogProblem());
    setFeedback("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Logarithm Minute Math</h1>
      <p className="text-lg">
        Solve as many log problems as you can in one minute!
      </p>
      <Card className="p-4 text-center">
        {isActive ? (
          <>
            <p className="text-xl">{problem.question}</p>
            <Input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Your answer"
              className="mt-2 text-center"
            />
            <Button onClick={checkAnswer} className="mt-2">
              Submit
            </Button>
            <p className="mt-2 text-lg">{feedback}</p>
            <p className="mt-2">Time Left: {timeLeft}s</p>
            <p className="mt-2">Score: {score}</p>
          </>
        ) : (
          <Button onClick={startGame} className="text-xl">
            Start
          </Button>
        )}
      </Card>
    </div>
  );
}
