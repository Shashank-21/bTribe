import { useSelector } from "react-redux";
import { useThunk } from "../hooks/use-thunk";
import { deleteSlot } from "../store";
import timeDisplay from "../utils/timeDisplay";
import { MdDelete } from "react-icons/md";

function MentorSlot({ slot, mentor, doListAllSlots }) {
  const [doDeleteSlot, deleteSlotLoading, deleteSlotError] =
    useThunk(deleteSlot);
  const { timeBgColor, timeTextColor } = useSelector((state) => state.color);

  const handleDeleteClick = () => {
    doDeleteSlot({ slotId: slot._id, token: mentor.token });
    setTimeout(() => {
      doListAllSlots(mentor.token);
    }, 2000);
  };

  return (
    <div
      className={`ml-5 px-5 py-3 mt-3 w-fit h-fit flex flex-col items-center justify-around ${timeBgColor} ${timeTextColor} rounded-lg shadow-lg`}
    >
      <div className='flex flex-row items-center justify-between'>
        <p className='text-xl mx-2'>{timeDisplay(slot.time)}</p>
        <p className={` ${timeTextColor} ml-6 text-3xl cursor-pointer`}>
          <MdDelete onClick={handleDeleteClick} />
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
    </div>
  );
}

export default MentorSlot;
