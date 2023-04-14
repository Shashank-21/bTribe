import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminRegistrationForm from "../components/AdminRegistrationForm";
import MentorRegistrationForm from "../components/MentorRegistrationForm";
import { useThunk } from "../hooks/use-thunk";
import { fetchGoogleUser } from "../store";

function UserDetailsPage() {
  const [doFetchGoogleUser, fetchGoogleUserLoading, fetchGoogleUserError] =
    useThunk(fetchGoogleUser);

  const { data: courses } = useSelector((state) => state.courses);

  const userData = useSelector((state) => state.user.data);

  const roles = ["student", "mentor", "admin"];
  const [role, setRole] = useState(roles[0]);
  console.log(role);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setRole(urlParams.get("role"));
    const interval = setTimeout(() => {
      doFetchGoogleUser({
        role: urlParams.get("role"),
        access_token: urlParams.get("access_token"),
      });
    }, 1000);
    return () => {
      clearTimeout(interval);
    };
  }, [doFetchGoogleUser]);

  console.log(userData);

  let formToRender;
  if (role === "mentor") {
    formToRender = (
      <MentorRegistrationForm
        user={userData}
        role={roles.indexOf(role)}
        courses={courses}
      />
    );
  } else if (role === "admin") {
    formToRender = (
      <AdminRegistrationForm user={userData} role={roles.indexOf(role)} />
    );
  }

  if (fetchGoogleUserLoading) {
    return (
      <div className='h-screen flex flex-row items-center justify-center text-3xl text-stone-400 font-semibold'>
        Loading
      </div>
    );
  } else if (fetchGoogleUserError) {
    return (
      <div className='h-screen flex flex-row items-center justify-center text-3xl text-stone-400 font-semibold'>
        Error Loading user
      </div>
    );
  } else {
    return <div className='h-screen'>{formToRender}</div>;
  }
}

export default UserDetailsPage;
