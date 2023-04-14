import { useSelector } from "react-redux";

function CheckboxInput({ question, onInputChange, className, entryError }) {
  const { stem, options, selectedOptions } = question;
  const appliedClass = className;

  const { headingColor, textColor } = useSelector((state) => state.color);

  return (
    <div
      className={`flex flex-col justify-around items-start rounded-lg p-5 ${appliedClass} bg-inherit`}
    >
      <p
        className={`text-xl mb-5 w-full text-left ${headingColor} font-bold-inline`}
      >
        {question.stem}
      </p>
      {options.map((option, index) => {
        return (
          <div
            className='flex flex-row flex-wrap justify-start items-center my-2'
            key={index}
          >
            <input
              type='checkbox'
              id={option}
              name={stem}
              value={option}
              onChange={onInputChange}
              checked={selectedOptions.includes(option)}
              className='w-6 h-6 cursor-pointer'
            />
            <label className={`text-xl ml-2 ${textColor}`}>{option}</label>
          </div>
        );
      })}
      {entryError && question.selectedOptions.length === 0 && (
        <p className='text-md md:text-lg mt-5 text-red-600'>
          Please select at least one option
        </p>
      )}
    </div>
  );
}

export default CheckboxInput;
