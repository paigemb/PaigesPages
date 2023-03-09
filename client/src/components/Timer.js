import { set } from "mongoose";
import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";

const Timer = (pC) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [timeToRead, setTimeToRead] = useState(0);
  const [firstPage, setFirstPage] = useState(0);
  const [endPage, setEndPage] = useState(0);


  function timeToFinish() {
    let pagesRead = endPage - firstPage;
    let pagesLeft = pageCount.book - pagesRead;

    let timeLeft = (seconds * pagesLeft) / pagesRead;
   
    setTimeToRead(timeLeft);

  }

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }


 

  useEffect(() => {
  
    setPageCount(pC);
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
      <div className= "container">
        <h3>Read Now!</h3>
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
          <form>
            <div className="input">
              <label>Start Page: 
                <input 
                  name="start"
                  type= 'number'
                  onChange={(e) => setFirstPage(e.target.value)}
                  />
              </label>
          </div>
              <div className="input">
                <label>End Page: 
                  <input name="end"
                    type='number'
                    onChange={(e) => setEndPage(e.target.value)}/>
                </label>
                </div>
          </form>
      
          </div>
          <button className="button" onClick={timeToFinish}>Calculate</button>
          <p>At this pace, it will take you {timeToRead} minutes to finish reading.</p>  
        </div>
 
    </StyleTimer>
  );
};

const StyleTimer = styled.div`

  border-style: outset;
  border-radius: 5px;
  background-color: lavender;
  float: right;
  align-contents: center;
  padding: 25px;
  width: 35%;
  height: 50%;

 .container {

 }
 .button {
  display:inline-block;
  padding: 7px;
  margin: 7px;
  border-style: outset;
  border-color:DimGray;
  border-radius: 5px;
 }

 .button:hover {
  background-color: pink;
 }

 .input {
  padding: 10px;
  display: inline-block;

 }
 .h3 {
  padding: 2px;
 }
 
  .time {
    display:inline-block;
    position: relative;
    margin: 0 auto;
    align-contents: center;
    font-weight: bold;
    font-size: 30px;
  
  }
`;

export default Timer;
