import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function CourseCard({ course }) {
  const variants = course.variants.map((variant) => {
    return { ...variant, courseName: course.name };
  });
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const navigate = useNavigate();
  const {
    cardHeadingBgColor,
    cardBgColor,
    textColor,
    headingColor,
    optionBgColorSelected,
    optionBgColor,
  } = useSelector((state) => state.color);

  const handleCourseCardClick = () => {
    navigate(`/courses/${course.slug}`);
  };

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

  const handleRegisterClick = () => {
    window.location.href = studentRegisterLink;
  };

  return (
    <div
      className={`w-4/5 md:w-1/3 2xl:w-1/4 flex flex-col justify-start items-center m-5 md:mx-20 md:my-10 ${cardBgColor} ${textColor} rounded-xl shadow-lg cursor-pointer`}
    >
      <h3
        className={`w-full px-5 py-8 ${cardHeadingBgColor} ${headingColor} text-center text-2xl font-semibold rounded-t-xl`}
      >
        {course.name}
      </h3>
      {variants.length > 1 && (
        <div className='w-full flex flex-row justify-start items-center h-fit'>
          {variants.map((courseVariant, index) => {
            return (
              <h5
                className={`text-lg text-center py-3 ${
                  selectedVariant.name === courseVariant.name
                    ? `${optionBgColorSelected} font-semibold`
                    : optionBgColor
                } w-full cursor-pointer`}
                onClick={() => {
                  setSelectedVariant(courseVariant);
                }}
                key={index}
              >
                {courseVariant.name} Course
              </h5>
            );
          })}
        </div>
      )}
      <div
        className={`flex flex-col justify-between items center`}
        onClick={handleCourseCardClick}
      >
        <p className='pt-5 px-10'>{selectedVariant.description}</p>
        <p className='py-5 px-10'>
          <span className='font-semibold'>Mentor Profile:</span>{" "}
          {selectedVariant.mentorProfile}
        </p>
        <p className='py-5 px-10'>
          <span className='font-semibold'>Investment:</span>{" "}
          {`INR ${selectedVariant.variantCost} only!`}
        </p>
      </div>
      <Button
        secondary
        className='text-lg my-10 w-2/3 mx-auto'
        onClick={handleRegisterClick}
      >
        Enroll Now
      </Button>
    </div>
  );
}

export default CourseCard;
