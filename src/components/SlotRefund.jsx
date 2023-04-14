import { useSelector } from "react-redux";
import SlotRefundApprovalCard from "./SlotRefundApprovalCard";

function SlotRefund({ admin, allSlots, doListAllSlots }) {
  const { dashboardBgColor } = useSelector((state) => state.color);
  const slotsForRefund = allSlots.filter((slot) => {
    return slot.status === "refund requested by student";
  });

  return (
    <div
      className={`w-full ${dashboardBgColor}  pb-10 flex flex-col justify-start items-center rounded-b-lg`}
    >
      <h3 className='text-xl font-semibold my-5'>Slot Refund Approvals</h3>
      {!!slotsForRefund?.length &&
        slotsForRefund?.map((slot) => {
          return (
            <SlotRefundApprovalCard
              key={slot._id}
              slot={slot}
              admin={admin}
              doListAllSlots={doListAllSlots}
            />
          );
        })}
      {!slotsForRefund?.length && (
        <div className='bg-inherit h-72 grid place-items-center text-2xl font-semibold text-stone-400'>
          There are no pending refund approvals
        </div>
      )}
    </div>
  );
}

export default SlotRefund;
