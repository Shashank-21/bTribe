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
  const slotData = useSelector((state) => state.slots);
  //console.log(slotData);
  const slots = useSelector((state) => state.slots.allSlots)?.filter(
    (slot) =>
      slot.timeRef > new Date(dateSelected).getTime() &&
      slot.status !== "cancelled by mentor"
  );

  const userState = useSelector((state) => state.user);
  const mentors = userState.mentors;
  const userData = userState.data;
  //console.log(userData);

  const mentorsAvailable = mentors
    ?.filter((mentor) => {
      return slots?.find((slot) => slot?.mentor._id === mentor?._id);
    })
    .filter((mentor) => {
      return mentor?.mentoredCourses.find((mentoredCourse) => {
        return mentoredCourse.variants.includes(userData.user.courses[0]._id);
      });
    });

  //console.log(mentorsAvailable);

  const [doListMentors, listMentorsLoading, listMentorsError] =
    useThunk(listMentors);
  const [doListAllSlots] = useThunk(listAllSlots);

  useEffect(() => {
    const interval = setTimeout(() => {
      //console.log("fetching mentors");
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
        <div className='flex flex-row items-center justify-center my-5'>
          <Button
            secondary
            className='mr-5'
            onClick={() => navigate("/mentor/login")}
          >
            Are you a mentor?
          </Button>
          <Button secondary onClick={() => navigate("/student/login")}>
            Are you a student?
          </Button>
        </div>
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
          {!!mentorsAvailable?.length && (
            <h4 className='text-xl mt-10 font-semibold'>
              {selectedMentor
                ? `Other mentors available on ${new Date(
                    dateSelected
                  ).toLocaleDateString()}`
                : `Mentors available on ${new Date(
                    dateSelected
                  ).toLocaleDateString()}`}
            </h4>
          )}
          <div className='flex flex-row justify-start items-start w-4/5 mt-10'>
            {!!mentorsAvailable?.length &&
              mentorsAvailable
                ?.filter((mentor) => mentor?._id !== selectedMentor?._id)

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
            {!mentorsAvailable?.length && (
              <div className='h-72 w-full grid place-items-center '>
                <p className='font-semibold w-fit p-10 text-2xl text-stone-400 bg-stone-100 rounded-lg shadow-lg'>
                  No mentors are available on{" "}
                  {new Date(dateSelected).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
          <Button
            secondary
            className='my-20'
            onClick={() => navigate(`/dashboard/${userData.user._id}`)}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return contentToDisplay;
}
export default SlotBookingPage;
