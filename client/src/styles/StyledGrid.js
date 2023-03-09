/* Styling for Book Grid */

import styled from "styled-components/macro";

const StyledGrid = styled.ul`
  width: 85%;
  list-style: none;
  padding: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  grid-gap: 100px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    grid-gap: 5px);
  }

  .grid__item {
    padding: 20px;
    height: 150px;
    border-style: solid;
    transition: background-color 0.3s ease;
    cursor: default;
    &:hover,
    &:focus {
      img {
        box-shadow: 0 8px 24px rgb(0 0 0 / 50%);
      }
    }

    a {
      display: block;
      width: 100%;
      height: 100%;
      &:hover,
      &:focus {
        text-decoration: none;
      }
    }
  }

  .grid__item__inner {
    padding: 5px;;
    @media (min-width: 768px) {
      padding: 2px;
    }
  }

  .grid__item__img {
    position: relative;
    padding-top: 100%;
    margin: 0 auto;
    img {
      position: absolute;
      top: 0;
      width: 100%;
      height: 250px;
     
      border-radius: "2px";
    }
  }

  h2 {
    font-family: AntiqueBookCover; !important
    font-size: 50px;
  }
  
`;

export default StyledGrid;
