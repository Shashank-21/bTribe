import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "../components/Button";

function CourseDetailPage() {
  const { courseId } = useParams();
  const courses = useSelector((state) => state.courses);
  const { cardHeadingBgColor, cardBgColor, textColor, headingColor } =
    useSelector((state) => state.color);

  const course = courses.find((course) => course.courseId === courseId);
  const [selectedVariant, setSelectedVariant] = useState(
    course.courseVariants[0]
  );

  const handleEnrollClick = () => {
    //navigate to (Authentication and) Razorpay workflow
    console.log(course);
  }

  return (
    <div className='flex flex-col md:flex-row justify-around items-start p-10'>
      <img src={course.courseImageLink} alt={course.courseName} />;
      <div className='flex flex-col justify-start items-start w-1/2'>
        <h3 className='text-3xl font-semibold text-center w-full'>
          {course.courseName}
        </h3>
        {course.courseVariants.length > 1 && (
          <div className='flex flex-col items-center mt-10 mb-5 w-full'>
            <p className='text-lg'>Select One:</p>
            {course.courseVariants.length > 1 && (
              <div className='w-full flex flex-row justify-around items-center h-fit my-5'>
                {course.courseVariants.map((courseVariant, index) => {
                  return (
                    <h5
                      className={`text-lg text-center py-3 ${selectedVariant.variantName ===
                        courseVariant.variantName
                        ? `${cardHeadingBgColor} font-semibold`
                        : cardBgColor
                        } w-2/5 cursor-pointer`}
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

          </div>
        )}
        <p className="text-xl w-full">{selectedVariant.variantDescription}</p>
        <p className="text-xl my-5 w-full"> <span className='font-semibold'>Mentor Profile:</span>{" "}{selectedVariant.variantMentorProfile}</p>
        <ul className="list-disc list-inside text-lg mt-5">
          <p className="text-lg font-semibold">Course Includes:</p>
          {selectedVariant.variantIncludes.map((variantInclusion, index) => {
            return <li className="text-lg mt-2" key={index}>{variantInclusion}</li>
          })}
        </ul>
        <Button secondary className="my-10 mx-auto text-xl" onClick={handleEnrollClick}>Enroll Now</Button>
      </div>
    </div>
  );
}
export default CourseDetailPage;
