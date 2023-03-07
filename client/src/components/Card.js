import styled from "styled-components";

const Card = ({book}) => (
    <>
  
        <CardWrapper>
                <div className="image-container">
                    <img src={book.volumeInfo.imageLinks.thumbnail} alt="book cover" />
                </div><div className="content">
                        <div className="heading">
                            <h3 className="heading__title">
                                 <span className="next-line">{book.volumeInfo.title}</span>
                            </h3>
                            <p className="heading__subtitle">{book.volumeInfo.authors}</p>
                        </div>

                        <div className="details">
                            <p className="details__text">
        
                            </p>
                            <button className="details__btn">Read</button>
                        </div>
                    </div>
        
        </CardWrapper>
 
    </>
);

const CardWrapper = styled.div`
  border-radius: 8px;
  background: #f5f5f6;

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
    padding: 24px 16px 31px;

    .heading {
      .heading__title {
        font-weight: 400;
       
        padding-bottom: 10px;
        line-height: 34px;
      }

      .heading__subtitle {
        font-weight: 600;
        font-size: 25px;
        color: #4b4c53;
        padding-bottom: 19px;
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