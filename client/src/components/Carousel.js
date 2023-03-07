import React from 'react';
import 'pure-react-carousel/dist/react-carousel.es.css'
/*import HorizontalGallery from 'react-dynamic-carousel';

const CarouselPage = ({books}) => (
    <>
    {books && books.length ? (
        <HorizontalGallery
        tiles={books.map((book) => (
            <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 250,
                height: 350,
                backgroundColor: 'green',
                borderRadius: 10
            }}
        >
            <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
            </div>
        ))}
        elementWidth={250}
        fadeDistance={100}
        minPadding={20}
        />
    ) : (
        <p>No books available</p>
    )}
   
    </>
);*/

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';


const CarouselPage = ({books}) => {
    return (
        <CarouselProvider
       
        totalSlides={6}
        step={1}
   
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        isIntrinsicHeight={true}
            >
                <Slider>
                    {books.map((url, index) => (
                        <Slide index={index} key={index}>
                            <img src = {url} alt = "book image"/>
                        </Slide>
                    ))}
                </Slider>
                <ButtonBack>Back</ButtonBack>
                <ButtonNext>Next</ButtonNext>
            </CarouselProvider>
    )
}

export default CarouselPage; 
/*
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const createCarouselItemImage = (index, options = {}) => (
    <div key={index}>
        <img src={`/assets/${index}.jpeg`} />
        <p className="legend">Legend {index}</p>
    </div>
);

const baseChildren = <div>{[1,2,3,4,5].map(createCarouselItemImage)}</div>

const CarouselPage = ({books}) => {
    return (
        <Carousel>
            {books && books.length ? (
                <>
               {books.map((url, index) => (
                <div>
                <img src={url} alt={url} />
                <p className = "legend">Legend {index}</p>
                </div>
               ))}
               </>)
               : (
                <p>No books available</p>
            )}
        </Carousel>
    )
}

export default CarouselPage */

