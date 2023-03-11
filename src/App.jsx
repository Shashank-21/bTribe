
import { useEffect } from "react";
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
import HomePage from "./pages/HomePage";
import NavigationPage from "./pages/NavigationPage";


function App() {
  useEffect(() => {
    //Show landing page.
    //If user has logged in, send them to dashboard.
  }, [])
  const courses = useSelector((state) => state.courses);
  const routeFromElements = createRoutesFromElements(
    <Route path='/' element={<NavigationPage />}>
      <Route index element={<HomePage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/courses'>
        <Route index element={<CourseCatalogPage />} />
        {courses.map((course) => {
          return (
            <Route
              key={course.courseId}
              path=':courseId'
              element={<CourseDetailPage />}
            />
          );
        })}
      </Route>
      <Route path='/dashboard/:id' element={<DashboardPage />} />
    </Route>
  );
  const router = createBrowserRouter(routeFromElements);

  return <RouterProvider router={router} />;
}

export default App;
