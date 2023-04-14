import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useThunk } from "../hooks/use-thunk";
import { deleteSlot } from "../store";

import timeDisplay from "../utils/timeDisplay";
import Button from "./Button";
import Modal from "./Modal";
function UpcomingSlotCardMentor({
  upcomingSlot,
  mentor,
  doListAllSlots,
  onGoing,
}) {
  const [doDeleteSlot, deleteSlotLoading, deleteSlotError] =
    useThunk(deleteSlot);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mentorCancellationReason, setMentorCancellationReason] = useState("");

  const handleMentorCancellationReasonChange = (event) => {
    setMentorCancellationReason(event.target.value);
    if (event.target.value.length) {
      setError(false);
    }
  };

  const handleDeleteClick = () => {
    if (!mentorCancellationReason) {
      setError(true);
      return;
    }
    doDeleteSlot({
      slotId: upcomingSlot._id,
      token: mentor.token,
      mentorCancellationReason,
    });
    setShowModal(false);
    setTimeout(() => {
      doListAllSlots(mentor.token);
    }, 2000);
  };

  const modal = (
    <Modal
      onClose={() => {
        setShowModal(false);
      }}
      actionBar={
        <Button
          danger
          onClick={handleDeleteClick}
          className='flex flex-row items-center justify-center'
        >
          <MdDelete />
          <p className='ml-2'>Cancel Slot</p>
        </Button>
      }
    >
      <form className='w-full h-full grid place-items-center'>
        <textarea
          className='w-4/5 h-3/5 mx-auto p-3 text-xl border-2 border-stone-300 rounded-xl'
          placeholder='Why are you cancelling the slot?'
          value={mentorCancellationReason}
          onChange={handleMentorCancellationReasonChange}
        />
      </form>
    </Modal>
  );

  const displayDateTime = new Date(upcomingSlot?.timeRef);
  return (
    <div
      className={`my-5 flex flex-col justify-around shadow-xl items-center ${
        onGoing ? " bg-yellow-400 w-4/5 mx-auto" : "bg-stone-100 w-full"
      } rounded-lg`}
    >
      {showModal && modal}
      <div
        className={`flex flex-row w-full justify-around items-center ${
          onGoing ? "bg-inherit" : "bg-stone-300"
        } p-5 rounded-t-lg`}
      >
        <div className='flex flex-row justify-center items-center w-1/3 text-lg'>
          <p className='font-semibold mr-3'>Student:</p>
          <p>{upcomingSlot?.student.name}</p>
        </div>
        <div className='flex flex-row justify-center items-center w-1/3 text-lg'>
          <p className='font-semibold mr-3'>Date:</p>
          <p>{displayDateTime.toLocaleDateString()}</p>
        </div>
        <div className='flex flex-row justify-center items-center w-1/3 text-lg'>
          <p className='font-semibold mr-3'>Time:</p>
          <p>{timeDisplay(displayDateTime.toLocaleTimeString())}</p>
        </div>
      </div>
      <div className='flex flex-row justify-around w-full items-center'>
        <div className='flex flex-row justify-center items-center w-fit text-xl my-10 ml-10'>
          <p className='font-semibold mr-3'>Purpose:</p>
          <p>{upcomingSlot?.purpose}</p>
        </div>

        {onGoing ? (
          <a
            href={upcomingSlot?.eventDetails.hangoutLink}
            target='_blank'
            rel='noreferrer'
            className='px-10 py-3 bg-blue-700 text-white text-lg rounded-xl mr-3'
          >
            Join Here
          </a>
        ) : (
          <Button
            danger
            className='mr-10 my-10'
            onClick={() => {
              setShowModal(true);
            }}
          >
            Cancel Booking
          </Button>
        )}
      </div>
      {error && (
        <p className='text-lg text-red-700 w-fit mx-5 my-2'>
          You must provide the reason for deleting the slot
        </p>
      )}
      {deleteSlotLoading && (
        <p className='text-lg text-stone-700 w-fit mx-5 my-2'>
          Cancelling Slot
        </p>
      )}
      {deleteSlotError && (
        <p className='text-lg text-red-700 w-fit mx-5 my-2'>
          Error Cancelling Slot
        </p>
      )}
    </div>
  );
}

export default UpcomingSlotCardMentor;
