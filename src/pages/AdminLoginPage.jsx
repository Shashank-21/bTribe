import Button from "../components/Button";

function AdminLoginPage() {
  const handleGoogleLoginMentor = () => {
    try {
      window.location.href = `${
        import.meta.env.VITE_AXIOS_BASE_URL
      }/login/google/admin`;
    } catch (error) {
      console.log(error);
    }
  };

  const adminLoginForm = (
    <div className='flex flex-col justify-around items-center h-screen'>
      <div className='p-10 flex flex-col justify-center w-5/6 md:w-1/2 2xl:w-1/3 items-center bg-stone-200 shadow-xl rounded-xl'>
        <h4 className='text-2xl font-semibold mb-5'>Welcome, admin!</h4>
        <Button className='my-5' primary onClick={handleGoogleLoginMentor}>
          Sign In with Google
        </Button>
      </div>
    </div>
  );

  return adminLoginForm;
}

export default AdminLoginPage;
