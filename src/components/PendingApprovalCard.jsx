import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "./Button";
import CheckboxInput from "./CheckboxInput";
import { GoCheck, GoX } from "react-icons/go";
import Modal from "./Modal";
import { useThunk } from "../hooks/use-thunk";
import {
  approveUserRole,
  deleteUser,
  listPendingApprovalUsers,
} from "../store";

function PendingApprovalCard({ pendingApproval, courses, admin }) {
  const { approvalCardBgColor } = useSelector((state) => state.color);
  const [actionText, setActionText] = useState("Yes I'm sure. Reject the user");
  const [approvalText, setApprovalText] = useState("Approve");

  const [selectedCourses, setSelectedCourses] = useState({
    stem: `${pendingApproval?.name} has chosen these courses to mentor. You can approve their selection, add more courses, or remove any of the courses that they have chosen.`,
    options: courses?.map((course) => course.name),
    selectedOptions: pendingApproval.mentoredCourses?.map(
      (mentoredCourse) => mentoredCourse.name
    ),
  });
  const [error, setError] = useState(false);
  const [doListPendingApprovalUsers] = useThunk(listPendingApprovalUsers);
  const [doDeleteUser, deleteUserPending, deleteUserError] =
    useThunk(deleteUser);
  const [doApproveUser, approveUserPending, approveUserError] =
    useThunk(approveUserRole);

  const handleSelectedCourseChange = (event) => {
    if (!selectedCourses.selectedOptions.includes(event.target.value)) {
      setSelectedCourses({
        ...selectedCourses,
        selectedOptions: [
          ...selectedCourses.selectedOptions,
          event.target.value,
        ],
      });
      setError(false);
    } else {
      setSelectedCourses({
        ...selectedCourses,
        selectedOptions: selectedCourses.selectedOptions.filter(
          (option) => option !== event.target.value
        ),
      });
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };
  const handleRejectClick = () => {
    console.log("rejecting user");
    doDeleteUser({ userId: pendingApproval._id, token: admin.token });
    const timeout = setTimeout(() => {
      doListPendingApprovalUsers(admin.token);
      setShowModal(false);
    }, 2000);
    if (deleteUserPending) {
      setActionText("Rejecting user");
    } else if (deleteUserError) {
      setActionText("Error rejecting user");
      clearTimeout(timeout);
    }
  };

  console.log(selectedCourses);

  const handleApproveClick = () => {
    if (!selectedCourses.selectedOptions.length) {
      setError(true);
      return;
    }
    doApproveUser({
      userId: pendingApproval._id,
      token: admin.token,
      mentoredCourses: courses
        .filter((course) =>
          selectedCourses.selectedOptions.includes(course.name)
        )
        .map((course) => course._id),
    });
    const timeout = setTimeout(() => {
      doListPendingApprovalUsers(admin.token);
    }, 2000);
    if (approveUserPending) {
      setApprovalText("Approving user");
    } else if (approveUserError) {
      setApprovalText("Error approving user");
      clearTimeout(timeout);
    }
  };

  const actionBar = (
    <Button danger onClick={handleRejectClick}>
      {actionText}
    </Button>
  );

  const modal = (
    <Modal onClose={handleClose} actionBar={actionBar}>
      <p className='text-xl'>
        In case you reject this user, they'll have to register again and select
        the courses that they want to mentor (In case they're a mentor). Are you
        sure you want to reject the user?
      </p>
    </Modal>
  );

  const roles = ["Student", "Mentor", "Admin"];
  return (
    <div
      className={`w-5/6 my-5 flex flex-col items-center justify-center p-10 shadow-xl rounded-lg ${approvalCardBgColor}`}
    >
      {showModal && modal}
      <div className='flex flex-row justify-start items-center'>
        <p className='text-2xl font-semibold'>
          {pendingApproval?.name} - {roles[pendingApproval?.role]}
        </p>
      </div>
      <div className='flex flex-row justify-around w-5/6 mt-10 items-center'>
        <div className='flex flex-row justify-start items-center'>
          <p className='text-xl font-semibold mr-2'>Institute:</p>
          <p className='text-xl'>{pendingApproval?.institute}</p>
        </div>
        <div className='flex flex-row justify-start items-center'>
          <p className='text-xl font-semibold mr-2'>Company:</p>
          <p className='text-xl'>{pendingApproval?.company}</p>
        </div>
      </div>

      <CheckboxInput
        question={selectedCourses}
        onInputChange={handleSelectedCourseChange}
        className='w-5/6 mt-3 px-3'
      />
      {error && (
        <p className='text-red-600 my-5'>
          You must select at least one course for the mentor
        </p>
      )}
      <div className='flex flex-row items-center justify-center'>
        <Button
          success
          onClick={handleApproveClick}
          className='mr-2 flex flex-row items-center justify-around'
        >
          <GoCheck className='mr-2 font-semibold text-2xl' />
          <span className='text-xl'>{approvalText}</span>
        </Button>
        <Button
          danger
          onClick={handleClick}
          className='ml-2 flex flex-row items-center justify-around'
        >
          <GoX className='mr-2 font-semibold text-2xl' />
          <span className='text-xl'>Reject</span>
        </Button>
      </div>
    </div>
  );
}

export default PendingApprovalCard;
