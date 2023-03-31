import { useSelector } from "react-redux";

import CourseCard from "../components/CourseCard";

function CourseCatalogPage() {
  const courses = useSelector((state) => state.courses.data);
  return (
    <div className='min-h-screen flex flex-row justify-start items-start flex-wrap'>
      {courses ? (
        courses.map((course) => <CourseCard course={course} key={course._id} />)
      ) : (
        <p className='m-auto text-2xl text-stone-400'>Loading</p>
      )}
    </div>
  );
}
export default CourseCatalogPage;
