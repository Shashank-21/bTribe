import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useThunk } from "../hooks/use-thunk";
import { updateUser } from "../store";

function StudentRegisterPage() {
  const { formBgColor, formPlaceholderColor, textColor, headingColor } =
    useSelector((state) => state.color);

  const userData = useSelector((state) => state.user.data);
  const { selectedVariant } = useSelector((state) => state.courses);
  const [doUpdateUser, updateUserLoading, updateUserError] =
    useThunk(updateUser);

  console.log(userData);
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const handleGoogleLoginStudent = async () => {
    try {
      window.location.href = "http://localhost:8000/api/login/google/student";
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (event.target.value.length > 6 && event.target.value.length < 64) {
      setIsError(false);
    }
  };
  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);
    if (event.target.value === password) {
      setIsError(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password.length < 6 || password.length > 64) {
      setIsError(true);
      setMessage(
        "Password can't be less than 6 characters, or greater than 64 characters long"
      );
      return;
    }
    doUpdateUser({
      //get name from,
      _id: userData.user._id,
      name: userData.user.name,
      email: userData.user.email,
      phone: userData.user.phone,
      password,
      role: 0,
      paymentStatus: "done",
      courses: [selectedVariant._id],
      maxCourseSlots: [selectedVariant.maxSlots],
      approvalStatus: "approved",
    });
    if (updateUserError) {
      setMessage(updateUserError);
    } else {
      console.log("registered");
      navigate("/dashboard/auth");
    }
  };

  const studentForm = (
    <>
      <form
        className={`p-5 flex flex-col items-center justify-around w-full`}
        onSubmit={handleSubmit}
      >
        <h4 className={`${headingColor} text-2xl font-semibold py-3`}>
          Welcome, {userData?.user.name}
        </h4>
        <p>Choose a password!</p>
        <input
          type='password'
          value={password}
          placeholder='Password'
          onChange={handlePasswordChange}
          className={`w-5/6 h-12 mt-3 px-3 rounded-lg shadow-md bg-white placeholder:${formPlaceholderColor} ${textColor}`}
        />
        <input
          type='password'
          value={passwordConfirm}
          placeholder='Confirm Password'
          onChange={handlePasswordConfirmChange}
          className={`w-5/6 h-12 mt-3 px-3 rounded-lg shadow-md bg-white placeholder:${formPlaceholderColor} ${textColor}`}
        />
        <Button tertiary className='my-5'>
          Register
        </Button>
        {updateUserLoading && (
          <p className='mt-3 text-green-600'>
            Payment done! Creating your profile
          </p>
        )}
        {updateUserError && (
          <p className='mt-3 text-green-600'>
            There was an error creating your profile
          </p>
        )}
        {isError && <p className='text-red-600'>{message}</p>}
      </form>
      <h4 className='text-xl font-semibold'>OR</h4>
      <Button primary className='my-5' onClick={handleGoogleLoginStudent}>
        Sign In with Google
      </Button>
    </>
  );

  return (
    <div
      className={`flex flex-col items-center justify-around md:w-1/2 2xl:w-[30%] h-fit mx-auto my-64 p-5  rounded-lg shadow-md ${formBgColor}`}
    >
      {studentForm}
    </div>
  );
}

export default StudentRegisterPage;
