import { useSelector } from "react-redux";
import CourseCard from "../components/CourseCard";

function CourseCatalogPage() {
  const courses = useSelector((state) => state.courses);
  console.log(courses);
  return <div className="min-h-screen">
    {courses.map((course) => <CourseCard course={course} key={course.courseId} />)}
  </div>
}
export default CourseCatalogPage;