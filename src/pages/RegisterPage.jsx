import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import { useThunk } from "../hooks/use-thunk";
import { registerUser } from "../store";

function RegisterPage() {
  const { formBgColor, formPlaceholderColor, textColor, headingColor } =
    useSelector((state) => state.color);
  const { data: courses } = useSelector((state) => state.courses);
  const [doRegisterUser, registerUserLoading, registerUserError] =
    useThunk(registerUser);

  const variants = courses
    .map((course) => {
      return course.variants.map((variant) => {
        return { ...variant, courseName: course.name };
      });
    })
    .reduce((variants, variant) => {
      return [...variants, ...variant];
    }, [])
    .map((variant) => {
      return {
        ...variant,
        label: `${variant.courseName}-${variant.name} course`,
      };
    });

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const [selectedVariant, setSelectedVariant] = useState(
    variants[0] || { label: "", data: "Something" }
  );

  useEffect(() => {
    if (selectedVariant._id && isError) {
      setIsError(false);
    }
  }, [selectedVariant, isError]);

  const regExpPhone = /(\+[0-9]{1,3}-)?\(?[0-9]{3}\)?-?[0-9]{3}-?[0-9]{4}/;

  const handleGoogleLoginMentor = async () => {
    try {
      window.location.href = "http://localhost:8000/api/login/google/mentor";
    } catch (error) {
      console.log(error);
    }
  };
  const handleGoogleLoginStudent = async () => {
    try {
      window.location.href = "http://localhost:8000/api/login/google/student";
    } catch (error) {
      console.log(error);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    if (name) {
      setIsError(false);
    }
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    if (phone.match(regExpPhone)) {
      setIsError(false);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (email) {
      setIsError(false);
    }
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (password) {
      setIsError(false);
    }
  };
  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);
    if (passwordConfirm) {
      setIsError(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !email || !password || !passwordConfirm || !phone) {
      setIsError(true);
      setMessage("The fields cannot be blank");
    } else if (password !== passwordConfirm) {
      setIsError(true);
      setMessage("Passwords don't match");
    } else if (password.length < 6 || password.length > 64) {
      setIsError(true);
      setMessage(
        "Password can't be less than 6 characters, or greater than 64 characters long"
      );
    } else if (!phone.match(regExpPhone)) {
      setIsError(true);
      setMessage(
        "Valid Phone Number Formats:\nXXXXXXXXXX \n[+Country Code]-XXXXXXXXXX\n[+Country Code]-XXX-XXX-XXXX\n[+Country Code]-(XXX)-XXX-XXXX"
      );
    } else if (!selectedVariant._id) {
      setIsError(true);
      setMessage("You must choose a course");
    } else {
      // const { name, email, phone, password, role } = request.body;
      doRegisterUser({
        name,
        email,
        phone,
        password,
        role: 0,
        courses: [selectedVariant._id],
        maxCourseSlots: [selectedVariant.maxSlots],
        paymentStatus: "pending",
      });
      if (registerUserError) {
        setMessage(registerUserError);
      } else {
        console.log("registered");
        navigate("/payments");
      }
    }
  };

  const studentForm = (
    <>
      <form
        className={`p-5 flex flex-col items-center justify-around w-full`}
        onSubmit={handleSubmit}
      >
        <h4 className={`${headingColor} text-2xl font-semibold py-3`}>
          Register
        </h4>
        <input
          type='text'
          value={name}
          placeholder='Name'
          onChange={handleNameChange}
          className={`w-5/6 h-12 mt-3 px-3 rounded-lg shadow-md bg-white placeholder:${formPlaceholderColor} ${textColor}`}
        />
        <input
          type='email'
          value={email}
          placeholder='Email'
          onChange={handleEmailChange}
          className={`w-5/6 h-12 mt-3 px-3 rounded-lg shadow-md bg-white placeholder:${formPlaceholderColor} ${textColor}`}
        />
        <input
          type='text'
          value={phone}
          placeholder='Phone'
          onChange={handlePhoneChange}
          className={`w-5/6 h-12 mt-3 px-3 rounded-lg shadow-md bg-white placeholder:${formPlaceholderColor} ${textColor}`}
        />
        <input
          type='password'
          value={password}
          placeholder='Password'
          onChange={handlePasswordChange}
          className={`w-5/6 h-12 mt-3 px-3 rounded-lg shadow-md bg-white placeholder:${formPlaceholderColor} ${textColor}`}
        />
        <input
          type='password'
          value={passwordConfirm}
          placeholder='Confirm Password'
          onChange={handlePasswordConfirmChange}
          className={`w-5/6 h-12 mt-3 px-3 rounded-lg shadow-md bg-white placeholder:${formPlaceholderColor} ${textColor}`}
        />
        <Dropdown
          prompt='Select a Course'
          options={variants}
          selectedOption={selectedVariant}
          setSelectedOption={setSelectedVariant}
        />
        <Button primary className='my-5'>
          Register
        </Button>
        {isError && <p className='text-red-600'>{message}</p>}
      </form>
      <h4 className='text-xl font-semibold'>OR</h4>
      <Button secondary className='my-5' onClick={handleGoogleLoginStudent}>
        Sign In with Google
      </Button>
      {registerUserLoading && <p className='text-green-600'>Registering</p>}
    </>
  );

  const mentorForm = (
    <>
      <h4 className='text-xl font-semibold my-5'>
        To be a mentor, you must have a google account
      </h4>
      <Button secondary className='my-5' onClick={handleGoogleLoginMentor}>
        Sign In with Google
      </Button>
    </>
  );
  // const adminForm = (
  //   <>
  //     <h4 className='text-xl font-semibold mt-5'>
  //       To be a admin, you must have a google account
  //     </h4>
  //     <Button secondary className='my-5' onClick={handleGoogleLogin}>
  //       Sign In with Google
  //     </Button>
  //   </>
  // );

  return (
    <div
      className={`flex flex-col items-center justify-around md:w-1/2 2xl:w-[30%] h-fit mx-auto my-64 p-5 ${formBgColor} rounded-lg shadow-md`}
    >
      {window.location.host.split(".")[0] === "mentor"
        ? mentorForm
        : studentForm}
    </div>
  );
}

export default RegisterPage;
