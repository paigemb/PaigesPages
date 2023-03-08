/* Styling for Artist/Playlists Grid */

import styled from "styled-components/macro";

const StyledGrid = styled.ul`
  width: 800px;
  list-style: none;
  margin: 50;
  padding: 50;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  grid-gap: var(--spacing-sm);
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    grid-gap: var(--spacing-lg);
  }
  .grid__item {
    background-color: var(--near-black);
    border-radius: var(--border-radius-subtle);
    padding: 20px;
    transition: background-color 0.3s ease;
    cursor: default;
    &:hover,
    &:focus {
      background-color: var(--dark-grey);
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
    padding: var(--spacing-sm);
    @media (min-width: 768px) {
      padding: var(--spacing-md);
    }
  }
  .grid__item__img {
    position: relative;
    padding-top: 100%;
    margin: 0 auto var(--spacing-lg);
    img {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      background-color: var(--dark-grey);
      border-radius: "2px";
    }
  }
  .grid__item__name {
    margin: 0 auto;
    text-align: right;
    padding: 10px;
    font-size: 15px;
    letter-spacing: normal;
  }
`;

export default StyledGrid;
