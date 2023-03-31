import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "./Button";
import timeDisplay from "../utils/timeDisplay";
import { useThunk } from "../hooks/use-thunk";
import { bookSlot, joinSlotWaitlist } from "../store";

function MentorSlotBookingCard({
  mentor,
  student,
  slots,
  date,
  selectedMentor,
  setSelectedMentor,
  doListAllSlots,
}) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const dateVariable = new Date(date);
  const { waitListAllowed } = useSelector((state) => state.slots);
  const { mentorSlotCardBgColor, headingColor, textColor } = useSelector(
    (state) => state.color
  );

  console.log(waitListAllowed);

  const [doBookSlot, bookSlotLoading, bookSlotError] = useThunk(bookSlot);
  const [doJoinSlotWaitlist, joinSlotWaitlistLoading, joinSlotWaitlistError] =
    useThunk(joinSlotWaitlist);

  const handleSlotBooking = () => {
    doBookSlot({ slotId: selectedSlot._id, token: student.token });
    setTimeout(() => {
      doListAllSlots(student.token);
    }, 2000);
    setSelectedMentor(null);
  };
  const handleUpdateWaitlist = () => {
    doJoinSlotWaitlist({ slotId: selectedSlot._id, token: student.token });
    setTimeout(() => {
      doListAllSlots(student.token);
    }, 2000);
    setSelectedMentor(null);
  };

  const unselectedMentorCard = (
    <div
      className={`${mentorSlotCardBgColor} w-1/3 mx-10 px-10 py-5 flex flex-col items-center justify-around rounded-lg shadow-xl`}
    >
      <h5 className={`text-xl font-semibold ${headingColor}`}>{mentor.name}</h5>
      <h5
        className={`w-4/5 text-left text-lg font-semibold mt-5 ${headingColor}`}
      >
        Courses Mentored:
      </h5>
      <ul className='list-disc list-inside'>
        {mentor.mentoredCourses.map((course, index) => {
          return (
            <li key={index} className={`text-lg ${textColor} mt-2`}>
              {course.name}
            </li>
          );
        })}
      </ul>
      <Button
        primary
        className={`mt-8`}
        onClick={() => {
          setSelectedMentor(mentor);
        }}
      >
        Book a slot with {mentor.name}
      </Button>
    </div>
  );
  const selectedMentorCard = (
    <div
      className={`${mentorSlotCardBgColor} w-1/2 mx-10 px-10 py-5 flex flex-col items-center justify-around rounded-lg shadow-xl`}
    >
      <h5 className={`text-xl font-semibold ${headingColor}`}>{mentor.name}</h5>
      <h5
        className={`w-2/5 text-left text-lg font-semibold mt-5 ${headingColor}`}
      >
        Courses Mentored:
      </h5>
      <ul className='list-disc list-inside'>
        {mentor.mentoredCourses.map((course, index) => {
          return (
            <li key={index} className={`text-lg ${textColor} mt-2`}>
              {course.name}
            </li>
          );
        })}
      </ul>
      <p className={`mt-10 ${textColor} font-semibold`}>
        {mentor.name}'s slots for {dateVariable.toLocaleDateString()}:
      </p>
      {selectedSlot && (
        <div className='flex flex-row mt-5 justify-center items-center'>
          <p className={`text-xl ${headingColor} font-semibold mr-5`}>
            {timeDisplay(selectedSlot.time)}
          </p>
          {!selectedSlot.student && (
            <Button primary onClick={handleSlotBooking}>
              Book Slot
            </Button>
          )}
          {selectedSlot.student &&
            selectedSlot.waitList.length < waitListAllowed && (
              <Button tertiary onClick={handleUpdateWaitlist}>
                Join waitlist
              </Button>
            )}
          {selectedSlot.student &&
            selectedSlot.waitList.length === waitListAllowed && (
              <p className='text-stone-400 text-xl'>
                This slot is already taken!
              </p>
            )}
          {bookSlotLoading && (
            <p className='text-stone-400 text-xl'>Booking slot</p>
          )}
          {bookSlotError && (
            <p className='text-red-600 text-xl'>
              Error booking slot. Try again
            </p>
          )}
          {joinSlotWaitlistLoading && (
            <p className='text-stone-400 text-xl'>Joining waitlist</p>
          )}
          {joinSlotWaitlistError && (
            <p className='text-red-600 text-xl'>
              Error joining waitlist. Try again
            </p>
          )}
        </div>
      )}
      <div className='flex flex-col md:flex-row items-center jusify-center mt-5'>
        {slots
          .filter((slot) => slot.mentor._id === mentor._id)
          .filter((slot) => selectedSlot?._id !== slot._id)
          .map((slot, index) => {
            return (
              <Button
                key={index}
                primary
                className='text-xl px-10 mx-5'
                onClick={() => {
                  setSelectedSlot(slot);
                }}
              >
                {timeDisplay(slot.time)}
              </Button>
            );
          })}
      </div>
    </div>
  );

  if (mentor._id === selectedMentor?._id) {
    return selectedMentorCard;
  } else {
    return unselectedMentorCard;
  }
}

export default MentorSlotBookingCard;
