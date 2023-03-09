import { useState, useEffect } from "react";
import heart from "../music/heart.png";
import styled from "styled-components";

 const AudioPlayer = () => {

  // use Audio constructor to create HTMLAudioElement
  const src = require('../music/theTunes.mp3')
  const audioTune = new Audio(src);

  // load audio file on component load
  useEffect(() => {
    audioTune.load();
  }, [])
 
  // play  sound
  const playSound = () => {
    audioTune.play();
  }
 
  // pause  sound
  const pauseSound = () => {
    audioTune.pause();
  }
 
  // stop sound
  const stopSound = () => {
    audioTune.pause();
    audioTune.currentTime = 0;
  }


  return (
    <>
    <StyledHeart>
      <div className="music-container">
        <img src={heart} alt="heart" />
        <div className="buttonContainer">
          <button onClick={playSound} className="click">Play</button>
          </div>
          <div className="buttonContainer">
          <button onClick={pauseSound} className="click">Pause</button>
          </div> <div className="buttonContainer">
          <button onClick={stopSound} className="click">Stop</button>
          </div>
       
  
    </div>
      </StyledHeart>
    </>
  );
 }


const StyledHeart = styled.div `
padding: 35px; 
margin-top: 3%;
width: 35%;
float: right;
border-radius: 300px;


 .buttonContainer {
    padding: 5px;
    display: inline;
 }

 .click {
  font-family: LovelyBubbles; !important
  background:none;
  border-none;
 }
}`
export default AudioPlayer;

