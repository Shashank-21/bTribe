import { useThunk } from "../hooks/use-thunk";
import { cancelSlotBookingStudent } from "../store";
import timeDisplay from "../utils/timeDisplay";
import Button from "./Button";
function UpcomingSlotCardStudent({
  upcomingSlot,
  student,
  onGoing,
  doListAllSlots,
}) {
  const [
    doCancelSlotBookingStudent,
    cancelSlotBookingStudentLoading,
    cancelSlotBookingStudentError,
  ] = useThunk(cancelSlotBookingStudent);

  const handleSlotCancelClick = () => {
    doCancelSlotBookingStudent({
      slotId: upcomingSlot._id,
      token: student.token,
    });
    const interval = setTimeout(() => {
      doListAllSlots(student.token);
    }, 1000);
    if (cancelSlotBookingStudentError) {
      clearTimeout(interval);
    }
  };

  const displayDateTime = new Date(upcomingSlot.timeRef);
  return (
    <div
      className={`my-5 flex flex-col justify-around shadow-xl items-center ${
        onGoing ? " bg-yellow-400 w-4/5 mx-auto" : "bg-stone-100 w-full"
      } rounded-lg`}
    >
      <div
        className={`flex flex-row w-full justify-around items-center ${
          onGoing ? "bg-inherit" : "bg-stone-300"
        } p-5 rounded-t-lg`}
      >
        <div className='flex flex-row justify-center items-center w-1/3 text-lg'>
          <p className='font-semibold mr-3'>Mentor:</p>
          <p>{upcomingSlot?.mentor.name}</p>
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
      {upcomingSlot?.status !== "cancelled by mentor" && (
        <div className='flex flex-row justify-around w-full items-center  '>
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
              onClick={handleSlotCancelClick}
            >
              Cancel Booking
            </Button>
          )}
        </div>
      )}
      {cancelSlotBookingStudentLoading && (
        <p className='my-3 mx-auto text-green-600'>Cancelling slot</p>
      )}
      {cancelSlotBookingStudentError && (
        <p className='my-3 mx-auto text-red-600'>Error cancelling slot</p>
      )}
      {upcomingSlot?.status === "cancelled by mentor" && (
        <div className='px-10 py-3 my-5 text-stone-400 text-2xl flex flex-row justify-around items-center w-full'>
          <p className='font-semibold'>Cancelled by mentor.</p>
          <p>Reason: {upcomingSlot?.mentorCancellationReason}</p>
        </div>
      )}
    </div>
  );
}

export default UpcomingSlotCardStudent;
