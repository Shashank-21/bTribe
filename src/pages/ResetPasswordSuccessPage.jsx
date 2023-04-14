import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function ResetPasswordSuccessPage() {
  const { formBgColor, headingColor } = useSelector((state) => state.color);
  const navigate = useNavigate();

  return (
    <div className='h-screen'>
      <div
        className={`${formBgColor} p-5 flex flex-col items-center justify-around w-full`}
      >
        <h4 className={`${headingColor} text-2xl font-semibold py-3`}>
          Reset Password Successful
        </h4>
        <Button
          primary
          className='my-5'
          onClick={() => {
            navigate("/student/login");
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default ResetPasswordSuccessPage;
