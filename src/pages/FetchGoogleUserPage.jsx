//logic for only fetching google user
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useThunk } from "../hooks/use-thunk";
import { fetchGoogleUser } from "../store";

function FetchGoogleUserPage() {
  const navigate = useNavigate();

  const [doFetchGoogleUser, fetchGoogleUserLoading, fetchGoogleUserError] =
    useThunk(fetchGoogleUser);

  const loginRole = useSelector((state) => state.user.loginRole);
  //console.log(userData);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const interval = setTimeout(() => {
      doFetchGoogleUser({
        role: urlParams.get("role"),
        access_token: urlParams.get("access_token"),
      });

      navigate("/dashboard/auth");
    }, 1500);
    return () => {
      clearTimeout(interval);
    };
  }, [doFetchGoogleUser, loginRole, navigate]);

  if (fetchGoogleUserLoading) {
    return (
      <div className='h-screen flex flex-col items-center justify-center'>
        <p className='shadow-xl w-fit p-10 text-4xl font-semibold text-stone-700 bg-stone-300 rounded-xl'>
          Loading data
        </p>
      </div>
    );
  } else if (fetchGoogleUserError) {
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

export default FetchGoogleUserPage;
