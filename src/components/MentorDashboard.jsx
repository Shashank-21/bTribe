import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useThunk } from "../hooks/use-thunk";
import { mentorApprovalCheck, updatePastSlotsMentor } from "../store";
import MentorSlotCard from "./MentorSlotCard";
import MentorSlotForm from "./MentorSlotForm";
import PendingApprovalCard from "./PendingApprovalBoard";
import UpcomingSlotCardMentor from "./UpcomingSlotCardMentor";

function MentorDashboard({ mentor, mentorSlots, doListAllSlots }) {
  const { dashboardTitleBgColor, dashboardBgColor } = useSelector(
    (state) => state.color
  );

  const onGoingSlots = mentorSlots?.filter((slot) => {
    const instance = new Date();
    return (
      slot.timeRef + 30 * 60 * 1000 >= instance.getTime() &&
      slot.timeRef <= instance.getTime() &&
      slot.status === "booked"
    );
  });

  const [
    doMentorApprovalCheck,
    mentorApprovalCheckLoading,
    mentorApprovalCheckError,
  ] = useThunk(mentorApprovalCheck);

  const [doUpdatePastSlotsMentor] = useThunk(updatePastSlotsMentor);

  useEffect(() => {
    const interval = setTimeout(() => {
      doMentorApprovalCheck({ userId: mentor.user._id, token: mentor.token });
      doUpdatePastSlotsMentor({ mentor: mentor.user._id, token: mentor.token });
    }, 1500);
    return () => {
      clearTimeout(interval);
    };
  }, [doMentorApprovalCheck, doUpdatePastSlotsMentor, mentor]);

  const dashboardContent = (
    <main className={`m-10 shadow-lg rounded-lg`}>
      <div
        className={`${dashboardTitleBgColor} p-10 flex flex-col justify-start items-start rounded-t-lg`}
      >
        <h4
          className={`text-3xl font-semibold mx-auto`}
        >{`${mentor.user.name}'s Dashboard`}</h4>
      </div>
      <div
        className={`w-full ${dashboardBgColor}  pb-10 flex flex-col justify-start items-center rounded-b-lg`}
      >
        <div className='flex flex-col items-start justify-around h-fit px-10 py-5'>
          <h5 className='text-xl font-semibold'>Approved Courses:</h5>
          <ul className='list-disc list-inside'>
            {mentor?.user.mentoredCourses.map((course) => {
              return (
                <li className='mt-3 text-xl' key={course._id}>
                  {course.name}
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className={`flex flex-col items-start justify-around w-full px-5 ${
            onGoingSlots?.length
              ? "text-stone-900 rounded-2xl"
              : "text-stone-400"
          }`}
        >
          <h4
            className={`my-5 mx-auto text-3xl font-semibold w-fit px-10 py-4 rounded-lg text-center  ${
              onGoingSlots?.length ? "text-stone-900 " : "text-stone-700"
            }`}
          >
            Ongoing Slot:
          </h4>
          {!onGoingSlots?.length && (
            <p
              className={`mb-5 text-xl ${
                onGoingSlots?.length ? "text-green-500" : ""
              } text-center w-full`}
            >
              There are no ongoing slots
            </p>
          )}
          {onGoingSlots?.map((upcomingSlot) => {
            return (
              <UpcomingSlotCardMentor
                upcomingSlot={upcomingSlot}
                mentor={mentor}
                doListAllSlots={doListAllSlots}
                key={upcomingSlot._id}
                onGoing
              />
            );
          })}
        </div>
        <MentorSlotForm
          mentor={mentor}
          mentorSlots={mentorSlots}
          doListAllSlots={doListAllSlots}
        />
        <MentorSlotCard
          mentor={mentor}
          mentorSlots={mentorSlots}
          doListAllSlots={doListAllSlots}
        />
      </div>
    </main>
  );

  if (mentorApprovalCheckLoading) {
    return (
      <div className='h-screen flex flex-col items-center justify-center'>
        <p className='shadow-xl w-fit p-10 text-4xl font-semibold text-stone-700 bg-stone-300 rounded-xl'>
          Loading data
        </p>
      </div>
    );
  } else if (
    mentorApprovalCheckError ||
    mentor.user.approvalStatus !== "approved"
  ) {
    return <PendingApprovalCard name={mentor.user.name} role='mentor' />;
  } else {
    return dashboardContent;
  }
}
export default MentorDashboard;
