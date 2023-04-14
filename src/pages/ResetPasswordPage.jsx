import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useThunk } from "../hooks/use-thunk";
import { resetPassword } from "../store";

function ResetPasswordPage() {
  const navigate = useNavigate();
  const { formBgColor, formPlaceholderColor, textColor, headingColor } =
    useSelector((state) => state.color);

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const email = useSelector((state) => state.user.resetPasswordEmail);
  console.log(email);

  const [doResetPassword, resetPasswordLoading, resetPasswordError] =
    useThunk(resetPassword);

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

  const handlePasswordResetSubmit = (event) => {
    event.preventDefault();
    if (password.length < 6 || password.length > 64) {
      setIsError(true);
      setMessage(
        "Password can't be less than 6 characters, or greater than 64 characters long"
      );
      return;
    }
    doResetPassword({ email, password });
    navigate("/reset-password/success");
  };

  return (
    <div className='h-screen'>
      <form
        className={`${formBgColor} p-5 flex flex-col items-center justify-around w-full`}
        onSubmit={handlePasswordResetSubmit}
      >
        <h4 className={`${headingColor} text-2xl font-semibold py-3`}>
          Choose a new Password
        </h4>

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
        <Button primary className='my-5'>
          Change Password
        </Button>
        {resetPasswordLoading && (
          <p className='mt-3 text-green-600'>Changing your password</p>
        )}
        {resetPasswordError && (
          <p className='mt-3 text-green-600'>Error changing your password</p>
        )}
        {isError && <p className='text-red-600'>{message}</p>}
      </form>
    </div>
  );
}

export default ResetPasswordPage;
