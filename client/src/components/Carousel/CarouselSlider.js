/*Component for the Book Carouself
 */
import React, { useContext, useEffect, useState } from "react";

/*https://www.npmjs.com/package/pure-react-carousel*/
import {
  ButtonBack,
  ButtonNext,
  DotGroup,
  Slide,
  Slider,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";


import styled from "styled-components";

import Arrow from "./arrow.svg";
import Card from "./Card";
import { catchErrors } from "../../utils";
import { getCurrentReading } from "../../googlebooks";

const CarouselSlider = ({ setSlideCount, setCurrentSlide }) => {

  //get books for carousel
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCurrentReading();
      setBooks(data.items.slice(0,5)) //get first 5 books
    };

    catchErrors(fetchData());
  }, []);


  return (
    <>
      <Wrapper>
        <Slider>
          {books.map((book, i) => (
            <Slide index={i} className="slide" key={i}>
              <Card book={book} />
            </Slide>
          ))}
        </Slider>
        <div className="controls">
          <ButtonBack className="btn-arrow reverse-arrow">
            <img src={Arrow} alt="arrow" />
          </ButtonBack>
          <DotGroup className="dot-group" />
          <ButtonNext className="btn-arrow">
            <img src={Arrow} alt="arrow" />
          </ButtonNext>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  .controls {
    display: flex;
    align-items: center;
    justify-content: center;

    .btn-arrow {
      border: none;
      background: none;
      padding: 11px 20px;
    }

    .reverse-arrow {
      transform: rotateY(180deg);
    }

    .dot-group {
      display: flex;
      align-items: center;
      justify-content: center;

      .carousel__dot {
        width: 8px;
        height: 8px;
        border: none;
        border-radius: 50%;
        margin: 0 4px;
        padding: 0;
        background-color: #c3c4ca;
      }

      /* This class is found in DotGroup from pure-react-carousel */
      /* We need to override it to add our styles */
      .carousel__dot--selected {
        width: 16px;
        height: 8px;
        border-radius: 10px;
        background-color: #6267a1;
        transition: background 0.4s ease;
      }
    }
  }
`;

export default CarouselSlider;
