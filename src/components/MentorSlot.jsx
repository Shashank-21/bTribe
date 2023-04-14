import { useSelector } from "react-redux";
import { useThunk } from "../hooks/use-thunk";
import { deleteSlot } from "../store";
import timeDisplay from "../utils/timeDisplay";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";

function MentorSlot({ slot, mentor, doListAllSlots }) {
  const [doDeleteSlot, deleteSlotLoading, deleteSlotError] =
    useThunk(deleteSlot);
  const { timeBgColor, timeTextColor } = useSelector((state) => state.color);
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
      slotId: slot._id,
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

  return (
    <div
      className={`ml-5 px-5 py-3 mt-3 w-fit h-fit flex flex-col items-center justify-around ${timeBgColor} ${timeTextColor} rounded-lg shadow-lg`}
    >
      {showModal && modal}

      <div className='flex flex-row items-center justify-between'>
        <p className='text-xl mx-2'>{timeDisplay(slot.time)}</p>
        <p className={` ${timeTextColor} ml-6 text-3xl cursor-pointer`}>
          <MdDelete
            onClick={() => {
              setShowModal(true);
            }}
          />
        </p>
      </div>
      {deleteSlotLoading && (
        <p className='text-lg text-stone-700 w-fit mx-5 my-2'>Deleting slot</p>
      )}
      {deleteSlotError && (
        <p className='text-lg text-red-700 w-fit mx-5 my-2'>
          Error deleting slot
        </p>
      )}
      {error && (
        <p className='text-lg text-red-700 w-fit mx-5 my-2'>
          You must provide the reason for deleting the slot
        </p>
      )}
    </div>
  );
}

export default MentorSlot;
