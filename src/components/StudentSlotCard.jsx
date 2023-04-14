import { useSelector } from "react-redux";
import { useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

import CompletedSlotCardStudent from "./CompletedSlotCardStudent";
import UpcomingSlotCardStudent from "./UpcomingSlotCardStudent";

function StudentSlotCard({ student, studentSlots, doListAllSlots }) {
  const completedSlots = studentSlots?.filter((slot) => {
    const instance = new Date();
    return slot.timeRef + 30 * 60 * 1000 < instance.getTime();
  });

  const upcomingSlots = studentSlots?.filter((slot) => {
    const instance = new Date();
    return slot.timeRef > instance.getTime();
  });

  const [isOpen, toggleOpen] = useState(false);
  const { dashboardCardBgColor, headingColor } = useSelector(
    (state) => state.color
  );
  return (
    <div
      className={`rounded-lg mt-10 ${dashboardCardBgColor} w-5/6 shadow-lg flex flex-col`}
    >
      <div
        className={`flex flex-row justify-between items-center w-full my-5 ${headingColor} text-2xl cursor-pointer`}
        onClick={() => {
          toggleOpen((open) => !open);
        }}
      >
        <h4 className='ml-10 font-semibold mx-auto'>One-to-one Slots</h4>
        {isOpen ? (
          <GoChevronUp className='mr-10' />
        ) : (
          <GoChevronDown className='mr-10' />
        )}
      </div>
      {isOpen && (
        <div
          className={`mb-10 mx-auto flex flex-col justify-start items-start w-4/5`}
        >
          <div className='flex flex-col items-start justify-around w-full'>
            <h4
              className={`text-stone-700 mt-10 mb-5 mx-auto text-3xl font-semibold`}
            >
              Upcoming Slots
            </h4>
            {!upcomingSlots.length && (
              <p className='mb-5 text-xl text-stone-400 text-center w-full'>
                There are no upcoming slots for you
              </p>
            )}
            {upcomingSlots?.map((upcomingSlot) => {
              return (
                <UpcomingSlotCardStudent
                  doListAllSlots={doListAllSlots}
                  upcomingSlot={upcomingSlot}
                  student={student}
                  key={upcomingSlot._id}
                />
              );
            })}
          </div>
          <div className='flex flex-col items-start justify-around w-full'>
            <h4
              className={`text-stone-700 mt-10 mb-5 mx-auto text-3xl font-semibold`}
            >
              Completed Slots
            </h4>
            {!completedSlots.length && (
              <p className='mb-5 text-xl text-stone-400 text-center w-full'>
                You haven't had any one-on-one with a mentor yet
              </p>
            )}
            {completedSlots?.map((completedSlot) => {
              return (
                <CompletedSlotCardStudent
                  doListAllSlots={doListAllSlots}
                  completedSlot={completedSlot}
                  student={student}
                  key={completedSlot._id}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
export default StudentSlotCard;
