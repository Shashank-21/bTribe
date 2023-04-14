import { useSelector } from "react-redux";
import SlotFeedbackApprovalCard from "./SlotFeedbackApprovalCard";

function SlotFeedback({ admin, allSlots, doListAllSlots }) {
  const { dashboardBgColor } = useSelector((state) => state.color);
  const slotsForFeedbackApproval = allSlots.filter((slot) => {
    return (
      slot.feedbackStudent.status === "sent for approval" ||
      slot.feedbackMentor.status === "sent for approval"
    );
  });

  return (
    <div
      className={`w-full ${dashboardBgColor}  pb-10 flex flex-col justify-start items-center rounded-b-lg`}
    >
      <h3 className='text-xl font-semibold my-5'>Slot Feedback Approvals</h3>
      {!!slotsForFeedbackApproval?.length &&
        slotsForFeedbackApproval?.map((slot) => {
          return (
            <SlotFeedbackApprovalCard
              key={slot._id}
              slot={slot}
              admin={admin}
              doListAllSlots={doListAllSlots}
            />
          );
        })}
      {!slotsForFeedbackApproval?.length && (
        <div className='bg-inherit h-72 grid place-items-center text-2xl font-semibold text-stone-400'>
          There are no pending feedback approvals
        </div>
      )}
    </div>
  );
}

export default SlotFeedback;
