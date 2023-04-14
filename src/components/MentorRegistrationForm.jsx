import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useThunk } from "../hooks/use-thunk";
import { updateUser } from "../store";
import Button from "../components/Button";
import CheckboxInput from "./CheckboxInput";

function MentorRegistrationForm({ user, role, courses }) {
  const data = user?.user;
  console.log(role);
  const navigate = useNavigate();
  const [doUpdateUser, updateUserLoading, updateUserError] =
    useThunk(updateUser);
  const [phone, setPhone] = useState("");
  const [institute, setInstitute] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState({
    stem: "Select the courses you want to take",
    options: courses.map((course) => course.name),
    selectedOptions: [],
  });
  const regExpPhone = /(\+[0-9]{1,3}-)?\(?[0-9]{3}\)?-?[0-9]{3}-?[0-9]{4}/;
  const { formBgColor, formPlaceholderColor, textColor } = useSelector(
    (state) => state.color
  );

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    if (phone.match(regExpPhone)) {
      setError(false);
    }
  };
  const handleInstituteChange = (event) => {
    setInstitute(event.target.value);
  };
  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
  };

  const handleSelectedCourseChange = (event) => {
    if (selectedCourses.selectedOptions.length !== 0) setError(false);
    if (!selectedCourses.selectedOptions.includes(event.target.value)) {
      setSelectedCourses({
        ...selectedCourses,
        selectedOptions: [
          ...selectedCourses.selectedOptions,
          event.target.value,
        ],
      });
    } else {
      setSelectedCourses({
        ...selectedCourses,
        selectedOptions: selectedCourses.selectedOptions.filter(
          (option) => option !== event.target.value
        ),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!phone.match(regExpPhone)) {
      setError(true);
      console.log("something is wrong");
    } else {
      const registerData = {
        _id: data._id,
        name: data.name,
        phone,
        role,
        mentoredCourses: courses
          .filter((course) =>
            selectedCourses.selectedOptions.includes(course.name)
          )
          .map((course) => course._id),
        institute,
        company,
      };

      doUpdateUser(registerData);

      if (updateUserLoading) {
        console.log("Updating User");
      } else if (updateUserError) {
        console.log("Error!");
      } else {
        console.log("something");
        setTimeout(() => {
          navigate(`/dashboard/${data._id}`);
        }, 1000);
      }
    }
  };
  return (
    <form
      className={`flex flex-col ${formBgColor} items-center justify-around 2xl:w-1/3 md:w-1/2 mt-64 mx-auto p-5 rounded-lg`}
      onSubmit={handleSubmit}
    >
      <h3 className='text-xl font-semibold mt-3'>Just a few more details!</h3>

      <div className='w-5/6 h-12 mt-3 px-3 flex flex-row justify-start items-center text-stone-400 rounded-lg bg-stone-100'>
        {data?.name}
      </div>
      <div className='w-5/6 h-12 mt-3 px-3 flex flex-row justify-start items-center text-stone-400 rounded-lg bg-stone-100'>
        {data?.email}
      </div>
      <input
        type='text'
        value={phone}
        placeholder='Phone'
        onChange={handlePhoneChange}
        className={`w-5/6 h-12 mt-3 px-3 rounded-lg shadow-md bg-white placeholder:${formPlaceholderColor} ${textColor}`}
      />
      <input
        type='text'
        value={institute}
        placeholder='Where did you do your MBA?'
        onChange={handleInstituteChange}
        className={`w-5/6 h-12 mt-3 px-3 rounded-lg shadow-md bg-white placeholder:${formPlaceholderColor} ${textColor}`}
      />
      <input
        type='text'
        value={company}
        placeholder='Which company did/do you work in?'
        onChange={handleCompanyChange}
        className={`w-5/6 h-12 mt-3 px-3 rounded-lg shadow-md bg-white placeholder:${formPlaceholderColor} ${textColor}`}
      />
      {error && !phone.match(regExpPhone) && (
        <p className='text-md md:text-lg text-red-600'>
          Valid Phone Number Formats:
          <br />
          XXXXXXXXXX
          <br />
          [+Country Code]-XXXXXXXXXX
          <br />
          [+Country Code]-XXX-XXX-XXXX
          <br />
          [+Country Code]-(XXX)-XXX-XXXX
        </p>
      )}
      <CheckboxInput
        question={selectedCourses}
        onInputChange={handleSelectedCourseChange}
        className='w-5/6 mt-3 px-3'
      />
      <Button primary className='mt-5'>
        Create Profile
      </Button>
    </form>
  );
}
export default MentorRegistrationForm;
