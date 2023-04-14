// import { useSelector } from "react-redux";
import ReactRotatingText from "react-rotating-text";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
// import CourseCard from "../components/CourseCard";

function HomePage() {
  const navigate = useNavigate();
  const reactRotatingText = (
    <ReactRotatingText
      items={["job", "MBA admit", "internship"]}
      className='font-bold text-7xl my-10'
      pause={2500}
    />
  );

  // const courses = useSelector((state) => state.courses.data);

  return (
    <>
      <section className='flex flex-col justify-center items-center h-screen'>
        <p className='text-5xl'>Grab that dream</p>
        {reactRotatingText}
        <p className='text-5xl'>that you've always wanted</p>
        <p className='text-xl mt-20 font-light'>
          Ace your MBA goals through quality mentorship and up-skilling courses!
        </p>

        <Button
          primary
          className='text-xl mt-10'
          onClick={() => {
            navigate("/courses");
          }}
        >
          Start Learning
        </Button>
      </section>
      {/* <section className='flex flex-col justify-center items-center'>
        <h3 className='font-semibold text-4xl mx-auto mt-10'>Our Bestseller</h3>
        <CourseCard course={courses[0]} />
      </section> */}
    </>
  );
}

export default HomePage;
