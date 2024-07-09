import React, { useState, useRef } from "react";
import "../App.css";

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timeList, setTimeList] = useState([]);
  const intervalRef = useRef(null);

  const startPauseHandler = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else {
      const startTime = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    }
    setIsRunning(!isRunning);
  };

  const stopHandler = () => {
    if (elapsedTime !== 0) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      const temp = [...timeList];
      temp.push(elapsedTime);
      setTimeList(temp);
      setElapsedTime(0);
      setIsRunning(false);
    }
  };

  const resetHandler = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setElapsedTime(0);
    setIsRunning(false);
    setTimeList([]);
  };

  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 60000) % 60);
    const hours = Math.floor(time / 3600000);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <p
        style={{
          fontFamily: "Playwrite NO, cursive",
          color: "white",
          textAlign: "center",
          fontSize: "3rem",
        }}
      >
        Stopwatch
      </p>
      <div className="container">
        <div className="timer-container" onClick={startPauseHandler}>
          <span className="timer">{formatTime(elapsedTime)}</span>
        </div>
        <div className="time-list">
          {timeList?.map((item, index) => {
            return (
              <p className="time-item" key={item + index}>
                {formatTime(item)}
              </p>
            );
          })}
        </div>
        <button
          className="button play"
          style={{ marginTop: 16 }}
          onClick={startPauseHandler}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <div style={{ marginTop: 16 }}>
          <button
            className="button stop"
            style={{ marginRight: 16 }}
            onClick={stopHandler}
          >
            Stop
          </button>
          <button className="button" onClick={resetHandler}>
            Reset
          </button>
        </div>
        <p className="footer">
          Made by Rahul Kumar <span style={{ color: "#FF2A23" }}>♥</span>
        </p>
      </div>
    </>
  );
};

export default Stopwatch;
