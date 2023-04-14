import { useState } from "react";
import { useSelector } from "react-redux";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

function AssignmentCard() {
  const [isOpen, toggleOpen] = useState(false);
  const { dashboardCardBgColor, headingColor } = useSelector(
    (state) => state.color
  );
  return (
    <div
      className={`rounded-lg my-10 ${dashboardCardBgColor} w-5/6 shadow-lg flex flex-col`}
    >
      <div
        className={`flex flex-row justify-between items-center my-5 ${headingColor} text-2xl cursor-pointer`}
        onClick={() => {
          toggleOpen((open) => !open);
        }}
      >
        <h4 className='ml-10 font-semibold'>Assignments</h4>
        {isOpen ? (
          <GoChevronUp className='mr-10' />
        ) : (
          <GoChevronDown className='mr-10' />
        )}
      </div>
      {isOpen && (
        <div
          className={`my-10 mx-auto text-3xl w-4/5 font-semibold text-stone-400`}
        >
          Assignment Submission Form Link
        </div>
      )}
    </div>
  );
}
export default AssignmentCard;
