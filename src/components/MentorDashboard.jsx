import { useSelector } from "react-redux";
import MentorSlotCard from "./MentorSlotCard";
import MentorSlotForm from "./MentorSlotForm";

function MentorDashboard({ mentor, mentorSlots, doListAllSlots }) {
  const { dashboardTitleBgColor, dashboardBgColor } = useSelector(
    (state) => state.color
  );

  return (
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
        <MentorSlotForm
          mentor={mentor}
          mentorSlots={mentorSlots}
          doListAllSlots={doListAllSlots}
        />
        <MentorSlotCard />
      </div>
    </main>
  );
}
export default MentorDashboard;
