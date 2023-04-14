import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useThunk } from "../hooks/use-thunk";
import { changeRating, handleFeedback } from "../store";
import timeDisplay from "../utils/timeDisplay";
import Button from "./Button";
import FeedbackRating from "./FeerbackRating";
import Modal from "./Modal";
import RatingStarDisplay from "./RatingStarDisplay";
function CompletedSlotCardMentor({ completedSlot, mentor, doListAllSlots }) {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const rating = useSelector((state) => state.slots.rating);
  const [subjectiveFeedback, setSubjectiveFeedback] = useState("");
  const dispatch = useDispatch();

  const [doHandleFeedback, handleFeedbackLoading, handleFeedbackError] =
    useThunk(handleFeedback);

  const displayDateTime = new Date(completedSlot.timeRef);

  const handleSubjectiveFeedbackChange = (event) => {
    setSubjectiveFeedback(event.target.value);
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
      token: mentor.token,
      rating,
      subjectiveFeedback,
    });
    const interval = setTimeout(() => {
      doListAllSlots(mentor.token);
    }, 1000);
    if (handleFeedbackError) {
      clearTimeout(interval);
      return;
    }
    setShowModal(false);
    dispatch(changeRating(0));
    setSubjectiveFeedback("");
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

  return (
    <div className='my-5 w-full flex flex-col justify-around items-center bg-stone-100 rounded-lg shadow-lg'>
      {showModal && modal}
      <div className='flex flex-row w-full justify-around items-center bg-stone-300 p-5 rounded-t-lg'>
        <div className='flex flex-row justify-center items-center w-1/3 text-lg'>
          <p className='font-semibold mr-3'>Student:</p>
          <p>{completedSlot?.student.name}</p>
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
      <div className='flex flex-col justify-between w-full items-center'>
        <div className='flex flex-row justify-center items-center w-fit text-xl my-10 ml-10'>
          <p className='font-semibold mr-3'>Purpose:</p>
          <p>{completedSlot?.purpose}</p>
        </div>
        {completedSlot?.feedbackMentor.status === "approved" && (
          <div className='flex flex-col items-center justify-around w-5/6 border-stone-300 border-2 rounded-lg pt-5 mb-5'>
            <h3 className='text-xl font-semibold'>
              Feedback from {completedSlot?.student.name}
            </h3>
            <div className='flex flex0-row items-center justify-center'>
              <RatingStarDisplay
                rating={completedSlot?.feedbackMentor.rating}
              />
              <p className='text-xl ml-5'>
                {completedSlot?.feedbackMentor.subjectiveFeedback}
              </p>
            </div>
          </div>
        )}

        {!Object.keys(completedSlot?.feedbackStudent).length && (
          <Button primary className=' my-10' onClick={() => setShowModal(true)}>
            Give feedback for {completedSlot?.student.name}
          </Button>
        )}
      </div>
    </div>
  );
}

export default CompletedSlotCardMentor;
