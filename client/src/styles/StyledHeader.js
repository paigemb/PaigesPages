import styled from "styled-components/macro";
import fonts from "../styles/fonts/fonts";

const StyledHeader = styled.div`
${fonts}; 
  .header {
    overflow: hidden;
    background-color: pink;
    padding: 20px 10px;
    font-family: LovelyBubbles
  }

  .header a {
    float: left;
    color: gray;
    text-align: center;
    padding: 12px;
    text-decoration: none;
    font-size: 50px;
    line-height: 25px;
    border-radius: 4px;
  }

  .logo {
    float: left;
    color: gray;
    font-family: LovelyBubbles;
    font-size: 40px;
    font-weight: bold;
    padding: 10px 10px 10px 10px
  }

  .a:hover {
    background-color: lavender;
    color: black;
  }

  .header a.active {
    background-color: lightpink;
    color: black;
  }

  .header-right {
    float: right;
    font-size: 40px;
  }
  .read {
    padding: 10px
  }
  .library {
    padding: 10px;
  }
  @media screen and (max-width: 500px) {
    .header a {
      float: none;
      display: block;
      text-align: left;
    }
    .header-right {
      float: none;
    }
  }
`;

export default StyledHeader;
