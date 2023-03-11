import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MentorDashboard from "../components/MentorDashboard";
import StudentDashboard from "../components/StudentDashboard";

function DashboardPage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!(window.location.host.includes('mentor') || window.location.host.includes('student'))) {
      navigate('/');
    }
  }, [])
  let dashboardToDisplay;
  if (window.location.host.includes('mentor')) {
    dashboardToDisplay = <MentorDashboard />;
  } else if (window.location.host.includes('student')) {
    dashboardToDisplay = <StudentDashboard />;
  }
  return dashboardToDisplay;
}

export default DashboardPage;