/*Styling for the header*/

import styled from "styled-components/macro";

const StyledHeader = styled.div`
  .header {
    background-color: #f1ddee;
    overflow: hidden;
    padding: 20px; 10px;   
    height: 180px;
    border-style: outset;
    border-width: medium
    
  }
  
  .header a {
    text-decoration: none;
  }
  .title {
    font-family: Bookends;
    color: white;
    font-size: 200px;
    vertical-align: top;
    margin-top: 0px;
    float: left;
    }

  .title a{
    top: 0;
    vertical-align: top;
    color: white
    font-family: Bookends;
    font-weight:normal;
  }
  a {
    color: black;
 
  }

  .header-right {
    display:flex;
    align-items: right;
    margin-left: 65%;
    margin-top: 10%;
  
  }

  .item a{ 
    font-size: 35px;
    display: inline-block;
    color: black;
    font-family:LovelyBubbles;
    position:relative;
    float: right;
    padding: 15px;
    align-self: right;
    
    
  }

  a:hover {
    color: black;
    text-align: center;
    animation: glow 1s ease-in-out infinite alternate;
  }
  button:hover {
    color: black;
    text-align: center;
    animation: glow 1s ease-in-out infinite alternate;
  }
  
  @keyframes glow {
    from {
      text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
    }
    to {
      text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
    }
  }
  .button {
    font-size: 25px;
    font-weight:bold;
    color:black;
    background:none;
    border: none;
    font-family:LovelyBubbles;
    float: right;
    position:relative;

  }
  `;

export default StyledHeader;
