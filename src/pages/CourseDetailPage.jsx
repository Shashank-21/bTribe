import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CourseDisplaySection from "../components/CourseDisplaySection";
import { useThunk } from "../hooks/use-thunk";
import { fetchOneCourse } from "../store";

function CourseDetailPage() {
  const { slug } = useParams();
  const [doFetchOneCourse, fetchOneCourseLoading, fetchOneCourseError] =
    useThunk(fetchOneCourse);
  //console.log(fetchOneCourseLoading, fetchOneCourseError);
  useEffect(() => {
    doFetchOneCourse(slug);
  }, [doFetchOneCourse, slug]);

  const course = useSelector((state) => state.courses.selectedCourse);
  let content;

  if (fetchOneCourseLoading) {
    content = (
      <div className='h-screen grid place-items-center text-3xl font-semibld text-stone-400'>
        Loading...
      </div>
    );
  } else if (fetchOneCourseError) {
    content = (
      <div className='h-screen grid place-items-center text-3xl font-semibld text-stone-400'>
        Error loading course.
      </div>
    );
  } else if (course) {
    content = <CourseDisplaySection course={course} />;
  }

  return content;
}
export default CourseDetailPage;
