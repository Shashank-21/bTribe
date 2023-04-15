import { useEffect } from "react";
import { useThunk } from "./hooks/use-thunk";
import { useDispatch, useSelector } from "react-redux";
import {
  createRoutesFromElements,
  RouterProvider,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import CourseCatalogPage from "./pages/CourseCatalogPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import DashboardPage from "./pages/DashboardPage";
import PaymentPage from "./pages/PaymentPage";
import HomePage from "./pages/HomePage";
import StudentLoginPage from "./pages/StudentLoginPage";
import NavigationPage from "./pages/NavigationPage";
import StudentRegisterPage from "./pages/StudentRegisterPage";
import SlotBookingPage from "./pages/SlotBookingPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import { changeSelectedVariant, fetchCourses, storeUser } from "./store";
import FetchGoogleUserPage from "./pages/FetchGoogleUserPage";
import AuthenticationPage from "./pages/AuthenticationPage";
import MentorLoginPage from "./pages/MentorLoginPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ResetPasswordRequestPage from "./pages/ResetPasswordRequestPage";
import ResetPasswordRequestSuccessPage from "./pages/ResetPasswordRequestSuccessPage";
import ResetPasswordVerifyPage from "./pages/ResetPasswordVerifyPage";
import ResetPasswordSuccessPage from "./pages/ResetPasswordSuccessPage";

function App() {
  const courses = useSelector((state) => state.courses);
  //console.log(window);
  const [doFetchCourses] = useThunk(fetchCourses);
  const dispatch = useDispatch();
  useEffect(() => {
    doFetchCourses();
    // Load selected course from local storage
    const selectedVariant = localStorage.getItem("selectedCourse");
    dispatch(changeSelectedVariant(JSON.parse(selectedVariant)));
    const currentUser = localStorage.getItem("user");
    dispatch(storeUser(JSON.parse(currentUser)));
    // Load user from local storage
  }, [doFetchCourses, dispatch]);

  const routeFromElements = createRoutesFromElements(
    <Route path='/' element={<NavigationPage />}>
      <Route index element={<HomePage />} />
      <Route path='student'>
        <Route path='login' element={<StudentLoginPage />} />
        <Route path='register' element={<StudentRegisterPage />} />
      </Route>
      <Route path='mentor'>
        <Route path='login' element={<MentorLoginPage />} />
        <Route path='register'>
          <Route index element={<MentorLoginPage />} />
          <Route path='details' element={<UserDetailsPage />} />
        </Route>
      </Route>
      <Route path='admin'>
        <Route path='login' element={<AdminLoginPage />} />
        <Route path='register'>
          <Route index element={<AdminLoginPage />} />
          <Route path='details' element={<UserDetailsPage />} />
        </Route>
      </Route>
      <Route path='about' element={<AboutPage />} />
      <Route path='courses'>
        <Route index element={<CourseCatalogPage />} />
        {courses &&
          courses.data.map((course) => {
            return (
              <Route
                key={course._id}
                path=':slug'
                element={<CourseDetailPage />}
              />
            );
          })}
      </Route>
      <Route path='dashboard'>
        <Route index element={<FetchGoogleUserPage />} />
        <Route path='auth' element={<AuthenticationPage />} />
        <Route path=':id' element={<DashboardPage />} />
        <Route path='book-slot' element={<SlotBookingPage />} />
      </Route>
      <Route path='payments' element={<PaymentPage />} />
      <Route path='/reset-password-request'>
        <Route index element={<ResetPasswordRequestPage />} />
        <Route path='success' element={<ResetPasswordRequestSuccessPage />} />
      </Route>
      <Route path='/reset-password'>
        <Route index element={<ResetPasswordVerifyPage />} />
        <Route path='verified' element={<ResetPasswordPage />} />
        <Route path='success' element={<ResetPasswordSuccessPage />} />
      </Route>
    </Route>
  );
  const router = createBrowserRouter(routeFromElements);

  return <RouterProvider router={router} />;
}

export default App;
