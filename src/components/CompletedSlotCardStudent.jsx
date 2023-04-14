import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useThunk } from "../hooks/use-thunk";
import {
  changeRating,
  handleFeedback,
  slotRefundRequestHandler,
} from "../store";
import timeDisplay from "../utils/timeDisplay";
import Button from "./Button";
import FeedbackRating from "./FeerbackRating";
import Modal from "./Modal";
import RatingStarDisplay from "./RatingStarDisplay";
function CompletedSlotCardStudent({ completedSlot, student, doListAllSlots }) {
  const [showModal, setShowModal] = useState(false);
  const [showModalRefund, setShowModalRefund] = useState(false);
  const [studentRefundReason, setStudentRefundReason] = useState("");
  const [error, setError] = useState(false);
  const rating = useSelector((state) => state.slots.rating);
  const [subjectiveFeedback, setSubjectiveFeedback] = useState("");
  const dispatch = useDispatch();

  const [doHandleFeedback, handleFeedbackLoading, handleFeedbackError] =
    useThunk(handleFeedback);

  const [
    doHandleRefundRequest,
    handleRefundRequestPending,
    handleRefundRequestError,
  ] = useThunk(slotRefundRequestHandler);

  const displayDateTime = new Date(completedSlot.timeRef);

  const handleSubjectiveFeedbackChange = (event) => {
    setSubjectiveFeedback(event.target.value);
    if (event.target.value) {
      setError(false);
    }
  };
  const handleStudentRefundReasonChange = (event) => {
    setStudentRefundReason(event.target.value);
    if (event.target.value) {
      setError(false);
    }
  };

  const handleFeedbackSubmit = () => {
    if (!rating || !subjectiveFeedback) {
      setError(true);
      return;
    }
    doHandleFeedback({
      slotId: completedSlot._id,
      token: student.token,
      rating,
      subjectiveFeedback,
    });
    const interval = setTimeout(() => {
      doListAllSlots(student.token);
    }, 1000);
    if (handleFeedbackError) {
      clearTimeout(interval);
      return;
    }
    setShowModal(false);
    dispatch(changeRating(0));
    setSubjectiveFeedback("");
  };
  const handleRefundRequestSubmit = () => {
    if (!studentRefundReason) {
      setError(true);
      return;
    }
    doHandleRefundRequest({
      slotId: completedSlot._id,
      token: student.token,
      studentRefundReason,
    });
    const interval = setTimeout(() => {
      doListAllSlots(student.token);
    }, 1000);
    if (handleRefundRequestError) {
      clearTimeout(interval);
      return;
    }
    setShowModalRefund(false);
    setStudentRefundReason("");
  };

  const modal = (
    <Modal
      onClose={() => {
        setShowModal(false);
      }}
      actionBar={
        <Button
          primary
          onClick={handleFeedbackSubmit}
          className='flex flex-row items-center justify-center'
        >
          Submit
        </Button>
      }
    >
      <FeedbackRating />
      <form className='w-full h-full grid place-items-center'>
        <textarea
          className='w-4/5 h-3/5 mx-auto p-3 text-xl border-2 border-stone-300 rounded-xl'
          placeholder='Elaborate on your rating, please'
          value={subjectiveFeedback}
          onChange={handleSubjectiveFeedbackChange}
        />
      </form>
      {handleFeedbackLoading && <p className='my-3'>Submitting feedback</p>}
      {error && (
        <p className='my-3 text-red-600'>
          Please provide the rating and your reason for the rating
        </p>
      )}
      {handleFeedbackError && (
        <p className='my-3 text-red-600'>Error Submitting feedback</p>
      )}
    </Modal>
  );
  const modalRefund = (
    <Modal
      onClose={() => {
        setShowModalRefund(false);
      }}
      actionBar={
        <Button
          primary
          onClick={handleRefundRequestSubmit}
          className='flex flex-row items-center justify-center'
        >
          Submit Request
        </Button>
      }
    >
      <form className='w-full h-full grid place-items-center'>
        <textarea
          className='w-4/5 h-3/5 mx-auto p-3 text-xl border-2 border-stone-300 rounded-xl'
          placeholder='Why do you want this slot to be refunded?'
          value={studentRefundReason}
          onChange={handleStudentRefundReasonChange}
        />
      </form>
      {handleRefundRequestPending && <p className='my-3'>Submitting request</p>}
      {error && (
        <p className='my-3 text-red-600'>
          Please provide the rating and your reason for the request
        </p>
      )}
      {handleRefundRequestError && (
        <p className='my-3 text-red-600'>Error Submitting request</p>
      )}
    </Modal>
  );

  return (
    <div className='my-5 w-full flex flex-col justify-around items-center bg-stone-100 rounded-lg shadow-lg'>
      {showModal && modal}
      {showModalRefund && modalRefund}
      <div className='flex flex-row w-full justify-around items-center bg-stone-300 p-5 rounded-t-lg'>
        <div className='flex flex-row justify-center items-center w-1/3 text-lg'>
          <p className='font-semibold mr-3'>Mentor:</p>
          <p>{completedSlot?.mentor.name}</p>
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
      {completedSlot?.status !== "cancelled by mentor" && (
        <div className='flex flex-col justify-between w-full items-center'>
          <div className='flex flex-row justify-center items-center w-fit text-xl my-10 ml-10'>
            <p className='font-semibold mr-3'>Purpose:</p>
            <p>{completedSlot?.purpose}</p>
          </div>
          {completedSlot?.feedbackStudent.status === "approved" && (
            <div className='flex flex-col items-center justify-around w-5/6 border-stone-300 border-2 rounded-lg pt-5 mb-5'>
              <h3 className='text-xl font-semibold'>
                Feedback from {completedSlot?.mentor.name}
              </h3>
              <div className='flex flex0-row items-center justify-center'>
                <RatingStarDisplay
                  rating={completedSlot?.feedbackStudent.rating}
                />
                <p className='text-xl ml-5'>
                  {completedSlot?.feedbackStudent.subjectiveFeedback}
                </p>
              </div>
            </div>
          )}
          <div className='flex flex-row items-center justify-center w-full my-10'>
            {!Object.keys(completedSlot?.feedbackMentor).length && (
              <Button
                primary
                className='mr-3'
                onClick={() => setShowModal(true)}
              >
                Give feedback for {completedSlot?.mentor.name}
              </Button>
            )}

            {completedSlot?.status !== "refund requested by student" &&
              completedSlot?.status !== "refund request rejected" && (
                <Button
                  secondary
                  className='mr-3'
                  onClick={() => setShowModalRefund(true)}
                >
                  Request Slot Refund
                </Button>
              )}
            {completedSlot?.status === "refund requested by student" && (
              <p className='text-xl text-stone-500 bg-stone-300 px-5 py-3 rounded-xl'>
                Refund Requested
              </p>
            )}
            {completedSlot?.status === "refund request rejected" && (
              <p className='text-xl text-stone-500 bg-stone-300 px-5 py-3 rounded-xl'>
                Refund Request Rejected
              </p>
            )}
          </div>
        </div>
      )}
      {completedSlot?.status === "cancelled by mentor" && (
        <div className='px-10 py-3 my-5 text-stone-400 text-2xl flex flex-row justify-around items-center w-full'>
          <p className='font-semibold'>Cancelled by mentor.</p>
          <p>Reason: {completedSlot?.mentorCancellationReason}</p>
        </div>
      )}
    </div>
  );
}

export default CompletedSlotCardStudent;
