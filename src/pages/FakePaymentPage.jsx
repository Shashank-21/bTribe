import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useThunk } from "../hooks/use-thunk";
import { updateUser } from "../store";

export default function FakePaymentPage() {
  const { data } = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log(data);

  const [doUpdateUser, updateUserLoading, updateUserError] =
    useThunk(updateUser);
  const paymentSuccessHandler = async () => {
    if (data) {
      doUpdateUser({
        _id: data.user._id,
        name: data.user.name,
        role: data.user.role,
        phone: data.user.phone,
        courses: data.user.courses.map((course) => course._id),
        maxCourseSlots: data.user.maxCourseSlots,
        paymentStatus: "done",
      });
      if (updateUserLoading) {
        console.log("Updating user");
      } else if (updateUserError) {
        console.log("Error updating user");
      } else {
        console.log("Updated! You should see the new payment status now");
        navigate("/dashboard");
      }
    }
  };
  const paymentFailureHandler = () => {
    const regExpRole = /(student|mentor|admin)/;
    if (data) {
      doUpdateUser({
        _id: data.user._id,
        name: data.user.name,
        role: data.user.role,
        phone: data.user.phone,
        courses: data.user.courses.map((course) => course._id),
        maxCourseSlots: data.user.maxCourseSlots,
        paymentStatus: "pending",
      });
    }
    if (window.location.host.split(".")[0].match(regExpRole)) {
      const tempArray = window.location.host.split(".");
      tempArray.shift();
      const middlePart = `${tempArray.join(".")}`;
      window.location.href = `${window.location.protocol}//${middlePart}/`;
    } else {
      navigate("/");
    }
  };
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <p className='mb-5 text-5xl font-semibold'>Fake Payment Alert!</p>
      <Button primary onClick={paymentSuccessHandler} className='mb-5'>
        Make fake payment
      </Button>
      <Button tertiary onClick={paymentFailureHandler}>
        Fake payment failed
      </Button>
    </div>
  );
}
