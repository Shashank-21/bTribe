import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useThunk } from "../hooks/use-thunk";
import { updateUser } from "../store";
import Button from "./Button";

function AdminRegistrationForm({ user, role }) {
  const data = user?.user;
  const navigate = useNavigate();
  const [doUpdateUser, updateUserLoading, updateUserError] =
    useThunk(updateUser);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);

  const regExpPhone = /(\+[0-9]{1,3}-)?\(?[0-9]{3}\)?-?[0-9]{3}-?[0-9]{4}/;
  const { formBgColor, formPlaceholderColor, textColor } = useSelector(
    (state) => state.color
  );

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    if (phone.match(regExpPhone)) {
      setError(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!phone.match(regExpPhone)) {
      setError(true);
    } else {
      const registerData = {
        _id: data._id,
        name: data.name,
        phone,
        role,
      };

      doUpdateUser(registerData);
      if (updateUserLoading) {
        console.log("Updating User");
      } else if (updateUserError) {
        console.log("Error!");
      } else {
        navigate(`/dashboard/${data._id}`);
        console.log("something");
      }
    }
  };
  return (
    <form
      className={`flex flex-col ${formBgColor} items-center justify-around 2xl:w-1/3 md:w-1/2 mt-64 mx-auto p-5 rounded-lg`}
      onSubmit={handleSubmit}
    >
      <h3 className='text-xl font-semibold mt-3'>Just a few more details!</h3>

      <div className='w-5/6 h-12 mt-3 px-3 flex flex-row justify-start items-center text-stone-400 rounded-lg bg-stone-100'>
        {data?.name}
      </div>
      <div className='w-5/6 h-12 mt-3 px-3 flex flex-row justify-start items-center text-stone-400 rounded-lg bg-stone-100'>
        {data?.email}
      </div>
      <input
        type='text'
        value={phone}
        placeholder='Phone'
        onChange={handlePhoneChange}
        className={`w-5/6 h-12 mt-3 px-3 rounded-lg shadow-md bg-white placeholder:${formPlaceholderColor} ${textColor}`}
      />
      {error && !phone.match(regExpPhone) && (
        <p className='text-md md:text-lg text-red-600'>
          Valid Phone Number Formats:
          <br />
          XXXXXXXXXX
          <br />
          [+Country Code]-XXXXXXXXXX
          <br />
          [+Country Code]-XXX-XXX-XXXX
          <br />
          [+Country Code]-(XXX)-XXX-XXXX
        </p>
      )}
      <Button primary className='mt-5'>
        Create Profile
      </Button>
    </form>
  );
}
export default AdminRegistrationForm;
