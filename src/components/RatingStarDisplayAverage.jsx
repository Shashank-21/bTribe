import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

function RatingStarDisplayAverage({ rating }) {
  const ratings = [0, 1, 2, 3, 4];
  return (
    <div className='py-5 my-3 mx-2 w-fit flex flex-row items-center justify-center'>
      {ratings.map((ratingInstance) => {
        const completeRating = (
          <BsStarFill
            key={ratingInstance}
            className={`ratingInstance === 5 ? "" :"mr-3" text-3xl text-yellow-600 cursor-pointer`}
          />
        );
        const partialRating = (
          <BsStarHalf
            key={ratingInstance}
            className={`ratingInstance === 5 ? "" :"mr-3" text-3xl text-yellow-600 cursor-pointer`}
          />
        );
        const noRating = (
          <BsStar
            key={ratingInstance}
            className={`ratingInstance === 5 ? "" :"mr-3" text-3xl text-yellow-600 cursor-pointer`}
          />
        );

        if (rating - ratingInstance > 1) {
          return completeRating;
        } else if (rating - ratingInstance < 0) {
          return noRating;
        } else {
          if (
            Math.abs(rating - ratingInstance) <
            Math.abs(rating + 0.5 - ratingInstance)
          ) {
            return noRating;
          } else {
            return partialRating;
          }
        }
      })}
    </div>
  );
}

export default RatingStarDisplayAverage;
