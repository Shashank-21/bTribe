import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaTelegramPlane } from 'react-icons/fa'
import { AiOutlineInstagram, AiFillLinkedin, AiFillCopyrightCircle } from 'react-icons/ai'
import { MdEmail, MdOutlinePhoneIphone, MdLocationOn } from 'react-icons/md';


function Footer({ links }) {
  const colors = useSelector((state) => state.color);
  const socialMediaHandles = [
    {
      icon: <FaTelegramPlane />,
      link: "https://t.me/catprep_btribe",
    },
    {
      icon: <AiOutlineInstagram />,
      link: "https://www.instagram.com/btribe.in/",
    },
    {
      icon: <AiFillLinkedin />,
      link: "https://www.linkedin.com/company/btribeindia/",
    },
  ];
  return <footer className={`flex flex-col md:flex-row justify-between items-start ${colors.footerBgColor} ${colors.footerTextColor} px-32`}>
    <div className=" flex flex-col justify-around items-center h-fit py-5">
      <h4 className="font-bold text-xl">Links</h4>
      {links.map((link, index) => {
        return <Link to={link.path} key={index} className={`mt-2 text-md ${colors.navTextColor} `}>
          {link.name}
        </Link>
      })}
    </div>
    <div className="flex flex-col justify-between items-center py-5">
      <h4 className="font-bold text-xl">Follow us on Social Media</h4>
      <div className="flex flex-row justify-between items-center">
        {socialMediaHandles.map((handle, i) => {
          return (
            <a
              className='mr-3 p-3 cursor-pointer text-4xl'
              href={handle.link}
              key={i}
            >
              {handle.icon}
            </a>
          );
        })}
      </div>
      <p className="md:mt-20 flex flex-row items-center justify-start text-md"><AiFillCopyrightCircle className="mr-2" /> BTRIBE Technologies Pvt Ltd</p>
    </div>
    <div className="py-5 flex flex-col justify-start items-left">
      <h4 className="font-bold text-xl text-center">Contact Us</h4>
      <div className="flex flex-row justify-start items-center mt-4">
        <MdEmail className="text-2xl mr-2 " />
        <p className="text-md">admin@btribe.co.in</p>
      </div>
      <div className="flex flex-row justify-start items-center mt-4">
        <MdOutlinePhoneIphone className="text-2xl mr-2 " />
        <p className="text-md">+91-9817410541</p>
      </div>
      <div className="flex flex-row justify-start items-start mt-4">
        <MdLocationOn className="text-2xl mr-2 mt-0.5" />
        <p className="text-md">BTRIBE Technologies Pvt Ltd,<br /> Jayanagar, Bengaluru</p>
      </div>
    </div>
  </footer>
}
export default Footer;