import { useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { useSelector } from "react-redux";

export default function Dropdown({
  prompt,
  options,
  selectedOption,
  setSelectedOption,
}) {
  const { dropdownBgColor, dropdownBgColorSelected, textColor } = useSelector(
    (state) => state.color
  );
  const [isOpen, setIsOpen] = useState(false);

  let dropdownTop;

  const toggleOpen = () => {
    setIsOpen((open) => !open);
  };

  if (isOpen) {
    dropdownTop = prompt;
  } else {
    if (selectedOption && selectedOption.label) {
      dropdownTop = selectedOption.label;
    } else {
      dropdownTop = prompt;
    }
  }

  const handleClick = (optionClicked) => {
    setSelectedOption(optionClicked);
    setIsOpen(false);
  };

  return (
    <div
      className={`flex flex-col items-start justify-around w-5/6 ${dropdownBgColor} my-3 cursor-pointer rounded-lg shadow-lg`}
    >
      <div
        className='flex flex-row justify-between w-full items-center text-lg h-12 py-3 px-5 border-2 border-stone-300 rounded-lg'
        onClick={toggleOpen}
      >
        <p className={`${textColor}`}>{dropdownTop}</p>
        {isOpen ? <GoChevronUp /> : <GoChevronDown />}
      </div>
      {isOpen && (
        <>
          {options.map((option, index, array) => {
            return (
              <div
                key={index}
                className={`h-12 py-3 px-5 cursor-pointer w-full ${
                  option.label === selectedOption.label
                    ? dropdownBgColorSelected
                    : dropdownBgColor
                } ${index === array.length - 1 ? "rounded-b-lg" : ""}`}
                onClick={() => {
                  handleClick(option);
                }}
                value={option}
              >
                {option.label}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
