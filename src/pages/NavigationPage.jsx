import { useEffect, useState } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import Footer from "../components/Footer";
import MobileNavigationBar from "../components/MobileNavigationBar";
import NavigationBar from "../components/NavigationBar";

function NavigationPage() {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const [showFooter, setShowFooter] = useState(true);
  useEffect(() => {
    if (location.pathname === "/") {
      setShowFooter(false);
    } else if (location.pathname.includes("dashboard")) {
      setShowFooter(false);
    } else {
      setShowFooter(true);
    }
  }, [location]);

  const links = [
    { path: "/mentor/register", name: "Become a Mentor" },
    { path: "/about", name: "About" },
    { path: "/courses", name: "Catalog" },
  ];

  return (
    <main>
      <NavigationBar links={links} />
      <MobileNavigationBar links={links} />
      {currentOutlet}
      {showFooter && <Footer links={links} />}
    </main>
  );
}

export default NavigationPage;
