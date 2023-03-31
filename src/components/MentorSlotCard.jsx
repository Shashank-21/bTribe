import { useSelector } from "react-redux";
import { useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

function MentorSlotCard() {
  const [isOpen, toggleOpen] = useState(false);
  const { dashboardCardBgColor, headingColor } = useSelector((state) => state.color);
  return (
    <div
      className={`rounded-lg mt-10 ${dashboardCardBgColor} w-5/6 shadow-lg flex flex-col`}
    >
      <div
        className={`flex flex-row justify-between items-center my-5 ${headingColor} text-2xl cursor-pointer`}
        onClick={() => {
          toggleOpen((open) => !open);
        }}
      >
        <h4 className='ml-10 font-semibold'>1:1 Slots</h4>
        {isOpen ? (
          <GoChevronUp className='mr-10' />
        ) : (
          <GoChevronDown className='mr-10' />
        )}
      </div>
      {isOpen && (
        <div className={`my-10 mx-auto flex flex-col justify-start items-start text-3xl w-4/5 font-semibold text-stone-400`}>
          <h1 className="mx-auto mb-10 text-4xl">Upcoming Meetings</h1>
          <div className="flex flex-row justify-evenly items-center w-full mt-3">
            <p>Student Name</p>
            <p>Date and Time</p>
            <p>Link</p>
          </div>
          <div className="flex flex-row justify-evenly items-center w-full mt-3">
            <p>Student Name</p>
            <p>Date and Time</p>
            <p>Link</p>
          </div>
          <div className="flex flex-row justify-evenly items-center w-full mt-3">
            <p>Student Name</p>
            <p>Date and Time</p>
            <p>Link</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default MentorSlotCard;
