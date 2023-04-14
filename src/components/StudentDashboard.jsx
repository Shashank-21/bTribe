import { useState, Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useThunk } from "../hooks/use-thunk";
import { updatePastSlotsStudent } from "../store";
import AssignmentCard from "./AssignmentCard";
import Button from "./Button";
// import SessionCard from "./SessionCard";
import StudentSlotCard from "./StudentSlotCard";
import UpcomingSlotCardStudent from "./UpcomingSlotCardStudent";

function StudentDashboard({ student, studentSlots, doListAllSlots }) {
  const tabs = ["Courses", "Certificates"];
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("Courses");
  const {
    dashboardTabBgColor,
    dashboardTabBgColorSelected,
    dashboardTitleBgColor,
    textColor,
    headingColor,
    dashboardBgColor,
  } = useSelector((state) => state.color);

  const onGoingSlots = studentSlots?.filter((slot) => {
    const instance = new Date();
    return (
      slot.timeRef + 30 * 60 * 1000 >= instance.getTime() &&
      slot.timeRef <= instance.getTime() &&
      slot.status !== "cancelled by mentor"
    );
  });

  const [doUpdatePastSlotsStudent] = useThunk(updatePastSlotsStudent);

  useEffect(() => {
    const interval = setTimeout(() => {
      doUpdatePastSlotsStudent({
        student: student.user._id,
        token: student.token,
      });
    }, 1500);
    return () => {
      clearTimeout(interval);
    };
  }, [doUpdatePastSlotsStudent, student]);

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
              {course?.course?.name} - {course?.name} Course
            </h3>
            {!onGoingSlots?.length && (
              <div className='flex flex-col items-center w-5/6 justify-around'>
                {studentSlots?.filter(
                  (slot) => slot.status !== "cancelled by mentor"
                ).length < course.maxSlots && (
                  <Button
                    primary
                    onClick={() => {
                      navigate("/dashboard/book-slot");
                    }}
                    className='text-lg font-normal mt-10 mb-5'
                  >
                    Book a one-to-one slot with a mentor
                  </Button>
                )}
                {studentSlots?.filter(
                  (slot) => slot.status !== "cancelled by mentor"
                ).length === course.maxSlots && (
                  <p className='text-stone-400 font-semibold text-xl text-center w-fit'>
                    You cannot book any more slots
                  </p>
                )}
                <p className='text-lg bg-stone-800 text-white px-5 py-3 mt-5 rounded-lg '>
                  Remainaing slots:{" "}
                  {course.maxSlots -
                    studentSlots?.filter(
                      (slot) => slot.status !== "cancelled by mentor"
                    ).length || "Loading"}
                </p>
              </div>
            )}
            <div
              className={`flex flex-col items-start justify-around w-full px-5 mt-10 ${
                onGoingSlots?.length
                  ? "text-stone-900 rounded-2xl"
                  : "text-stone-400"
              }`}
            >
              <h4
                className={`my-5 mx-auto text-3xl font-semibold w-full px-10 text-center  ${
                  onGoingSlots?.length ? "text-stone-900" : "text-stone-700"
                }`}
              >
                Ongoing Slot:
              </h4>
              {!onGoingSlots?.length && (
                <p className={`mb-5 text-xl text-center w-full`}>
                  There are no ongoing slots
                </p>
              )}
              {onGoingSlots?.map((upcomingSlot) => {
                return (
                  <UpcomingSlotCardStudent
                    upcomingSlot={upcomingSlot}
                    student={student}
                    doListAllSlots={doListAllSlots}
                    key={upcomingSlot._id}
                    onGoing
                  />
                );
              })}
            </div>
            {/* <SessionCard /> */}
            <StudentSlotCard
              studentSlots={studentSlots}
              student={student}
              doListAllSlots={doListAllSlots}
            />
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
      <div
        className={`w-full  ${dashboardBgColor}  flex flex-col justify-start items-center rounded-b-lg`}
      >
        {selectedTab === "Courses" ? courseContent : certificateContent}
      </div>
    </main>
  );
}
export default StudentDashboard;
