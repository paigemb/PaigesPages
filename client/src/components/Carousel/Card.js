/*Component for each Book in the Carousel */
import { Link } from "react-router-dom"; //wraps each book item into a link to individual book page
import styled from "styled-components";

const Card = ({ book }) => (
  <>
    <CardWrapper>
      <div className="image-container">
      <Link to={`/book/${book.id}`}>
        <img src={book.volumeInfo.imageLinks.thumbnail} alt="book cover" />
        </Link>
      </div>
      <div className="content">
        <div className="heading">
          <h3 className="heading__title">
            <span className="next-line">{book.volumeInfo.title}</span>
          </h3>
        </div>
      </div>
    </CardWrapper>
  </>
);

const CardWrapper = styled.div`
  border-radius: 8px;
  background: lavendar;
  width: 150px;
  height: 300px;
  padding: 15px;
  border-style: outset;

  .image-container {
    height: 168px;
    border-radius: 8px 8px 0 0;
    overflow: hidden;

    @media (min-width: 832px) {
      height: 192px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content {
    .heading {
      .heading__title {
        font-size: 30px;
        font-family: AntiqueBookCover;
      }
    }
    .details {
      .details__text {
        font-weight: 200;
        line-height: 26px;
        color: #4b4c53;
        font-size: 15px;
        padding-bottom: 31px;
        word-spacing: 1px;
      }

      .details__btn {
        border: none;
        background: none;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 1px;
        word-spacing: -4px;
        color: #6267a1;
      }
    }

    .next-line {
      display: inline-block;
    }
  }
`;

export default Card;
