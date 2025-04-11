import { useEffect, useState } from "react";
import "./App.css";
import halk from "./assets/thorman.png";
import iron from "./assets/ironmann.png";
import spider from "./assets/spidermann.png";

function App() {
  const [screen, setScreen] = useState(1);
  const [url, setUrl] = useState("");
  const [image, setImage] = useState([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(60);

  function handleStart(src) {
    setUrl(src);
    setScreen((prev) => prev + 1);
  }
  console.log(url);

  useEffect(() => {
    let interval;
    if (screen === 3 && url) {
      interval = setInterval(() => {
        setTime((time) => {
          if (time === 0) {
            clearInterval(interval);
            setImage([]);
            return 0;
          }
          return time - 1;
        });
        const obj = {
          id: Date.now(),
          x: getRandom("x") + "px",
          y: getRandom("y") + "px",
        };
        // console.log(obj.x , obj.y);

        setImage((prev) => [...prev, obj]);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [screen, url]);
  console.log(image);

  function getRandom(axis) {
    if (axis === "x") {
      return Math.floor(Math.random() * window.innerWidth * 0.9); // 90% width
    } else {
      return Math.floor(Math.random() * window.innerHeight * 0.8); // 80% height
    }
  }
  

  // console.log(getRandom());

  function handledelete(id) {
    setImage(image.filter((item) => item.id !== id));
    setScore((score) => score + 1);
  }

  return (
    <>
      {screen === 1 && (
        <div className="h-[100vh] w-[100vw] flex justify-center items-center">
          <h2
            className="font-bold text-white  text-2xl bg-blue-500 px-3 rounded"
            onClick={handleStart}
          >
            Start Game
          </h2>
        </div>
      )}
      {screen === 2 && (
        <div className="h-[100vh] pt-[5rem] ">
          <h2 className="text-center mb-8 text-3xl font-bold">
            {" "}
            Choose Your Avtar
          </h2>

          <div className="flex gap-[4rem] justify-center mt-[9rem]">
            <img
              className="h-[8rem]"
              src={halk}
              alt=""
              onClick={(e) => handleStart(e.target.src)}
            />
            <img
              className="h-[8rem]"
              src={iron}
              alt=""
              onClick={(e) => handleStart(e.target.src)}
            />
            <img
              className="h-[8rem]"
              src={spider}
              alt=""
              onClick={(e) => handleStart(e.target.src)}
            />
          </div>
        </div>
      )}
      {screen === 3 && (
        <div className="h-[100vh] w-[100vw]  ">
          <div className="flex justify-between mx-4 text-xl font-bold">
            <h2>
              Time Left : <span>{time}</span>{" "}
            </h2>
            <h2>
              Your Score : <span>{score}</span>
            </h2>
          </div>
          <div className="">
            {image.map((item, index) => (
              <img
              className="h-[2.5rem] sm:h-[3rem] absolute cursor-pointer"
              key={index}
              src={url}
              style={{ left: item.x, top: item.y, position: "absolute" }}
              onClick={() => handledelete(item.id)}
            />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
