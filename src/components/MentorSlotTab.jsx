import { useState } from "react";
import MentorSlotInformation from "./MentorSlotInformation";

function MentorSlotTab({ mentors, allSlots }) {
  const now = new Date();
  const lastMonth = new Date(now.getTime() - 2592000000);

  const [startDate, setStartDate] = useState(
    lastMonth.toISOString().substring(0, 10)
  );
  const [endDate, setEndDate] = useState(now.toISOString().substring(0, 10));

  const startDateChangeHandler = (event) => {
    const splitDate = event.target.value.split("-");
    lastMonth.setFullYear(splitDate[0]);
    lastMonth.setMonth(parseInt(splitDate[1]) - 1);
    lastMonth.setDate(splitDate[2]);
    setStartDate(lastMonth.toISOString().substring(0, 10));
  };
  const endDateChangeHandler = (event) => {
    const splitDate = event.target.value.split("-");
    now.setFullYear(splitDate[0]);
    now.setMonth(parseInt(splitDate[1]) - 1);
    now.setDate(splitDate[2]);
    setEndDate(now.toISOString().substring(0, 10));
  };

  const dateFilteredSlots = allSlots?.filter((slot) => {
    return (
      slot.timeRef >= new Date(startDate).getTime() &&
      slot.timeRef <= new Date(endDate).getTime()
    );
  });

  return (
    <div className='w-full flex flex-col justify-around items-center pb-20 bg-stone-100'>
      <div className='w-full flex flex-row justify-around items-center'>
        <div className='flex flex-row justify-center items-center py-5'>
          <p className='text-xl mr-3'>Start Date:</p>
          <input
            type='date'
            value={startDate}
            onChange={startDateChangeHandler}
            className={`text-xl px-5 py-3 rounded-lg cursor-pointer my-5 border border-stone-700`}
          />
        </div>
        <div className='flex flex-row justify-center items-center'>
          <p className='text-xl mr-3'>End Date:</p>
          <input
            type='date'
            value={endDate}
            onChange={endDateChangeHandler}
            className={`text-xl px-5 py-3 rounded-lg cursor-pointer my-5 border border-stone-700`}
          />
        </div>
      </div>
      {mentors?.map((mentor) => {
        return (
          <MentorSlotInformation
            mentor={mentor}
            mentorSlots={dateFilteredSlots.filter(
              (slot) => slot.mentor._id === mentor._id
            )}
            startDate={new Date(startDate).toLocaleDateString()}
            endDate={new Date(endDate).toLocaleDateString()}
            key={mentor._id}
          />
        );
      })}
    </div>
  );
}

export default MentorSlotTab;
