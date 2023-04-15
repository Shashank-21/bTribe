import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useThunk } from "../hooks/use-thunk";
import { registerUser, verifyPaymentSignature } from "../store";

export default function PaymentPage() {
  const { selectedVariant } = useSelector((state) => state.courses);
  const { formBgColor, formPlaceholderColor, textColor, headingColor } =
    useSelector((state) => state.color);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  //Get name, email and phone number
  //Razorpay flow
  //Create user, navitgate to register page for student

  const orderDetails = useSelector((state) => state.user.createdOrder);
  //console.log(orderDetails);
  const paymentVerified = useSelector((state) => state.user.paymentVerified);

  const regExpPhone = /^(\+[0-9]{1,3}-)?\(?[0-9]{3}\)?-?[0-9]{3}-?[0-9]{4}$/;

  const [doRegisterStudent, registerStudentLoading, registerStudentError] =
    useThunk(registerUser);
  const [doVerifySignature, verifySignatureLoading, verifySignatureError] =
    useThunk(verifyPaymentSignature);

  useEffect(() => {
    if (paymentVerified) {
      doRegisterStudent({
        name,
        email,
        role: 0,
        phone,
        courses: [selectedVariant?._id],
        maxCourseSlots: [selectedVariant?.maxSlots],
        paymentStatus: "done",
        approvalStatus: "approved",
        orderDetails: {
          orderId: orderDetails.id,
          paymentVerified,
        },
      });
      navigate("/student/register");
    }
  }, [
    paymentVerified,
    doRegisterStudent,
    name,
    email,
    phone,
    selectedVariant,
    navigate,
    orderDetails,
  ]);

  const handleNameChange = (event) => {
    setName(event.target.value);
    if (event.target.value) {
      setIsError(false);
    }
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    if (event.target.value.match(regExpPhone)) {
      setIsError(false);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (email) {
      setIsError(false);
    }
  };

  const messageToDisplay =
    message.split("\n").length > 1 ? (
      message.split("\n").map((part, index) => {
        return (
          <p className='mt-1 text-red-600' key={index}>
            {part}
            <br />
          </p>
        );
      })
    ) : (
      <p className='mt-3 text-red-600'>{message}</p>
    );

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
    amount: orderDetails?.amount_due, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "BTribe",
    description: `Payment for ${selectedVariant?.course.name}-${selectedVariant?.name} course`,
    image: "https://btribe.in/bt%20circle%20logo.png",
    order_id: orderDetails?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler: function (response) {
      doVerifySignature({ razorpayResponse: response, name, email });
    },
    prefill: {
      name,
      email,
      contact: `091${phone}`,
    },
    notes: {
      address: "BTRIBE Technologies Pvt Ltd, Jayanagar, Bengaluru",
    },
    theme: {
      color: "#faf100",
    },
  };

  const razorpay = new window.Razorpay(options);

  const razorpayHandler = (event) => {
    event.preventDefault();
    if (!name || !email || !phone) {
      setIsError(true);
      setMessage("The fields cannot be blank");
      return;
    } else if (!phone.match(regExpPhone)) {
      setIsError(true);
      setMessage(
        "Valid Phone Number Formats:\nXXXXXXXXXX\n[+Country Code]-XXXXXXXXXX\n[+Country Code]-XXX-XXX-XXXX\n[+Country Code]-(XXX)-XXX-XXXX"
      );
      return;
    }

    razorpay.open();
  };

  return (
    <div className='h-screen '>
      <div
        className={`w-5/6 md:w-1/2 2xl:w-1/3 h-fit flex flex-col items-center justify-center ${formBgColor} rounded-lg mx-auto mt-36 shadow-xl`}
      >
        <h4
          className={`${headingColor} w-full text-center text-2xl font-semibold py-3 mt-5`}
        >
          Order Details
        </h4>
        <div className='flex flex-row w-4/5 justify-between items-center mt-3'>
          <p className='text-lg font-semibold'>Course:</p>
          <p className='text-lg'>
            {selectedVariant?.course.name}-{selectedVariant?.name} course
          </p>
        </div>
        <div className='flex flex-row w-4/5 justify-between items-center mt-3'>
          <p className='text-lg font-semibold'>Amount:</p>
          <p className='text-lg'>₹ {selectedVariant?.variantCost} only</p>
        </div>
        <form
          className={`p-5 flex flex-col items-center justify-around w-full`}
          onSubmit={razorpayHandler}
        >
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
          {isError && messageToDisplay}
          {registerStudentLoading && (
            <p className='mt-3 text-green-600'>
              Payment done! Creating your profile
            </p>
          )}
          {registerStudentError && (
            <p className='mt-3 text-green-600'>
              There was an error creating your profile
            </p>
          )}
          <Button primary className='my-5'>
            Pay Now
          </Button>
        </form>
        {verifySignatureLoading && (
          <p className='my-5 text-xl font-semibold text-stone-700'>
            Verifying Payment
          </p>
        )}
        {verifySignatureError && (
          <p className='my-5 text-xl font-semibold text-red-700'>
            Error VerifyingPayment
          </p>
        )}
      </div>
    </div>
  );
}
