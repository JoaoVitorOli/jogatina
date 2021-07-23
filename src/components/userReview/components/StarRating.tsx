import { Rating, RatingView } from "react-simple-star-rating";
import { BsStarFill } from "react-icons/bs";

interface StarRatinProps {
  rating: number;
  onChangeFunction?: (rating: number) => void;
}

export function StarRatin({
  rating,
  onChangeFunction
}: StarRatinProps) {
  return(
    <>
      {onChangeFunction ? (
        <Rating
          ratingValue={rating}
          onClick={onChangeFunction}
          size={52}
        >
          <BsStarFill size={42} />
        </Rating>
      ) : (
        <RatingView
          ratingValue={rating}
        />
      )}
    </>
  );
}