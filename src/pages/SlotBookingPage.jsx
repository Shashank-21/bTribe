import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import MentorSlotBookingCard from "../components/MentorSlotBookingCard";
import { useThunk } from "../hooks/use-thunk";
import { listAllSlots, listMentors } from "../store";

function SlotBookingPage() {
  const navigate = useNavigate();
  const dateVariable = new Date();
  const [dateSelected, setDateSelected] = useState(
    dateVariable.toISOString().substring(0, 10)
  );
  console.log(dateSelected);
  const slots = useSelector((state) => state.slots.allSlots).filter(
    (slot) => slot.date === dateSelected
  );

  console.log(slots);

  const userState = useSelector((state) => state.user);
  const mentors = userState.mentors;
  const userData = userState.data;

  const [doListMentors, listMentorsLoading, listMentorsError] =
    useThunk(listMentors);
  const [doListAllSlots] = useThunk(listAllSlots);

  useEffect(() => {
    const interval = setTimeout(() => {
      console.log("fetching mentors");
      doListMentors(userData?.token);
    });
    return () => {
      clearTimeout(interval);
    };
  }, [doListMentors, userData]);

  const [selectedMentor, setSelectedMentor] = useState(null);

  const dateHandler = (event) => {
    const splitDate = event.target.value.split("-");
    dateVariable.setFullYear(splitDate[0]);
    dateVariable.setMonth(parseInt(splitDate[1]) - 1);
    dateVariable.setDate(splitDate[2]);
    setDateSelected(dateVariable.toISOString().substring(0, 10));
  };

  let contentToDisplay;

  if (listMentorsLoading) {
    contentToDisplay = (
      <div className='h-screen flex flex-col items-center justify-center'>
        <p className='shadow-xl w-fit p-10 text-4xl font-semibold text-stone-700 bg-stone-300 rounded-xl'>
          Loading data
        </p>
      </div>
    );
  } else if (listMentorsError) {
    contentToDisplay = (
      <div className='h-screen flex flex-col items-center justify-center'>
        <p className='shadow-xl w-fit p-10 text-4xl font-semibold text-stone-700 bg-stone-300 rounded-xl'>
          Error retreiving data. Try again
        </p>
        <Button
          secondary
          className='my-5 mx-auto'
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </div>
    );
  } else {
    contentToDisplay = (
      <div className='w-full flex flex-col justify-around items-center'>
        <div className='flex flex-row justify-center items-center'>
          <p className='text-xl mr-3'>Select a date:</p>
          <input
            type='date'
            value={dateSelected}
            onChange={dateHandler}
            className={`text-xl px-5 py-3 rounded-lg cursor-pointer my-5 border border-stone-700`}
          />
        </div>
        {selectedMentor && (
          <MentorSlotBookingCard
            doListAllSlots={doListAllSlots}
            student={userData}
            mentor={selectedMentor}
            slots={slots}
            date={dateSelected}
            selectedMentor={selectedMentor}
            setSelectedMentor={setSelectedMentor}
          />
        )}
        <div className='w-full flex flex-col items-center justify-around'>
          <h4 className='text-xl mt-10 font-semibold'>
            {selectedMentor
              ? `Other mentors available on ${new Date(
                  dateSelected
                ).toLocaleDateString()}`
              : `Mentors available on ${new Date(
                  dateSelected
                ).toLocaleDateString()}`}
          </h4>
          <div className='flex flex-row justify-start items-start w-4/5 mt-10'>
            {mentors
              ?.filter((mentor) => mentor?._id !== selectedMentor?._id)
              .filter((mentor) => {
                return slots?.find((slot) => slot?.mentor._id === mentor?._id);
              })
              .map((mentor, index) => {
                return (
                  <MentorSlotBookingCard
                    key={index}
                    mentor={mentor}
                    slots={slots?.filter(
                      (slot) => slot?.mentor._id === mentor?._id
                    )}
                    date={dateSelected}
                    selectedMentor={selectedMentor}
                    setSelectedMentor={setSelectedMentor}
                  />
                );
              })}
          </div>
        </div>
      </div>
    );
  }

  return contentToDisplay;
}
export default SlotBookingPage;
