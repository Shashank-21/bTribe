import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function CourseCard({ course }) {
  const [selectedVariant, setSelectedVariant] = useState(
    course.courseVariants[0]
  );
  const navigate = useNavigate();
  const { cardHeadingBgColor, cardBgColor, textColor, headingColor, optionBgColorSelected, optionBgColor } =
    useSelector((state) => state.color);

  const handleCourseCardClick = () => {
    navigate(`/courses/${course.courseId}`);
  };

  return (
    <div
      className={`w-4/5 md:w-1/4 flex flex-col justify-start items-center m-5 md:mx-20 md:my-10 ${cardBgColor} ${textColor} rounded-xl shadow-lg cursor-pointer`}
    >
      <h3
        className={`w-full px-5 py-8 ${cardHeadingBgColor} ${headingColor} text-center text-2xl font-semibold rounded-t-xl`}
      >
        {course.courseName}
      </h3>
      {course.courseVariants.length > 1 && (
        <div className='w-full flex flex-row justify-start items-center h-fit'>
          {course.courseVariants.map((courseVariant, index) => {
            return (
              <h5
                className={`text-lg text-center py-3 ${selectedVariant.variantName === courseVariant.variantName
                  ? `${optionBgColorSelected} font-semibold`
                  : optionBgColor
                  } w-full cursor-pointer`}
                onClick={() => {
                  setSelectedVariant(courseVariant);
                }}
                key={index}
              >
                {courseVariant.variantName} Course
              </h5>
            );
          })}
        </div>
      )}
      <div className={`flex flex-col justify-between items center`} onClick={handleCourseCardClick}>
        <p className='pt-5 px-10'>{selectedVariant.variantDescription}</p>
        <p className='py-5 px-10'>
          <span className='font-semibold'>Mentor Profile:</span>{" "}
          {selectedVariant.variantMentorProfile}
        </p>
        <p className='py-5 px-10'>
          <span className='font-semibold'>Investment:</span>{" "}
          {`INR ${selectedVariant.variantCost} only!`}
        </p>
        <Button secondary className='text-lg mt-10 w-1/3 mb-5 mx-auto'>
          Enroll Now
        </Button>
      </div>
    </div>
  );
}

export default CourseCard;
