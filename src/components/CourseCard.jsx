import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useThunk } from "../hooks/use-thunk";
import { changeSelectedVariant, createOrder } from "../store";
import Button from "./Button";

function CourseCard({ course }) {
  const [selectedVariant, setSelectedVariant] = useState(course.variants[0]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    cardHeadingBgColor,
    cardBgColor,
    textColor,
    headingColor,
    optionBgColorSelected,
    optionBgColor,
  } = useSelector((state) => state.color);

  const [doCreateOrder, createOrderPending, createOrderError] =
    useThunk(createOrder);

  const handleCourseCardClick = () => {
    navigate(`/courses/${course.slug}`);
  };

  const handleRegisterClick = () => {
    dispatch(changeSelectedVariant(selectedVariant));
    localStorage.setItem("selectedCourse", JSON.stringify(selectedVariant));
    doCreateOrder(selectedVariant?.variantCost);
    navigate("/payments");
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
      {course.variants.length > 1 && (
        <div className='w-full flex flex-row justify-start items-center h-fit'>
          {course.variants.map((courseVariant, index) => {
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
        primary
        className='text-lg my-10 w-1/2   mx-auto'
        onClick={handleRegisterClick}
      >
        Enroll Now
      </Button>
      {createOrderPending && (
        <p className='my-5 text-xl font-semibold text-stone-700'>
          Creating Order
        </p>
      )}
      {createOrderError && (
        <p className='my-5 text-xl font-semibold text-red-700'>
          Error creating Order
        </p>
      )}
    </div>
  );
}

export default CourseCard;
