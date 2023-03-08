import React, { useContext, useEffect, useState } from "react";

import {
  ButtonBack,
  ButtonNext,
  DotGroup,
  Slide,
  Slider,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { CarouselContext } from "pure-react-carousel";

import styled from "styled-components";

import Arrow from "./arrow.svg";
import Card from "./Card";
import useWindowSize from "../hooks/windowSize";

import axios from "axios";
import { catchErrors } from "../utils";
import { getCurrentReading } from "../googlebooks";

const CarouselSlider = ({ setSlideCount, setCurrentSlide }) => {
  const screenWidth = useWindowSize();

  //pure-react-carousel context
  const carouselContext = useContext(CarouselContext);

  const [booksData, setBooksData] = useState(null);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCurrentReading();
      setBooksData(data);
    };

    catchErrors(fetchData());
  }, []);

  // when playlistsData updates, check if there are more playlists to fetch
  // then update the state variable
  useEffect(() => {
    if (!booksData) {
      return;
    }

    // playlist endpoint only returns 20 playlists at a time, so we need to
    // make sure we get ALL playlists by fetching the next set of playlists
    const fetchMoreData = async () => {
      // wrap fetch and set state logic in conditional to loop until last paging object
      if (booksData.next) {
        const { data } = await axios.get(booksData.next);
        setBooksData(data);
      }
    };

    //update playlists state variable w/functional update (reactjs.org/docs/hooks-reference.html#functional-updates)
    //merges previous playlist state variable array with the items array on the current playlistsData object
    //pass new playlists array into <PlaylistsGrid>
    setBooks((books) => [...(books ? books : []), ...booksData.items]);

    // Fetch next set of playlists as needed
    catchErrors(fetchMoreData());
  }, [booksData]);

  useEffect(() => {
    const updateCarouselSlide = (slideToBeVisible) => {
      const { currentSlide, totalSlides, visibleSlides } =
        carouselContext.state;

      setSlideCount(slideToBeVisible);

      //this is a fix to reset currentSlide when screen resizes
      if (
        currentSlide >= totalSlides - visibleSlides ||
        currentSlide >= totalSlides - slideToBeVisible
      ) {
        setCurrentSlide(totalSlides - slideToBeVisible);
      }
    };

    if (screenWidth < 832) {
      updateCarouselSlide(1);
    } else if (screenWidth < 1088) {
      updateCarouselSlide(2);
    }
    //>= 1088
    else {
      updateCarouselSlide(3);
    }
  }, [screenWidth, setSlideCount, setCurrentSlide, carouselContext]);

  //only get first 5 books
  let bookList = books.slice(0,5);

  return (
    <>
      <Wrapper>
        <Slider>
          {bookList.map((book, i) => (
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
