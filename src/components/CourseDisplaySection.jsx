import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useThunk } from "../hooks/use-thunk";
import { changeSelectedVariant, createOrder } from "../store";
import Button from "./Button";

function CourseDisplaySection({ course }) {
  const dispatch = useDispatch();
  const { variants } = course;
  const navigate = useNavigate();
  const { cardHeadingBgColor, cardBgColor } = useSelector(
    (state) => state.color
  );
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const [doCreateOrder, createOrderPending, createOrderError] =
    useThunk(createOrder);
  const handleEnrollClick = () => {
    dispatch(changeSelectedVariant(selectedVariant));
    localStorage.setItem("selectedCourse", JSON.stringify(selectedVariant));
    doCreateOrder(selectedVariant?.variantCost);
    navigate("/payments");
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
        <p className='mt-5 text-xl font-semibold'>
          Investment: INR {selectedVariant?.variantCost} only
        </p>
        <Button
          primary
          className='my-10 mx-auto text-xl'
          onClick={handleEnrollClick}
        >
          Enroll Now
        </Button>
      </div>
      {createOrderPending && (
        <p className='mt-5 text-xl font-semibold text-stone-700'>
          Creating Order
        </p>
      )}
      {createOrderError && (
        <p className='mt-5 text-xl font-semibold text-red-700'>
          Error creating Order
        </p>
      )}
    </div>
  );
}

export default CourseDisplaySection;
