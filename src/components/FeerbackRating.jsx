import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { changeRating } from "../store";

function FeedbackRating() {
  const rating = useSelector((state) => state.slots.rating);
  console.log(rating);
  const dispatch = useDispatch();

  const handleRatingClick = (givenRating) => {
    dispatch(changeRating(givenRating));
  };
  const ratings = [1, 2, 3, 4, 5];
  return (
    <div className='px-10 py-5 my-3 mx-auto w-fit flex flex-row items-center justify-center'>
      <p className='text-xl mr-2'>Rating:</p>
      {ratings.map((ratingInstance) => {
        return ratingInstance <= rating ? (
          <AiFillStar
            onClick={() => {
              handleRatingClick(ratingInstance);
            }}
            key={ratingInstance}
            className={`ratingInstance === 5 ? "" :"mr-3" text-3xl text-yellow-600 cursor-pointer`}
          />
        ) : (
          <AiOutlineStar
            onClick={() => {
              handleRatingClick(ratingInstance);
            }}
            key={ratingInstance}
            className={`ratingInstance === 5 ? "" :"mr-3" text-3xl text-yellow-600 cursor-pointer`}
          />
        );
      })}
    </div>
  );
}

export default FeedbackRating;
