import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function StudentDashboard() {
  const tabs = ["Courses", "Certificates"];
  const [selectedTab, setSelectedTab] = useState("Courses");

  const {
    cardHeadingBgColor,
    cardBgColor,
    textColor,
    headingColor,
    optionBgColor,
    optionBgColorSelected,
    dashboardCardBgColor
  } = useSelector((state) => state.color);
  const { id } = useParams();
  const student = useSelector((state) => state.students).find(
    (student) => student.id === id
  );
  const courses = useSelector((state) => state.courses).filter((course) =>
    student.coursesEnrolled.find(
      (courseEnrolled) => course.courseId === courseEnrolled.courseId
    )
  );
  const studentCourses = student.coursesEnrolled.map(
    ({ courseId, variantIndex }) => {
      const { courseName, courseVariants } = courses.find(
        (course) => course.courseId === courseId
      );
      return {
        courseName,
        ...courseVariants[variantIndex],
      };
    }
  );
  const certificateContent = <p className="text-2xl text-stone-400 font-semibold m-auto">You can view your certificates here</p>
  const courseContent = (
    <>
      <div className={`h-24 rounded-lg mt-5 ${dashboardCardBgColor} w-5/6 shadow-lg `}><p className="m-auto text-xl w-fit h-fit">Session Details</p></div>
      <div className={`h-24 rounded-lg mt-5 ${dashboardCardBgColor} w-5/6 shadow-lg `}><p className="m-auto text-xl w-fit h-fit">Slot Details</p></div>
      <div className={`h-24 rounded-lg mt-5 ${dashboardCardBgColor} w-5/6 shadow-lg `}><p className="m-auto text-xl w-fit h-fit">Assignment Details</p></div>
    </>
  )
  console.log(studentCourses);
  return (
    <main className={`m-10 shadow-lg rounded-lg`}>
      <div
        className={`${cardHeadingBgColor} px-10 py-5 flex flex-col justify-start items-start rounded-t-lg`}
      >
        <h4
          className={`text-3xl font-semibold mx-auto`}
        >{`${student.name}'s Dashboard`}</h4>
      </div>
      <div className={`flex flex-row w-full justify-start items-center ${optionBgColor} shadow-inner`}>
        {tabs.map((tab, i) => {
          return (
            <div
              key={i}
              className={`text-lg px-10 py-3 ${tab === selectedTab
                ? `${optionBgColorSelected} ${headingColor} font-bold shadow-none`
                : `${optionBgColor} ${textColor}`
                } cursor-pointer`}
              onClick={() => {
                setSelectedTab(tab);
              }}
            >
              {tab}
            </div>
          );
        })}
      </div>
      <div className={`w-full h-[40rem] ${cardBgColor} flex flex-col justify-start items-center`}>
        {selectedTab === 'Courses' ? courseContent : certificateContent}
      </div>
    </main>
  );
}
export default StudentDashboard;
