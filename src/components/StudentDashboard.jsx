import { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import AssignmentCard from "./AssignmentCard";
import SessionCard from "./SessionCard";
import StudentSlotCard from "./StudentSlotCard";

function StudentDashboard({ student, studentSlots, doListAllSlots }) {
  const tabs = ["Courses", "Certificates"];
  const [selectedTab, setSelectedTab] = useState("Courses");
  const {
    dashboardTabBgColor,
    dashboardTabBgColorSelected,
    dashboardTitleBgColor,
    textColor,
    headingColor,
    dashboardBorderColor,
    dashboardBgColor,
  } = useSelector((state) => state.color);

  const certificateContent = (
    <p className='text-2xl text-stone-400 font-semibold mx-auto mt-20 h-72'>
      You can view your certificates here
    </p>
  );
  const courseContent = (
    <>
      {student.user.courses.map((course) => {
        return (
          <Fragment key={course?._id}>
            <h3
              className={`text-2xl font-semibold ${headingColor} text-center w-full mt-10`}
            >
              {course?.course.name} - {course?.name}
            </h3>
            <SessionCard />
            <StudentSlotCard studentSlots={studentSlots} student={student} />
            <AssignmentCard />
          </Fragment>
        );
      })}
    </>
  );

  return (
    <main className={`m-10 shadow-lg rounded-lg`}>
      <div
        className={`${dashboardTitleBgColor} px-10 pt-10 PB-2 flex flex-col justify-start items-start rounded-t-lg`}
      >
        <h4
          className={`text-3xl font-semibold mx-auto`}
        >{`${student.user.name}'s Dashboard`}</h4>
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
                  ? `${dashboardTabBgColorSelected} ${headingColor} font-bold ${dashboardBorderColor} border-x-2 border-t-2 `
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
      <div
        className={`w-full  ${dashboardBgColor} border-b-2 border-x-2 ${dashboardBorderColor} flex flex-col justify-start items-center rounded-b-lg`}
      >
        {selectedTab === "Courses" ? courseContent : certificateContent}
      </div>
    </main>
  );
}
export default StudentDashboard;
