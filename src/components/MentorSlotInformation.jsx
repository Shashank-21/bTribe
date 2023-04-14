import RatingStarDisplayAverage from "./RatingStarDisplayAverage";

function MentorSlotInformation({ mentor, mentorSlots, startDate, endDate }) {
  const completedSlots = mentorSlots.filter(
    (slot) =>
      slot.status === "completed" || slot.status === "refund request rejected"
  );

  const cancelledSlots = mentorSlots.filter(
    (slot) => slot.status === "cancelled by mentor"
  );
  const slotsNotUtilised = mentorSlots.filter(
    (slot) => slot.status === "not utilised"
  );

  const averageRatingInfo = mentorSlots
    .filter((slot) => slot.feedbackMentor.status === "approved")
    .reduce(
      (accumulator, currentValue) => {
        accumulator.totalRating += currentValue.feedbackMentor.rating;
        accumulator.numberRatings += 1;
        return accumulator;
      },
      { totalRating: 0, numberRatings: 0 }
    );

  console.log(mentor);

  return (
    <div className='flex flex-col items-center justify-around w-5/6 h-fit bg-stone-300 rounded-xl shadow-xl py-3 px-10 mt-10'>
      <div className='flex flex-row justify-around items-center w-full py-4'>
        <div className='flex flex-row items-center justify-start w-fit'>
          <p className='text-xl font-semibold mr-3'>Mentor:</p>
          <p className='text-xl '>{mentor?.name}</p>
        </div>
        <div className='flex flex-row items-center justify-start w-fit'>
          <p className='text-xl font-semibold mr-3'>Courses:</p>
          <p className='text-xl '>
            {mentor?.mentoredCourses.map((course) => course.name).join(", ")}
          </p>
        </div>
      </div>
      <p className='text-2xl w-full text-center my-3 py-4'>
        Information on {mentor?.name}'s slots between{" "}
        <span className='font-semibold'>{startDate}</span> and{" "}
        <span className='font-semibold'>{endDate}</span>{" "}
      </p>
      <div className='flex flex-row justify-around items-center w-full py-2'>
        <div className='flex flex-row items-center justify-start w-fit'>
          <p className='text-xl font-semibold mr-3'>Slots Completed:</p>
          <p className='text-xl '>{completedSlots?.length}</p>
        </div>
        <div className='flex flex-row items-center justify-start w-fit'>
          <p className='text-xl font-semibold mr-3'>Slots Cancelled:</p>
          <p className='text-xl '>{cancelledSlots?.length}</p>
        </div>
        <div className='flex flex-row items-center justify-start w-fit'>
          <p className='text-xl font-semibold mr-3'>Slots not utilised:</p>
          <p className='text-xl '>{slotsNotUtilised?.length}</p>
        </div>
      </div>
      <div className='flex flex-row items-center justify-start w-fit'>
        <div className='text-xl font-semibold'>Average Rating: </div>
        <RatingStarDisplayAverage
          rating={
            averageRatingInfo.numberRatings
              ? averageRatingInfo.totalRating / averageRatingInfo.numberRatings
              : 0
          }
        />
      </div>
    </div>
  );
}

export default MentorSlotInformation;
