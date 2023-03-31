import { useSelector } from "react-redux";
import { useState } from "react";
import Button from "./Button";
import { useThunk } from "../hooks/use-thunk";
import { createSlot } from "../store";
import MentorSlot from "./MentorSlot";

function MentorSlotForm({ mentor, mentorSlots, doListAllSlots }) {
  const dateVariable = new Date();
  const [dateSelected, setDateSelected] = useState(
    dateVariable.toISOString().substring(0, 10)
  );
  const [timeSelected, setTimeSelected] = useState(
    dateVariable.toTimeString().substring(0, 5)
  );

  const [doCreateSlot, createSlotLoading, createSlotError] =
    useThunk(createSlot);

  const handleDateChange = (event) => {
    const splitDate = event.target.value.split("-");
    dateVariable.setFullYear(splitDate[0]);
    dateVariable.setMonth(parseInt(splitDate[1]) - 1);
    dateVariable.setDate(splitDate[2]);
    setDateSelected(dateVariable.toISOString().substring(0, 10));
  };
  const handleTimeChange = (event) => {
    const [hours, minutes] = event.target.value.split(":");
    dateVariable.setHours(hours);
    dateVariable.setMinutes(minutes);
    setTimeSelected(dateVariable.toTimeString().substring(0, 5));
    // setTime(event.target.value);
  };
  const { dashboardCardBgColor, headingColor } = useSelector(
    (state) => state.color
  );

  const handleSlotRelease = (event) => {
    event.preventDefault();

    const slotDetails = {
      date: dateSelected,
      time: timeSelected,
      token: mentor.token,
    };
    doCreateSlot(slotDetails);
    setTimeout(() => {
      doListAllSlots(mentor.token);
    }, 3000);
  };

  return (
    <div
      className={`rounded-lg mt-10 ${dashboardCardBgColor} w-5/6 shadow-lg flex flex-col`}
    >
      <div
        className={`flex flex-row justify-between items-center my-5 ${headingColor} text-2xl cursor-pointer`}
      >
        <h4 className='mx-auto font-semibold'>Release Slots</h4>
      </div>
      <form
        className='flex flex-row justify-evenly items-center px-10 py-5'
        onSubmit={handleSlotRelease}
      >
        <input
          type='date'
          value={dateSelected}
          onChange={handleDateChange}
          className={`text-xl px-5 py-3 rounded-lg `}
        />
        <input
          type='time'
          value={timeSelected}
          onChange={handleTimeChange}
          className={`text-xl px-5 py-3 rounded-lg w-fit`}
        />
        <Button secondary>Release Slot</Button>
      </form>
      {createSlotLoading && (
        <p className='text-green-600 text-lg my-2'>Creating a slot</p>
      )}
      {createSlotError && (
        <p className='text-red-600 text-lg my-2'>
          Error creating slot. Try again
        </p>
      )}
      {dateSelected && (
        <>
          <h3 className='my-3 text-xl font-semibold text-center'>
            Slots Released for selected date:
          </h3>
          <div className='flex flex-row flex-wrap items-center justify-center w-full my-5'>
            {mentorSlots
              ?.filter((slot) => slot.date === dateSelected)
              .map((slot, index) => {
                return (
                  <MentorSlot
                    slot={slot}
                    key={index}
                    mentor={mentor}
                    doListAllSlots={doListAllSlots}
                  />
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}
export default MentorSlotForm;
