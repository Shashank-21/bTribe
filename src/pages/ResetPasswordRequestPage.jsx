import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useThunk } from "../hooks/use-thunk";
import { resetPasswordRequest } from "../store";

function ResetPasswordRequestPage() {
  const navigate = useNavigate();
  const { formBgColor, formPlaceholderColor, textColor, headingColor } =
    useSelector((state) => state.color);

  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const [
    doResetPasswordRequest,
    resetPasswordRequestLoading,
    resetPasswordRequestError,
  ] = useThunk(resetPasswordRequest);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (event.target.value.length > 6 && event.target.value.length < 64) {
      setIsError(false);
    }
  };

  const handlePasswordResetRequestSubmit = (event) => {
    event.preventDefault();
    if (!email) {
      setIsError(true);
      setMessage("Please enter a valid email.");
      return;
    }
    doResetPasswordRequest(email);
    navigate("success");
  };

  return (
    <div className='h-screen flex flex-col items-center'>
      <form
        className={`${formBgColor} p-5 flex flex-col items-center justify-around w-1/3 mt-80 shaodow-xl rounded-lg`}
        onSubmit={handlePasswordResetRequestSubmit}
      >
        <h4 className={`${headingColor} text-2xl font-semibold py-3`}>
          Enter Your Email
        </h4>

        <input
          type='email'
          value={email}
          placeholder='Email'
          onChange={handleEmailChange}
          className={`w-5/6 h-12 mt-3 px-3 rounded-lg shadow-md bg-white placeholder:${formPlaceholderColor} ${textColor}`}
        />

        <Button primary className='my-5'>
          Reset Password
        </Button>
        {resetPasswordRequestLoading && (
          <p className='mt-3 text-green-600'>
            Requesting the server for password reset
          </p>
        )}
        {resetPasswordRequestError && (
          <p className='mt-3 text-red-600'>
            Error Requesting the server for password reset
          </p>
        )}
        {isError && <p className='text-red-600'>{message}</p>}
      </form>
    </div>
  );
}

export default ResetPasswordRequestPage;
