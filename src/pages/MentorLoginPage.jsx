import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function MentorLoginPage() {
  const navigate = useNavigate();
  const handleGoogleLoginMentor = () => {
    try {
      window.location.href = "http://localhost:8000/api/login/google/mentor";
    } catch (error) {
      console.log(error);
    }
  };

  const mentorLoginForm = (
    <div className='flex flex-col justify-around items-center h-screen'>
      <div className='p-10 flex flex-col justify-center w-5/6 md:w-1/2 2xl:w-1/3 items-center bg-stone-200 shadow-xl rounded-xl'>
        <h4 className='text-2xl font-semibold mb-5'>
          To be a mentor, you must have a google account
        </h4>
        <Button className='my-5' primary onClick={handleGoogleLoginMentor}>
          Sign In with Google
        </Button>
        <p className='mt-5'>
          Are you a student?{" "}
          <span
            className='underline text-blue-600 cursor-pointer'
            onClick={() => {
              navigate("/student/login");
            }}
          >
            Click here
          </span>
        </p>
      </div>
    </div>
  );

  return mentorLoginForm;
}

export default MentorLoginPage;
