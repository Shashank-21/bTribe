import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useThunk } from "../hooks/use-thunk";
import { loginUser } from "../store";

function StudentLoginPage() {
  const { formBgColor, formPlaceholderColor, textColor, headingColor } =
    useSelector((state) => state.color);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [doLoginUser, loginUserLoading, loginUserError] = useThunk(loginUser);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    doLoginUser({ email, password });
    if (loginUserLoading) {
      //console.log("Logging in");
    } else if (loginUserError) {
      //console.log("Error Logging user in");
    }
    navigate("/dashboard/auth");
  };

  const handleGoogleLoginStudent = () => {
    try {
      window.location.href = `${
        import.meta.env.VITE_AXIOS_BASE_URL
      }/login/google/student`;
    } catch (error) {
      //console.log(error);
    }
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const studentLoginForm = (
    <div
      className={`flex flex-col justify-center items-center w-5/6 md:w-2/5 2xl:w-1/3 my-64 h-fit mx-auto ${formBgColor} rounded-lg shadow-md`}
    >
      <form
        onSubmit={handleFormSubmit}
        className={`p-5 flex flex-col items-center justify-around w-full`}
      >
        <h4 className={`${headingColor} text-2xl font-semibold`}>Sign in</h4>
        <input
          type='email'
          value={email}
          placeholder='Email'
          onChange={handleEmailChange}
          className={`w-5/6 h-12 mt-3 px-3 rounded-lg shadow-md bg-white placeholder:${formPlaceholderColor} ${textColor}`}
        />
        <input
          type='password'
          value={password}
          placeholder='Password'
          onChange={handlePasswordChange}
          className={`w-5/6 h-12 my-3 px-3 rounded-lg shadow-md bg-white placeholder:${formPlaceholderColor} ${textColor}`}
        />

        <Button tertiary className='my-5'>
          Sign In
        </Button>
      </form>
      <h4 className='text-xl font-semibold'>OR</h4>
      <Button primary className='my-5' onClick={handleGoogleLoginStudent}>
        Sign In with Google
      </Button>
      <p
        className='my-5 underline text-blue-600 cursor-pointer'
        onClick={() => {
          navigate("/reset-password-request");
        }}
      >
        Forgot Password
      </p>
      <p className='my-5'>
        Are you a mentor?{" "}
        <span
          className='underline text-blue-600 cursor-pointer'
          onClick={() => {
            navigate("/mentor/login");
          }}
        >
          Click here
        </span>
      </p>
    </div>
  );

  return studentLoginForm;
}

export default StudentLoginPage;
