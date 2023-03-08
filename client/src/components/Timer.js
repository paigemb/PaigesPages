import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <StyleTimer>
      <div className="app">
        <div className="time">{seconds}s</div>
        <div className="row">
          <button
            className={`button button-primary button-primary-${
              isActive ? "active" : "inactive"
            }`}
            onClick={toggle}
          >
            {isActive ? "Pause" : "Start"}
          </button>
          <button className="button" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </StyleTimer>
  );
};

const StyleTimer = styled.div`
  .app {
    text-align: center;
    border: pink;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: black;
  }

  .time {
    font-size: 3rem;
    padding: 2rem;
  }

  .button {
    padding: 0.6rem 1.5rem;
    margin: 0.4rem;
    border-radius: 3px;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 0.8rem;
    border-style: groove;
  }

  .button:focus {
    outline-width: 0;
  }

  .button-primary:hover {
    background-color: #2641d4;
    border: 1px solid #1b1f2b;
  }

  .button-primary-active {
    background-color: #3151ff;
    border: 1px solid #152684;
    color: white;
  }

  .button-primary-inactive {
    background-color: #3151ff;
    border: 1px solid #152684;
    color: white;
  }
`;

export default Timer;
