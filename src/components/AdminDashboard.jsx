import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useThunk } from "../hooks/use-thunk";
import { adminApprovalCheck, listMentors } from "../store";
import MentorSlotTab from "./MentorSlotTab";
import PendingApprovalBoard from "./PendingApprovalBoard";
import SlotFeedback from "./SlotFeedback";
import SlotRefund from "./SlotRefund";
import UserApprovals from "./UserApprovals";

function AdminDashboard({ admin, allSlots, doListAllSlots }) {
  const {
    dashboardTitleBgColor,
    dashboardTabBgColorSelected,
    headingColor,
    dashboardTabBgColor,
    textColor,
  } = useSelector((state) => state.color);

  const tabs = [
    "User Approvals",
    "Slot Refunds",
    "Feedback Approvals",
    "Mentor slots",
  ];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const courses = useSelector((state) => state.courses.data);

  const [
    doAdminApprovalCheck,
    adminApprovalCheckLoading,
    adminApprovalCheckError,
  ] = useThunk(adminApprovalCheck);

  const [doListMentors, listMentorsLoading, listMentorsError] =
    useThunk(listMentors);

  const mentors = useSelector((state) => state.user.mentors);

  useEffect(() => {
    const interval = setTimeout(() => {
      doAdminApprovalCheck({ userId: admin.user._id, token: admin.token });
      doListMentors(admin.token);
    }, 1500);
    return () => {
      clearTimeout(interval);
    };
  }, [doAdminApprovalCheck, doListMentors, admin]);

  let tabContents;

  if (selectedTab === "User Approvals") {
    tabContents = <UserApprovals admin={admin} courses={courses} />;
  } else if (selectedTab === "Feedback Approvals") {
    tabContents = (
      <SlotFeedback
        admin={admin}
        allSlots={allSlots}
        doListAllSlots={doListAllSlots}
      />
    );
  } else if (selectedTab === "Slot Refunds") {
    tabContents = (
      <SlotRefund
        admin={admin}
        allSlots={allSlots}
        doListAllSlots={doListAllSlots}
      />
    );
  } else if (selectedTab === "Mentor slots") {
    tabContents = <MentorSlotTab mentors={mentors} allSlots={allSlots} />;
  }

  const dashboardContent = (
    <main className={`m-10 shadow-lg rounded-lg`}>
      <div
        className={`${dashboardTitleBgColor} p-10 flex flex-col justify-start items-start rounded-t-lg`}
      >
        <h4
          className={`text-3xl font-semibold mx-auto`}
        >{`${admin.user.name}'s Admin Dashboard`}</h4>
      </div>
      <div
        className={`flex flex-row w-full justify-start items-center ${dashboardTitleBgColor}`}
      >
        {tabs.map((tab, i) => {
          return (
            <div
              key={i}
              className={`text-lg px-10 py-3 ${
                tab === selectedTab
                  ? `${dashboardTabBgColorSelected} ${headingColor} font-bold`
                  : `${dashboardTabBgColor} ${textColor}`
              } cursor-pointer rounded-t-lg`}
              onClick={() => {
                setSelectedTab(tab);
              }}
            >
              {tab}
            </div>
          );
        })}
      </div>
      {tabContents}
    </main>
  );

  if (adminApprovalCheckLoading || listMentorsLoading) {
    return (
      <div className='h-screen flex flex-col items-center justify-center'>
        <p className='shadow-xl w-fit p-10 text-4xl font-semibold text-stone-700 bg-stone-300 rounded-xl'>
          Loading data
        </p>
      </div>
    );
  } else if (adminApprovalCheckError || listMentorsError) {
    return <PendingApprovalBoard name={admin.user.name} role='admin' />;
  } else if (admin.user.approvalStatus === "approved") {
    return dashboardContent;
  }
}
export default AdminDashboard;
