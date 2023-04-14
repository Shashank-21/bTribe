//logic for authentication.
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useThunk } from "../hooks/use-thunk";
import { authCheck } from "../store";

function DashboardPage() {
  const navigate = useNavigate();

  const userData = useSelector((state) => state.user.data);
  console.log(userData);

  const [doAuthenticateUser, authenticateUserLoading, authenticateUserError] =
    useThunk(authCheck);

  useEffect(() => {
    const interval = setTimeout(() => {
      doAuthenticateUser({
        userId: userData?.user._id,
        token: userData?.token,
      });
      localStorage.setItem("user", JSON.stringify(userData));
      navigate(`/dashboard/${userData?.user._id}`);
    }, 1500);

    return () => {
      clearTimeout(interval);
    };
  }, [navigate, doAuthenticateUser, userData]);

  if (authenticateUserLoading) {
    return (
      <div className='h-screen flex flex-col items-center justify-center'>
        <p className='shadow-xl w-fit p-10 text-4xl font-semibold text-stone-700 bg-stone-300 rounded-xl'>
          Authenticating
        </p>
      </div>
    );
  } else if (authenticateUserError) {
    return (
      <div className='h-screen flex flex-col items-center justify-center'>
        <div className='shadow-xl w-fit p-10  bg-stone-300 rounded-xl'>
          <p className='text-4xl font-semibold text-stone-700'>
            Error Authenticating User
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

export default DashboardPage;
