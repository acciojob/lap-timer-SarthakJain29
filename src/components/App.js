
import React, {useState, useRef, useEffect} from "react";
import './../styles/App.css';

const App = () => {
  const [time,setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  const startTimer = ()=>{
    if(!isRunning){
      setIsRunning(true);
      intervalRef.current = setInterval(()=>{
        setTime((prev) => prev+1);
      },10);
    }
  }
  const stopTimer = ()=>{
    setIsRunning(false);
    clearInterval(intervalRef.current);
  }
  const recordLap = ()=>{
    setLaps([...laps, time]);
  }
  const resetTimer = ()=>{
    stopTimer();
    setTime(0);
    setLaps([]);
  }
  useEffect(()=>{
    return () => clearInterval(intervalRef.current);
  },[])

  const formatTime = (t) => {
    const cs = t % 100;
    const sec = Math.floor(t / 100) % 60;
    const min = Math.floor(t / 6000);
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(
      2,
      "0"
    )}:${String(cs).padStart(2, "0")}`;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Lap Timer</h1>
      <h2>{formatTime(time)}</h2>

      <div>
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={recordLap}>Lap</button>
        <button onClick={resetTimer}>Reset</button>
      </div>

      <h3>Laps</h3>
      <ul style={{listStylePosition: "inside"}}>
        {laps.map((lap, index) => (
          <li key={index}>Lap {index + 1}: {formatTime(lap)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App
