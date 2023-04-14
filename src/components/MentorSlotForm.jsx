import { useSelector } from "react-redux";
import { useState } from "react";
import Button from "./Button";
import { useThunk } from "../hooks/use-thunk";
import { createSlot } from "../store";
import MentorSlot from "./MentorSlot";

function MentorSlotForm({ mentor, mentorSlots, doListAllSlots }) {
  const [dateError, setDateError] = useState("");
  const [dateSelected, setDateSelected] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [timeSelected, setTimeSelected] = useState(
    new Date().toTimeString().substring(0, 5)
  );
  const dateVariable = new Date(`${dateSelected}T${timeSelected}`);
  console.log(dateVariable);

  const [doCreateSlot, createSlotLoading, createSlotError] =
    useThunk(createSlot);

  const handleDateChange = (event) => {
    const splitDate = event.target.value.split("-");
    dateVariable.setFullYear(splitDate[0]);
    dateVariable.setMonth(parseInt(splitDate[1]) - 1);
    dateVariable.setDate(splitDate[2]);
    const instance = new Date();
    if (instance.getTime() >= dateVariable.getTime()) {
      setDateError("You cannot select a date and time from the past");
      setDateSelected(instance.toISOString().substring(0, 10));
    } else {
      setDateError("");
      setDateSelected(dateVariable.toISOString().substring(0, 10));
    }
  };
  const handleTimeChange = (event) => {
    const [hours, minutes] = event.target.value.split(":");
    dateVariable.setHours(hours);
    dateVariable.setMinutes(minutes);
    const instance = new Date();
    if (instance.getTime() >= dateVariable.getTime()) {
      setDateError("You cannot select a date and time from the past");
      setDateSelected(instance.toISOString().substring(0, 10));
    } else {
      setDateError("");
      setTimeSelected(dateVariable.toTimeString().substring(0, 5));
    }
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
    }, 2000);
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
        <div className='flex flex-row justify-start items-center'>
          <label className='text-xl mr-3'>Date:</label>
          <input
            type='date'
            value={dateSelected}
            onChange={handleDateChange}
            className={`text-xl px-5 py-3 rounded-lg `}
          />
        </div>
        <div className='flex flex-row justify-start items-center'>
          <label className='text-xl mr-3'>Time:</label>
          <input
            type='time'
            value={timeSelected}
            onChange={handleTimeChange}
            className={`text-xl px-5 py-3 rounded-lg w-fit`}
          />
        </div>
        <Button primary>Release Slot</Button>
      </form>
      {createSlotLoading && (
        <p className='text-green-600 text-lg my-2 mx-auto'>Creating a slot</p>
      )}
      {createSlotError && (
        <p className='text-red-600 text-lg my-2 mx-auto'>
          Error creating slot. Try again
        </p>
      )}
      {dateError && (
        <p className='text-red-600 text-lg my-2 mx-auto'>{dateError}</p>
      )}
      {dateSelected && (
        <>
          {mentorSlots?.filter((slot) => slot.date === dateSelected).length >
            0 && (
            <>
              <h3 className='mt-10 text-xl font-semibold text-center'>
                Slots Released for {new Date(dateSelected).toLocaleDateString()}
                :
              </h3>
              <div className='flex flex-row flex-wrap items-center justify-center w-full mt-3 mb-10'>
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
          {mentorSlots?.filter((slot) => slot.date === dateSelected).length ===
            0 && (
            <p className='text-xl font-semibold text-stone-400 mx-auto my-10'>
              There are no slots released on{" "}
              {new Date(dateSelected).toLocaleDateString()}
            </p>
          )}
        </>
      )}
    </div>
  );
}
export default MentorSlotForm;
