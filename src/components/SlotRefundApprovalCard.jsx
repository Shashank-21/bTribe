import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "./Button";
import { GoCheck, GoX } from "react-icons/go";
import Modal from "./Modal";
import { useThunk } from "../hooks/use-thunk";
import { slotRefundRequestApprovalHandler } from "../store";
import timeDisplay from "../utils/timeDisplay";

function SlotRefundApprovalCard({ slot, admin, doListAllSlots }) {
  const { approvalCardBgColor } = useSelector((state) => state.color);
  const [actionText, setActionText] = useState(
    "Yes I'm sure. Reject the request"
  );
  const [approvalText, setApprovalText] = useState("Approve");

  const [
    doHandleRefundRequestApproval,
    handleRefundRequestApprovalLoading,
    handleRefundRequestApprovalError,
  ] = useThunk(slotRefundRequestApprovalHandler);

  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleRefundRequestRejectClick = () => {
    doHandleRefundRequestApproval({
      slotId: slot._id,
      token: admin.token,
      status: "refund request rejected",
    });
    const timeout = setTimeout(() => {
      doListAllSlots(admin.token);
    }, 2000);
    if (handleRefundRequestApprovalLoading) {
      setActionText("Rejecting refund request");
    } else if (handleRefundRequestApprovalError) {
      setActionText("Error rejecting refund request");
      clearTimeout(timeout);
    }
    setShowModal(false);
  };

  const handleRefundRequestApprovalClick = () => {
    doHandleRefundRequestApproval({
      slotId: slot._id,
      token: admin.token,
      status: "refund request approved",
    });
    const timeout = setTimeout(() => {
      doListAllSlots(admin.token);
    }, 1000);
    if (handleRefundRequestApprovalLoading) {
      setApprovalText("Accepting refund request");
    } else if (handleRefundRequestApprovalError) {
      setActionText("Error accepting refund request");
      clearTimeout(timeout);
    }
  };

  const actionBar = (
    <Button danger onClick={handleRefundRequestRejectClick}>
      {actionText}
    </Button>
  );

  const modal = (
    <Modal onClose={handleClose} actionBar={actionBar}>
      <p className='text-xl'>
        In case you reject the request for refund, it will count as a slot
        completed for the student. Are you sure that you want to reject the
        request?
      </p>
    </Modal>
  );

  return (
    <div
      className={`w-5/6 my-5 flex flex-col items-center justify-center p-10 shadow-xl rounded-lg ${approvalCardBgColor}`}
    >
      {showModal && modal}

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

      <div className='flex flex-col justify-around items-center w-full py-5 mt-5 bg-stone-100 rounded-lg'>
        <div className='flex flex-row justify-center items-center w-full mt-3'>
          <p className='text-xl font-semibold mr-2'>Purpose:</p>
          <p className='text-xl'>{slot?.purpose}</p>
        </div>
        <div className='flex flex-row justify-center items-center w-full mt-3'>
          <p className='text-xl font-semibold mr-2'>Reason for refund:</p>
          <p className='text-xl'>{slot?.studentRefundReason}</p>
        </div>
        <div className='flex flex-row items-center justify-center w-full mb-5 mt-10'>
          <Button
            success
            onClick={handleRefundRequestApprovalClick}
            className='mr-2 flex flex-row items-center justify-around px-4 py-2'
          >
            <GoCheck className='mr-2 font-semibold text-lg' />
            <span className='text-md'>{approvalText}</span>
          </Button>
          <Button
            danger
            onClick={handleClick}
            className='ml-2 flex flex-row items-center justify-around px-4 py-2'
          >
            <GoX className='mr-2 font-semibold text-lg' />
            <span className='text-md'>Reject</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SlotRefundApprovalCard;
