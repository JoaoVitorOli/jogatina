import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RatingView } from "react-simple-star-rating";
import { BsStarFill } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import ReactLoading from "react-loading";

import { database } from "../../services/firebase";

import styles from "./styles.module.scss";
import "./pagination.css";

interface ReviewsProps {
  id: string;
  authorAvatar: string;
  authorName: string;
  rating: number;
  createdAt: string;
  game: {
    name: string;
    cover: {
      url: string;
    };
  },
}

interface OnPageActiveProps {
  selected: number;
}

export function Home() {
  const [reviews, setReviews] = useState<ReviewsProps[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [reviewsPerPage] = useState(9);
  const [pageCount, setPageCount] = useState(0);

  const indexOfLastReview = (currentPage + 1) * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  useEffect(() => {
    const reviewsRef = database.ref("reviews");

    reviewsRef.on("value", review => {
      const databaseReviews = review.val();
      const firebaseReviews: ReviewsProps = databaseReviews ?? {};
      
      let parsedReviews = Object.entries(firebaseReviews).map(([key, value]) => {
        return {
          id: key,
          authorAvatar: value.authorAvatar,
          authorName: value.authorName,
          rating: value.rating,
          createdAt: value.createdAt,
          game: {
            name: value.game.name,
            cover: {
              url: value.game.cover.url,
            }
          },
        }
      });

      parsedReviews = parsedReviews.reverse();

      setReviews(parsedReviews);
    });

    return () => {
      reviewsRef.off("value");
    }
  }, []);

  useEffect(() => {
    if (Object.keys(reviews).length > 0) {
      setPageCount(Math.ceil( reviews.length / reviewsPerPage));
    }
  }, [reviews]);
  

  function paginate(data: OnPageActiveProps) {
    setCurrentPage(data.selected);
  }

  return (
    <>
      <div className={styles.reviewsList}>
        {reviews.length > 0 ? (
          currentReviews.map((review) => (
            <Link
              to={`review/${review.id}`}
              key={review.id}
              className={styles.item}
            >
              <img
                src={review.game.cover.url}
                alt={review.game.name}
                className={styles.gameImg}
              />
              <div>
                <h3>{review.game.name}</h3>
                <div>
                  <img src={review.authorAvatar} alt={review.authorName} />
                  <p>{review.authorName}</p>
                </div>
                <span>{review.createdAt}</span>
                <RatingView
                  ratingValue={review.rating}
                  className={styles.starRating}
                >
                  <BsStarFill size={12} />
                </RatingView>
              </div>
            </Link>
          ))
        ) : (
          <ReactLoading
            type="spin"
            color="white"
            height={30}
            width={30}
          />
        )}
      </div>

      {reviews.length > 0 && (
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={1}
          marginPagesDisplayed={1}
          previousLabel={'Prev'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          containerClassName={'pagination'}
          activeClassName={'active'}
          onPageChange={(data) => paginate(data)}
        />
      )}
    </>
  );
}
