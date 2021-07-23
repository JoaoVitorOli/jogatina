import { useContext, useEffect, useState } from "react";

import { AuthenticationContext } from "../context/AuthentionContext";

import { database } from "../services/firebase";

interface GameProps {
  name: string;
  summary: string;
  cover: {
    url: string;
  };
  platforms: {
    id: string;
    name: string;
  }[] | string;
  themes: {
    id: string;
    name: string;
  }[] | string;
}

interface ReviewAndGameProps {
  authorId: string;
  authorAvatar: string;
  authorName: string;
  review: string;
  rating: number;
  createdAt: string;
  game: GameProps;
}

export function useReview(reviewId: string) {
  const { user } = useContext(AuthenticationContext);

  const [reviewAndGame, setReviewAndGame] = useState<ReviewAndGameProps>({} as ReviewAndGameProps);

  useEffect(() => {
    const ref = database.ref(`reviews/${reviewId}`);

    ref.on("value", (review) => {
      const reviewDatabase = review.val();

      console.log(reviewDatabase);
      setReviewAndGame(reviewDatabase);
    })
  }, [user.id, reviewId]);

  return{
    reviewAndGame
  };
}