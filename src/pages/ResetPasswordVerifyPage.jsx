//logic for authentication.
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useThunk } from "../hooks/use-thunk";
import { resetPasswordVerify } from "../store";

function ResetPasswordVerifyPage() {
  const navigate = useNavigate();

  const [doAuthenticateUser, authenticateUserLoading, authenticateUserError] =
    useThunk(resetPasswordVerify);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (!token) {
      navigate("/");
    }
    const interval = setTimeout(() => {
      doAuthenticateUser(token);
      navigate("verified");
    }, 1500);

    return () => {
      clearTimeout(interval);
    };
  }, [navigate, doAuthenticateUser]);

  if (authenticateUserLoading) {
    return (
      <div className='h-screen flex flex-col items-center justify-center'>
        <p className='shadow-xl w-fit p-10 text-4xl font-semibold text-stone-700 bg-stone-300 rounded-xl'>
          Verifying Request
        </p>
      </div>
    );
  } else if (authenticateUserError) {
    return (
      <div className='h-screen flex flex-col items-center justify-center'>
        <div className='shadow-xl w-fit p-10  bg-stone-300 rounded-xl'>
          <p className='text-4xl font-semibold text-stone-700'>
            Error Verifying Request
          </p>
          <div className='flex flex-row items-center justify-center my-5'>
            <Button
              secondary
              className='mr-5'
              onClick={() => navigate("/mentor/login")}
            >
              Are you a mentor?
            </Button>
            <Button secondary onClick={() => navigate("/student/login")}>
              Are you a student?
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPasswordVerifyPage;
