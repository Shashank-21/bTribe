import { useState } from "react";
import { useSelector } from "react-redux";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

function SessionCard() {
  const [isOpen, toggleOpen] = useState(false);
  const { dashboardCardBgColor, headingColor } = useSelector(
    (state) => state.color
  );
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
        <h4 className='ml-10 font-semibold'>Live Sessions</h4>
        {isOpen ? (
          <GoChevronUp className='mr-10' />
        ) : (
          <GoChevronDown className='mr-10' />
        )}
      </div>
      {isOpen && (
        <div className={`my-10 mx-auto text-3xl w-4/5 font-semibold text-stone-400`}>
          Session Details will appear here. (Which session is upcoming? Mentor,
          Date, time and a link to join. Along with the past sessions)
        </div>
      )}
    </div>
  );
}
export default SessionCard;
