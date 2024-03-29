/*Final carousel component to display on home page */

import React, { useState } from "react";

import { CarouselProvider } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import styled from "styled-components";

import CarouselSlider from "./CarouselSlider";

const BookCarousel = () => {
  //number of slide to be visible
  const [slideCount, setSlideCount] = useState(2);
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <CarouselWrapper className="carousel-container">
      <CarouselProvider
        visibleSlides={slideCount}
        totalSlides={6}
        step={1}
        currentSlide={currentSlide}
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        isIntrinsicHeight={true}
      >
        <CarouselSlider
          setSlideCount={setSlideCount}
          setCurrentSlide={setCurrentSlide}
        />
      </CarouselProvider>
    </CarouselWrapper>
  );
};

const CarouselWrapper = styled.div`
  &.carousel-container {
    margin: 12px auto;
    filter: drop-shadow(0px 12px 30px rgba(50, 50, 50, 0.2));

    /* Total-width (including margin) + 1 additional margin */
    @media (min-width: 832px) {
      max-width: 704px;
    }

    @media (min-width: 1088px) {
      max-width: 960px;
    }

    @media (min-width: 1272px) {
      max-width: 500px;
    }

    @media (min-width: 1504px) {
      max-width: 1344px;
    }
  }

  .carousel__inner-slide {
    width: calc(100% - 150px);
    margin-left: 8px;

    @media (min-width: 1272px) {
      width: calc(100% - 24px);
      margin-left: 12px;
    }

    @media (min-width: 1272px) {
      width: calc(100% - 32px);
      margin-left: 16px;
    }
  }
`;

export default BookCarousel;
