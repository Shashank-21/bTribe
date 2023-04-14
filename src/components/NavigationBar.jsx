import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/bt-circle-logo.png";
import { storeUser } from "../store";
import Button from "./Button";

function NavigationBar({ links }) {
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.color);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.data);
  const handleLoginClick = () => {
    navigate("/student/login");
  };
  const handleLogoutClick = () => {
    dispatch(storeUser(null));
    localStorage.removeItem("user");
    navigate("/");
  };
  const handleHomeClick = () => {
    if (userData) {
      navigate(`/dashboard/${userData.user._id}`);
    } else {
      navigate("/");
    }
  };

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
      <div className='flex flex-row justify-center items-center w-fit'>
        {!userData && (
          <div className='flex flex-row justify-start items-center w-fit mr-5'>
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
          </div>
        )}
        {userData ? (
          <Button primary onClick={handleLogoutClick} className='mr-10'>
            Logout
          </Button>
        ) : (
          <Button primary onClick={handleLoginClick} className='mr-10'>
            Login
          </Button>
        )}
      </div>
    </header>
  );
}
export default NavigationBar;
