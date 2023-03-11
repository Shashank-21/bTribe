import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../assets/bt-circle-logo.png'

function NavigationBar({ links }) {
  const colors = useSelector((state) => state.color);
  const navigate = useNavigate();
  return <header className={`hidden md:flex w-full ${colors.headerBgColor} text-white md:flex-row md:justify-between md:items-center h-auto`}>
    <img src={Logo} alt="B-tribe" className='w-16 h-auto my-5 ml-16 cursor-pointer' onClick={() => navigate('/')} />
    <div className='flex flex-row justify-start items-center w-fit mr-16'>
      <a className={`mx-3 text-md header ${colors.navTextColor} cursor-pointer`} href={`${window.location.protocol}//${window.location.host.split('.')[0] === 'mentor' ? window.location.host : `mentor.${window.location.host}`}`}>Become a Mentor</a>
      {links.map((link, index) => {
        return <NavLink to={link.path} key={index} className={({ isActive }) =>
          isActive
            ? `mx-3 font-bold text-lg ${colors.navActiveColor} border-b-4 ${colors.navActiveBorderColor}`
            : `mx-3  text-md header ${colors.navTextColor} `
        }>
          {link.name}
        </NavLink>
      })}
    </div>
  </header>
}
export default NavigationBar;