import { useState, useEffect, useRef } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [timer, setTimer] = useState(60);
  const [isCompleted, setIsCompleted] = useState(false);
  const [challenge, setChallenge] = useState({
    challengeString: "",
    challengeTime: 60,
  });
  const [wpm, setWpm] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const intervalRef = useRef(null);

  useEffect(() => {
    fetch("https://shortstories-api.onrender.com/")
      .then((response) => response.json())
      .then((data) => {
        const words = data.story.toLowerCase().split(" ");
        const limitedWords = words.slice(0, 30).join(" "); // limit to first 30 words
        setChallenge({
          challengeString: limitedWords,
          challengeTime: 60,
        });
        setIsLoading(false); // Set loading state to false after fetching the text
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false); // Set loading state to false in case of error
      });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = event.target.value;
    setText(inputText);
    if (!intervalRef.current && inputText.length > 0) {
      startTimer();
    }
    if (inputText === challenge.challengeString) {
      stopTimer();
      setIsCompleted(true);
      calculateWPM();
    }
  };

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(intervalRef.current);
          setIsCompleted(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  const textColorChanger = (index: number) => {
    if (!text[index]) return "gray";
    if (text[index] === challenge.challengeString[index]) {
      return "green";
    } else {
      return "red";
    }
  };

  const calculateWPM = () => {
    const wordsTyped = text.trim().split(/\s+/).length;
    const timeTaken = challenge.challengeTime - timer;
    const wpmValue = Math.round((wordsTyped / timeTaken) * 60);
    setWpm(wpmValue);
  };

  return (
    <div>
      {isLoading ? ( // Rendering loading message if isLoading is true
        <p>Loading...</p>
      ) : (
        <h4>
          {challenge.challengeString.split("").map((char, index) => (
            <span
              className="text-3xl font-bold underline"
              key={index}
              style={{ color: textColorChanger(index) }}
            >
              {char}
            </span>
          ))}
        </h4>
      )}
      {isCompleted ? (
        <div>
          <p>Challenge Completed!</p>
          <p>Time Remaining: {timer} seconds</p>
          <p>Time Taken: {challenge.challengeTime - timer} seconds</p>
          <p>Words Per Minute (WPM): {wpm}</p>
        </div>
      ) : (
        <textarea
          name=""
          id=""
          cols={30}
          rows={10}
          onKeyUp={handleChange}
          autoFocus
        ></textarea>
      )}
    </div>
  );
}
