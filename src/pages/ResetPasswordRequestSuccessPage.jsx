import { useSelector } from "react-redux";

function ResetPasswordRequestSuccessPage() {
  const { formBgColor, headingColor } = useSelector((state) => state.color);

  return (
    <div className='h-screen'>
      <div
        className={`${formBgColor} p-5 flex flex-col items-center justify-around w-full`}
      >
        <h4 className={`${headingColor} text-2xl font-semibold py-3`}>
          We've sent a reset link to your email
        </h4>
      </div>
    </div>
  );
}

export default ResetPasswordRequestSuccessPage;
