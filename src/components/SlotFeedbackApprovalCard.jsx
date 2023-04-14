import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "./Button";
import { GoCheck, GoX } from "react-icons/go";
import Modal from "./Modal";
import { useThunk } from "../hooks/use-thunk";
import { handleFeedbackApproval } from "../store";
import timeDisplay from "../utils/timeDisplay";
import RatingStarDisplay from "./RatingStarDisplay";

function SlotFeedbackApprovalCard({ slot, admin, doListAllSlots }) {
  const { approvalCardBgColor } = useSelector((state) => state.color);
  const [actionText, setActionText] = useState(
    "Yes I'm sure. Reject the feedback"
  );
  const [approvalText, setApprovalText] = useState("Approve");

  const [
    doHandleFeedbackApproval,
    handleFeedbackApprovalLoading,
    handleFeedbackApprovalError,
  ] = useThunk(handleFeedbackApproval);

  const [showModalStudent, setShowModalStudent] = useState(false);
  const [showModalMentor, setShowModalMentor] = useState(false);

  const handleClickStudent = () => {
    setShowModalStudent(true);
  };
  const handleClickMentor = () => {
    setShowModalStudent(true);
  };

  const handleCloseStudent = () => {
    setShowModalStudent(false);
  };
  const handleCloseMentor = () => {
    setShowModalMentor(false);
  };

  const handleMentorFeedbackRejectClick = () => {
    doHandleFeedbackApproval({
      slotId: slot._id,
      token: admin.token,
      mentorFeedbackVerdict: "rejected",
      studentFeedbackVerdict: "",
    });
    const timeout = setTimeout(() => {
      doListAllSlots(admin.token);
    }, 2000);
    if (handleFeedbackApprovalLoading) {
      setActionText("Rejecting mentor feedback");
    } else if (handleFeedbackApprovalError) {
      setActionText("Error rejecting mentor feedback");
      clearTimeout(timeout);
    }
    setShowModalMentor(false);
  };
  const handleStudentFeedbackRejectClick = () => {
    doHandleFeedbackApproval({
      slotId: slot._id,
      token: admin.token,
      mentorFeedbackVerdict: "",
      studentFeedbackVerdict: "rejected",
    });
    const timeout = setTimeout(() => {
      doListAllSlots(admin.token);
    }, 2000);
    if (handleFeedbackApprovalLoading) {
      setActionText("Rejecting student feedback");
    } else if (handleFeedbackApprovalError) {
      setActionText("Error rejecting student feedback");
      clearTimeout(timeout);
    }
    setShowModalStudent(false);
  };
  const handleMentorFeedbackApprovalClick = () => {
    doHandleFeedbackApproval({
      slotId: slot._id,
      token: admin.token,
      mentorFeedbackVerdict: "approved",
      studentFeedbackVerdict: "",
    });
    const timeout = setTimeout(() => {
      doListAllSlots(admin.token);
    }, 1000);
    if (handleFeedbackApprovalLoading) {
      setApprovalText("Accepting mentor feedback");
    } else if (handleFeedbackApprovalError) {
      setActionText("Error accepting mentor feedback");
      clearTimeout(timeout);
    }
  };
  const handleStudentFeedbackApprovalClick = () => {
    doHandleFeedbackApproval({
      slotId: slot._id,
      token: admin.token,
      mentorFeedbackVerdict: "",
      studentFeedbackVerdict: "approved",
    });
    const timeout = setTimeout(() => {
      doListAllSlots(admin.token);
    }, 1000);
    if (handleFeedbackApprovalLoading) {
      setApprovalText("Accepting student feedback");
    } else if (handleFeedbackApprovalError) {
      setActionText("Error accepting student feedback");
      clearTimeout(timeout);
    }
  };

  const actionBarStudent = (
    <Button danger onClick={handleStudentFeedbackRejectClick}>
      {actionText}
    </Button>
  );

  const modalStudent = (
    <Modal onClose={handleCloseStudent} actionBar={actionBarStudent}>
      <p className='text-xl'>
        In case you reject the feedback for this student, the mentor has to
        enter it again. Are you sure you want to reject this feedback?
      </p>
    </Modal>
  );
  const actionBarMentor = (
    <Button danger onClick={handleMentorFeedbackRejectClick}>
      {actionText}
    </Button>
  );

  const modalMentor = (
    <Modal onClose={handleCloseMentor} actionBar={actionBarMentor}>
      <p className='text-xl'>
        In case you reject the feedback for this student, the mentor has to
        enter it again. Are you sure you want to reject this feedback?
      </p>
    </Modal>
  );

  return (
    <div
      className={`w-5/6 my-5 flex flex-col items-center justify-center p-10 shadow-xl rounded-lg ${approvalCardBgColor}`}
    >
      {showModalStudent && modalStudent}
      {showModalMentor && modalMentor}
      <div className='flex flex-row justify-start items-center w-fit mx-auto'>
        <p className='text-2xl font-semibold mr-20'>
          Date: {new Date(slot?.timeRef).toLocaleDateString()}
        </p>
        <p className='text-2xl font-semibold'>
          Time: {timeDisplay(new Date(slot?.timeRef).toTimeString())}
        </p>
      </div>
      <div className='flex flex-row justify-around w-5/6 mt-10 items-center'>
        <div className='flex flex-row justify-start items-center'>
          <p className='text-xl font-semibold mr-2'>Mentor:</p>
          <p className='text-xl'>{slot?.mentor.name}</p>
        </div>
        <div className='flex flex-row justify-start items-center'>
          <p className='text-xl font-semibold mr-2'>Student:</p>
          <p className='text-xl'>{slot?.student.name}</p>
        </div>
      </div>
      {slot.feedbackMentor.status === "sent for approval" && (
        <div className='flex flex-col justify-around items-center w-full py-5 mt-5 bg-stone-100 rounded-lg'>
          <p className='text-xl font-semibold mr-2'>
            Feedback for {slot?.mentor.name}:
          </p>
          <RatingStarDisplay rating={slot?.feedbackMentor.rating} />
          <div className='flex flex-row justify-center items-center w-full'>
            <p className='text-xl font-semibold mr-2'>{slot?.student.name}:</p>
            <p className='text-xl'>{slot?.feedbackMentor.subjectiveFeedback}</p>
          </div>

          <div className='flex flex-row items-center justify-center w-full mb-5 mt-10'>
            <Button
              success
              onClick={handleMentorFeedbackApprovalClick}
              className='mr-2 flex flex-row items-center justify-around px-4 py-2'
            >
              <GoCheck className='mr-2 font-semibold text-lg' />
              <span className='text-md'>{approvalText}</span>
            </Button>
            <Button
              danger
              onClick={handleClickMentor}
              className='ml-2 flex flex-row items-center justify-around px-4 py-2'
            >
              <GoX className='mr-2 font-semibold text-lg' />
              <span className='text-md'>Reject</span>
            </Button>
          </div>
        </div>
      )}
      {slot.feedbackStudent.status === "sent for approval" && (
        <div className='flex flex-col justify-around items-center w-full py-5 mt-5 bg-stone-100 rounded-lg'>
          <p className='text-xl font-semibold mr-2'>
            Feedback for {slot?.student.name}:
          </p>
          <RatingStarDisplay rating={slot?.feedbackStudent.rating} />
          <div className='flex flex-row justify-center items-center w-full'>
            <p className='text-xl font-semibold mr-2'>{slot?.mentor.name}:</p>
            <p className='text-xl'>
              {slot?.feedbackStudent.subjectiveFeedback}
            </p>
          </div>

          <div className='flex flex-row items-center justify-center w-full mt-10 mb-5'>
            <Button
              success
              onClick={handleStudentFeedbackApprovalClick}
              className='mr-2 flex flex-row items-center justify-around py-2 px-4'
            >
              <GoCheck className='mr-2 font-semibold text-lg' />
              <span className='text-md'>{approvalText}</span>
            </Button>
            <Button
              danger
              onClick={handleClickStudent}
              className='ml-2 flex flex-row items-center justify-around py-2 px-4'
            >
              <GoX className='mr-2 font-semibold text-lg' />
              <span className='text-md'>Reject</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SlotFeedbackApprovalCard;
