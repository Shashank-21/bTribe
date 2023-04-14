import { AiFillStar, AiOutlineStar } from "react-icons/ai";

function RatingStarDisplay({ rating }) {
  const ratings = [1, 2, 3, 4, 5];
  return (
    <div className='px-10 py-5 my-3 mx-auto w-fit flex flex-row items-center justify-center'>
      <p className='text-xl mr-2'>Rating:</p>
      {ratings.map((ratingInstance) => {
        return ratingInstance <= rating ? (
          <AiFillStar
            key={ratingInstance}
            className={`ratingInstance === 5 ? "" :"mr-3" text-3xl text-yellow-600 cursor-pointer`}
          />
        ) : (
          <AiOutlineStar
            key={ratingInstance}
            className={`ratingInstance === 5 ? "" :"mr-3" text-3xl text-yellow-600 cursor-pointer`}
          />
        );
      })}
    </div>
  );
}

export default RatingStarDisplay;
