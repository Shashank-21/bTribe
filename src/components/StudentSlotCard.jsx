import { useSelector } from "react-redux";
import { useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function StudentSlotCard({ student, studentSlots }) {
  const navigate = useNavigate();

  console.log(student);
  console.log(studentSlots);

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
        <h4 className='ml-10 font-semibold'>1:1 Slots</h4>
        {isOpen ? (
          <GoChevronUp className='mr-10' />
        ) : (
          <GoChevronDown className='mr-10' />
        )}
      </div>
      {isOpen && (
        <div
          className={`my-10 mx-auto flex flex-col justify-start items-start text-3xl w-4/5 font-semibold text-stone-400`}
        >
          <div className='flex flex-row justify-between items-center mt-5 w-full'>
            <p>Upcoming Meetings</p>
            <p className='font-normal text-xl'>
              {/* {
                student.slotsRemaining[
                  student.coursesEnrolled.findIndex(
                    (courseEnrolled) =>
                      courseEnrolled.courseId === course.courseId
                  )
                ]
              } */}
            </p>
          </div>
          <p className='mt-5'>Previous Slots</p>
          <Button
            secondary
            onClick={() => {
              navigate("/dashboard/book-slot");
            }}
            className='text-lg font-normal mt-5 mx-auto'
          >
            Book a slot
          </Button>
        </div>
      )}
    </div>
  );
}
export default StudentSlotCard;
