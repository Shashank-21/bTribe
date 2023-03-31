import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import MentorDashboard from "../components/MentorDashboard";
import StudentDashboard from "../components/StudentDashboard";
import { useThunk } from "../hooks/use-thunk";
import { listAllSlots } from "../store";

function DashboardPage() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.data);

  const [doListAllSlots, listAllSlotsLoading, listAllSlotsError] =
    useThunk(listAllSlots);

  useEffect(() => {
    const interval = setTimeout(() => {
      doListAllSlots(userData?.token);
    }, 500);
    return () => {
      clearTimeout(interval);
    };
  }, [doListAllSlots, userData, navigate]);

  const allSlots = useSelector((state) => state.slots.allSlots);
  console.log(allSlots);

  const mentorSlots =
    userData?.user.role === 1
      ? allSlots?.filter((slot) => slot.mentor === userData?.user._id)
      : [];

  const studentSlots =
    userData?.user.role === 0
      ? allSlots?.filter((slot) => slot.student === userData?.user._id)
      : [];

  let dashboardToDisplay;
  if (userData) {
    if (userData.user.role === 1) {
      dashboardToDisplay = (
        <MentorDashboard
          mentor={userData}
          mentorSlots={mentorSlots}
          doListAllSlots={doListAllSlots}
        />
      );
    } else if (userData.user.role === 0) {
      dashboardToDisplay = (
        <StudentDashboard
          student={userData}
          studentSlots={studentSlots}
          doListAllSlots={doListAllSlots}
        />
      );
    }
  }

  if (listAllSlotsLoading) {
    return (
      <div className='h-screen flex flex-col items-center justify-center'>
        <p className='shadow-xl w-fit p-10 text-4xl font-semibold text-stone-700 bg-stone-300 rounded-xl'>
          Loading data
        </p>
      </div>
    );
  } else if (listAllSlotsError) {
    return (
      <div className='h-screen flex flex-col items-center justify-center'>
        <p className='shadow-xl w-fit p-10 text-4xl font-semibold text-stone-700 bg-stone-300 rounded-xl'>
          Error retreiving data. Try again
        </p>
        <Button
          secondary
          className='my-5 mx-auto'
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </div>
    );
  } else {
    return dashboardToDisplay;
  }
}

export default DashboardPage;
