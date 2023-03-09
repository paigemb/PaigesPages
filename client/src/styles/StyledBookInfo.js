import styled from "styled-components/macro";

const StyledBookInfo = styled.div`

padding: 20px; 

  .bookInfo {
    border-style: outset;
    border-color: gray;
    border-radius: 5px;
    width: 50%;
    float:left;
    padding: 20px;
    

  .cover {
    height: 350px;

    padding: 50px;
  }
  .description {
    width: 50%;
    padding-top: 25px;
    
  }
  .timer {
    float: right;
    position:relative;

  }

  .flex-cont {
    display: flex;
  }
`;

export default StyledBookInfo;
