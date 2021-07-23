import { useContext } from "react";
import { Link, useParams } from "react-router-dom";

import GameInfo from "../../components/gameInfo";
import { Markdown } from "../../components/userReview/components/markdown/Markdown";
import { StarRatin } from "../../components/userReview/components/StarRating";
import { AuthenticationContext } from "../../context/AuthentionContext";

import { useReview } from "../../hooks/useReview";

import styles from "./styles.module.scss";

interface ParamsProps {
  id: string;
}

export function Review() {
  const { user } = useContext(AuthenticationContext);  
  const params = useParams<ParamsProps>();
  const reviewId = params.id;
  const { reviewAndGame } = useReview(reviewId);

  return (
    <>
      {Object.keys(reviewAndGame).length > 0 && (
        <>
          <GameInfo 
            info={reviewAndGame.game}
          />

          <span 
            className={styles.createdBy}
          >
            Review enviada por <strong>{reviewAndGame.authorName}</strong> em <strong>{reviewAndGame.createdAt}</strong>
          </span>

          <div className={styles.markdown}>
            <Markdown 
              review={reviewAndGame.review}
            />
          </div>

          <StarRatin rating={reviewAndGame.rating} />

          {Object.keys(user).length > 1 && user.id === reviewAndGame.authorId && (
            <Link 
              to={`/review/${reviewId}/edit`}
              className={styles.editButton}
            >
              Editar review
            </Link>
          )}
        </>
      )}
    </>
  );
}
