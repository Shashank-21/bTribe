import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "./Button";

function CourseDisplaySection({ course }) {
  const { variants } = course;
  const { cardHeadingBgColor, cardBgColor } = useSelector(
    (state) => state.color
  );
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);

  let middlePart = window.location.host;
  if (window.location.host.split(".")[0] === "student") {
    middlePart = window.location.host;
  } else if (
    window.location.host.split(".")[0] === "mentor" ||
    window.location.host.split(".")[0] === "admin"
  ) {
    const tempArray = window.location.host.split(".");
    tempArray.shift();
    middlePart = `student.${tempArray.join(".")}`;
  } else {
    middlePart = `student.${window.location.host}`;
  }

  const studentRegisterLink = `${window.location.protocol}//${middlePart}/register`;

  const handleEnrollClick = () => {
    window.location.href = studentRegisterLink;
  };

  return (
    <div className='flex flex-col md:flex-row justify-around items-start p-10'>
      <img
        src={course?.imageLink}
        alt={course?.name}
        className='w-2/5 h-auto'
      />
      ;
      <div className='flex flex-col justify-start items-start w-7/12 p-10'>
        <h3 className='text-3xl font-semibold text-center w-full'>
          {course?.name}
        </h3>
        {variants?.length > 1 && (
          <div className='flex flex-col items-center mt-10 mb-5 w-full'>
            <p className='text-lg'>Select One:</p>
            {variants?.length > 1 && (
              <div className='w-full flex flex-row justify-around items-center h-fit my-5'>
                {variants?.map((courseVariant, index) => {
                  return (
                    <h5
                      className={`text-lg text-center py-3 ${
                        selectedVariant?.name === courseVariant.name
                          ? `${cardHeadingBgColor} font-semibold`
                          : cardBgColor
                      } w-2/5 cursor-pointer`}
                      onClick={() => {
                        setSelectedVariant(courseVariant);
                      }}
                      key={index}
                    >
                      {courseVariant?.name} Course
                    </h5>
                  );
                })}
              </div>
            )}
          </div>
        )}
        <p className='text-xl w-full'>{selectedVariant?.description}</p>
        <p className='text-xl my-5 w-full'>
          {" "}
          <span className='font-semibold'>Mentor Profile:</span>{" "}
          {selectedVariant?.mentorProfile}
        </p>
        <ul className='list-disc list-inside text-lg mt-5'>
          <p className='text-lg font-semibold'>Course Includes:</p>
          {selectedVariant?.details.map((variantInclusion, index) => {
            return (
              <li className='text-lg mt-2' key={index}>
                {variantInclusion}
              </li>
            );
          })}
        </ul>
        <Button
          secondary
          className='my-10 mx-auto text-xl'
          onClick={handleEnrollClick}
        >
          Enroll Now
        </Button>
      </div>
    </div>
  );
}

export default CourseDisplaySection;
