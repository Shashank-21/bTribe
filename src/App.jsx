import { useEffect } from "react";
import { useThunk } from "./hooks/use-thunk";
import { useSelector } from "react-redux";
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
import FakePaymentPage from "./pages/FakePaymentPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NavigationPage from "./pages/NavigationPage";
import RegisterPage from "./pages/RegisterPage";
import SlotBookingPage from "./pages/SlotBookingPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import { fetchCourses } from "./store";
import FetchGoogleUserPage from "./pages/FetchGoogleUserPage";
import AuthenticationPage from "./pages/AuthenticationPage";

function App() {
  const courses = useSelector((state) => state.courses);
  const [doFetchCourses] = useThunk(fetchCourses);
  useEffect(() => {
    doFetchCourses();
  }, [doFetchCourses]);
  const routeFromElements = createRoutesFromElements(
    <Route path='/' element={<NavigationPage />}>
      <Route index element={<HomePage />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='register'>
        <Route index element={<RegisterPage />} />
        <Route path='details' element={<UserDetailsPage />} />
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
      <Route path='payments' element={<FakePaymentPage />} />
    </Route>
  );
  const router = createBrowserRouter(routeFromElements);

  return <RouterProvider router={router} />;
}

export default App;
