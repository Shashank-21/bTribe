import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../components/AdminDashboard";
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
    }, 1000);
    return () => {
      clearTimeout(interval);
    };
  }, [doListAllSlots, userData, navigate]);

  const allSlots = useSelector((state) => state.slots.allSlots);

  const mentorSlots =
    userData?.user.role === 1
      ? allSlots?.filter(
          (slot) =>
            slot.mentor._id === userData?.user._id &&
            slot.status !== "cancelled by mentor"
        )
      : [];

  const studentSlots =
    userData?.user.role === 0
      ? allSlots?.filter((slot) => {
          return (
            slot.student &&
            slot.student._id === userData?.user._id &&
            slot.status !== "refund request approved"
          );
        })
      : [];

  console.log(studentSlots);
  console.log(mentorSlots);

  let dashboardToDisplay;

  if (userData && userData.user.role === 1) {
    dashboardToDisplay = (
      <MentorDashboard
        mentor={userData}
        mentorSlots={mentorSlots}
        doListAllSlots={doListAllSlots}
      />
    );
  } else if (userData && userData.user.role === 0) {
    dashboardToDisplay = (
      <StudentDashboard
        student={userData}
        studentSlots={studentSlots}
        doListAllSlots={doListAllSlots}
      />
    );
  } else if (userData && userData.user.role === 2) {
    dashboardToDisplay = (
      <AdminDashboard
        admin={userData}
        allSlots={allSlots}
        doListAllSlots={doListAllSlots}
      />
    );
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
        <div className='shadow-xl w-fit p-10 bg-stone-300 rounded-xl'>
          <p className=' text-4xl font-semibold text-stone-700 '>
            Error retreiving data. Try again
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
  } else {
    return dashboardToDisplay;
  }
}

export default DashboardPage;
