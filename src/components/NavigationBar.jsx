import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/bt-circle-logo.png";
import Button from "./Button";

function NavigationBar({ links }) {
  const colors = useSelector((state) => state.color);
  const navigate = useNavigate();
  const handleLoginClick = () => {
    const regExpRole = /(student|mentor|admin)/;
    if (!window.location.host.split(".")[0].match(regExpRole)) {
      window.location.href = `${window.location.protocol}//student.${window.location.host}/login`;
    } else {
      navigate("/login");
    }
  };
  const handleHomeClick = () => {
    const regExpRole = /(student|mentor|admin)/;
    if (window.location.host.split(".")[0].match(regExpRole)) {
      const tempArray = window.location.host.split(".");
      tempArray.shift();
      const middlePart = `${tempArray.join(".")}`;
      window.location.href = `${window.location.protocol}//${middlePart}/`;
    } else {
      navigate("/");
    }
  };

  let middlePart = window.location.host;
  if (window.location.host.split(".")[0] === "mentor") {
    middlePart = window.location.host;
  } else if (
    window.location.host.split(".")[0] === "student" ||
    window.location.host.split(".")[0] === "admin"
  ) {
    const tempArray = window.location.host.split(".");
    tempArray.shift();
    middlePart = `mentor.${tempArray.join(".")}`;
  } else {
    middlePart = `mentor.${window.location.host}`;
  }

  const mentorRegisterLink = `${window.location.protocol}//${middlePart}/register`;

  return (
    <header
      className={`hidden md:flex w-full ${colors.headerBgColor} text-white md:flex-row md:justify-between md:items-center h-auto`}
    >
      <img
        src={Logo}
        alt='B-tribe'
        className='w-16 h-auto my-5 ml-16 cursor-pointer'
        onClick={handleHomeClick}
      />
      <div className='flex flex-row justify-start items-center w-fit mr-16'>
        <a
          className={`mx-3 text-md header ${colors.navTextColor} cursor-pointer`}
          href={mentorRegisterLink}
        >
          Become a Mentor
        </a>
        {links.map((link, index) => {
          return (
            <NavLink
              to={link.path}
              key={index}
              className={({ isActive }) =>
                isActive
                  ? `mx-3 font-bold text-lg ${colors.navActiveColor} border-b-4 ${colors.navActiveBorderColor}`
                  : `mx-3  text-md header ${colors.navTextColor} `
              }
            >
              {link.name}
            </NavLink>
          );
        })}
        <Button secondary onClick={handleLoginClick} className='ml-2'>
          Login
        </Button>
      </div>
    </header>
  );
}
export default NavigationBar;
