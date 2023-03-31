import { useEffect } from "react";
import { useSelector } from "react-redux";

import MentorRegistrationForm from "../components/MentorRegistrationForm";
import StudentRegistrationForm from "../components/StudentRegistrationForm";
import { useThunk } from "../hooks/use-thunk";
import { fetchGoogleUser } from "../store";

function UserDetailsPage() {
  const [doFetchGoogleUser, fetchGoogleUserLoading, fetchGoogleUserError] =
    useThunk(fetchGoogleUser);

  const { data: courses } = useSelector((state) => state.courses);

  const variants = courses
    .map((course) => {
      return course.variants.map((variant) => {
        return { ...variant, courseName: course.name };
      });
    })
    .reduce((variants, variant) => {
      return [...variants, ...variant];
    }, [])
    .map((variant) => {
      return {
        ...variant,
        label: `${variant.courseName}-${variant.name} course`,
      };
    });
  console.log(variants);

  const { data } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const interval = setTimeout(() => {
      doFetchGoogleUser({
        role: window.location.host.split(".")[0],
        access_token: urlParams.get("access_token"),
      });
    }, 1000);
    return () => {
      clearTimeout(interval);
    };
  }, [doFetchGoogleUser]);

  console.log(data);

  const roles = ["student", "mentor", "admin"];
  const role = roles.indexOf(window.location.host.split(".")[0]);

  let formToRender;
  if (!role) {
    formToRender = (
      <StudentRegistrationForm user={data} role={role} courses={variants} />
    );
  } else {
    formToRender = (
      <MentorRegistrationForm user={data} role={role} courses={courses} />
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
  } else if (data) {
    return <div className='h-screen'>{formToRender}</div>;
  }
}

export default UserDetailsPage;
