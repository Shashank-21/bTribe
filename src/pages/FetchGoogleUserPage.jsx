//logic for only fetching google user
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useThunk } from "../hooks/use-thunk";
import { fetchGoogleUser } from "../store";

function FetchGoogleUserPage() {
  const navigate = useNavigate();

  const [doFetchGoogleUser, fetchGoogleUserLoading, fetchGoogleUserError] =
    useThunk(fetchGoogleUser);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const interval = setTimeout(() => {
      doFetchGoogleUser({
        role: window.location.host.split(".")[0],
        access_token: urlParams.get("access_token"),
      });

      navigate("/dashboard/auth");
    }, 1500);
    return () => {
      clearTimeout(interval);
    };
  }, [doFetchGoogleUser, navigate]);

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
          <Button secondary className='my-5' onClick={() => navigate("/login")}>
            Login
          </Button>
        </div>
      </div>
    );
  }
}

export default FetchGoogleUserPage;
