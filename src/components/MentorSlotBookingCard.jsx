import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "./Button";
import timeDisplay from "../utils/timeDisplay";
import { useThunk } from "../hooks/use-thunk";
import { bookSlot, dropOffWaitList, joinSlotWaitlist } from "../store";
import Modal from "./Modal";

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
  const [showModalBooking, setShowModalBooking] = useState(false);
  const [showModalWaitlist, setShowModalWaitlist] = useState(false);
  const [error, setError] = useState(false);
  const [purpose, setPurpose] = useState("");
  const { mentorSlotCardBgColor, headingColor, textColor } = useSelector(
    (state) => state.color
  );

  console.log(selectedSlot);
  console.log(student);
  const [doBookSlot, bookSlotLoading, bookSlotError] = useThunk(bookSlot);

  const [doJoinSlotWaitlist, joinSlotWaitlistLoading, joinSlotWaitlistError] =
    useThunk(joinSlotWaitlist);
  const [
    doDropOffSlotWaitlist,
    dropOffSlotWaitlistLoading,
    dropOffSlotWaitlistError,
  ] = useThunk(dropOffWaitList);

  const handleSlotBooking = () => {
    if (!purpose) {
      setError(true);
      return;
    }
    doBookSlot({ slotId: selectedSlot._id, token: student.token, purpose });
    setTimeout(() => {
      doListAllSlots(student.token);
    }, 2000);
    setPurpose("");
    setSelectedSlot(null);
    setShowModalBooking(false);
  };

  const handlePurposeChange = (event) => {
    setPurpose(event.target.value);
    if (event.target.value.length) {
      setError(false);
    }
  };

  const modalBooking = (
    <Modal
      onClose={() => {
        setShowModalBooking(false);
      }}
      actionBar={
        <Button primary onClick={handleSlotBooking}>
          Book Slot
        </Button>
      }
    >
      <form className='w-full h-full grid place-items-center'>
        <textarea
          className='w-4/5 h-3/5 mx-auto p-3 text-xl border-2 border-stone-300 rounded-xl'
          placeholder='Purpose for booking the slot'
          value={purpose}
          onChange={handlePurposeChange}
        />
      </form>
    </Modal>
  );

  const handleUpdateWaitlist = () => {
    if (!purpose) {
      setError(true);
      return;
    }
    doJoinSlotWaitlist({
      slotId: selectedSlot._id,
      token: student.token,
      purpose,
    });
    setTimeout(() => {
      doListAllSlots(student.token);
    }, 2000);
    setPurpose("");
    setSelectedSlot(null);
    setShowModalWaitlist(false);
  };

  const modalWaitlist = (
    <Modal
      onClose={() => {
        setShowModalBooking(false);
      }}
      actionBar={
        <Button primary onClick={handleUpdateWaitlist}>
          Join Waitlist
        </Button>
      }
    >
      <form className='w-full h-full grid place-items-center'>
        <textarea
          className='w-4/5 h-3/5 mx-auto p-3 text-xl border-2 border-stone-300 rounded-xl'
          placeholder='Purpose for booking the slot'
          value={purpose}
          onChange={handlePurposeChange}
        />
      </form>
    </Modal>
  );

  const handleSelectMentorClick = (mentor) => {
    setSelectedSlot((value) => {
      return null;
    });
    setSelectedMentor(mentor);
  };

  const dropOffWaitListClickhandler = () => {
    doDropOffSlotWaitlist({ slotId: selectedSlot?._id, token: student.token });
  };

  const unselectedMentorCard = (
    <div
      className={`${mentorSlotCardBgColor} w-1/3 mx-10 px-10 py-5 flex flex-col items-center justify-around rounded-lg shadow-xl`}
    >
      <h5 className={`text-xl font-semibold ${headingColor}`}>
        {mentor?.name}
      </h5>
      <div className='mt-5 text-md flex flex-row items-center justify-start w-fit'>
        <p className='font-semibold mr-2'>Institute:</p>
        <p className='mr-2'>{mentor?.institute}</p>
      </div>
      <div className='mt-5 text-md flex flex-row items-center justify-start w-fit'>
        <p className='font-semibold mr-2'>Company:</p>
        <p className='mr-2'>{mentor?.company}</p>
      </div>
      <h5
        className={`w-4/5 text-left text-lg font-semibold mt-5 ${headingColor}`}
      >
        Courses Mentored:
      </h5>
      <ul className='list-disc list-inside'>
        {mentor?.mentoredCourses.map((course, index) => {
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
          handleSelectMentorClick(mentor);
        }}
      >
        Book a slot with {mentor?.name}
      </Button>
    </div>
  );
  const selectedMentorCard = (
    <div
      className={`${mentorSlotCardBgColor} w-1/2 mx-10 px-10 py-5 flex flex-col items-center justify-around rounded-lg shadow-xl`}
    >
      {showModalBooking && modalBooking}
      {showModalWaitlist && modalWaitlist}
      <h5 className={`text-xl font-semibold ${headingColor}`}>
        {mentor?.name}
      </h5>
      <div className='mt-5 text-md flex flex-row items-center justify-start w-fit'>
        <p className='font-semibold mr-2'>Institute:</p>
        <p className='mr-2'>{mentor?.institute}</p>
      </div>
      <div className='mt-5 text-md flex flex-row items-center justify-start w-fit'>
        <p className='font-semibold mr-2'>Company:</p>
        <p className='mr-2'>{mentor?.company}</p>
      </div>
      <h5
        className={`w-2/5 text-left text-lg font-semibold mt-5 ${headingColor}`}
      >
        Courses Mentored:
      </h5>
      <ul className='list-disc list-inside'>
        {mentor?.mentoredCourses.map((course, index) => {
          return (
            <li key={index} className={`text-lg ${textColor} mt-2`}>
              {course.name}
            </li>
          );
        })}
      </ul>
      <p className={`mt-10 ${textColor} font-semibold`}>
        {mentor?.name}'s slots for {dateVariable.toLocaleDateString()}:
      </p>
      {selectedSlot && (
        <div className='flex flex-row mt-5 justify-center items-center'>
          <p className={`text-xl ${headingColor} font-semibold mr-5`}>
            {timeDisplay(selectedSlot.time)}
          </p>
          {!selectedSlot.student && (
            <Button
              primary
              onClick={() => {
                setShowModalBooking(true);
              }}
            >
              Book Slot
            </Button>
          )}
          {selectedSlot.student &&
            selectedSlot.student?._id !== student.user._id &&
            !selectedSlot.waitList.includes(student.user._id) &&
            selectedSlot.waitList.length < waitListAllowed && (
              <Button
                tertiary
                onClick={() => {
                  setShowModalWaitlist(true);
                }}
              >
                Join waitlist
              </Button>
            )}

          {selectedSlot.student &&
            selectedSlot.student?._id !== student.user._id &&
            !selectedSlot.waitList.includes(student.user._id) &&
            selectedSlot.waitList.length === waitListAllowed && (
              <p className='text-stone-400 text-xl'>
                This slot is already taken!
              </p>
            )}
          {selectedSlot.student &&
            selectedSlot.student?._id !== student.user._id &&
            selectedSlot.waitList.includes(student.user._id) && (
              <div className='flex flex-row items-center justify-around'>
                <p className='text-stone-400 text-xl mr-5'>
                  You're in the waitlist for this slot!
                </p>
                <Button danger onClick={dropOffWaitListClickhandler}>
                  Drop off
                </Button>
              </div>
            )}
          {selectedSlot.student &&
            selectedSlot.student?._id === student.user._id && (
              <p className='text-stone-400 text-xl'>You've booked this slot</p>
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
          {dropOffSlotWaitlistLoading && (
            <p className='text-stone-400 text-xl'>Dropping off waitlist</p>
          )}
          {dropOffSlotWaitlistError && (
            <p className='text-red-600 text-xl'>
              Error dropping off waitlist. Try again
            </p>
          )}
          {error && (
            <p className='text-red-600 text-xl'>
              You must enter why you're booking a slot
            </p>
          )}
        </div>
      )}
      <div className='flex flex-col md:flex-row items-center jusify-center mt-5'>
        {slots
          ?.filter((slot) => slot.mentor._id === mentor?._id)
          .filter((slot) => slot.date === date)
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

  if (mentor?._id === selectedMentor?._id) {
    return selectedMentorCard;
  } else {
    return unselectedMentorCard;
  }
}

export default MentorSlotBookingCard;
