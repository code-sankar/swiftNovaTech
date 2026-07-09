import { Outlet } from "react-router-dom";

import Navbar from "./components/Home/Navbar.jsx";
import Footer from "./components/Home/Footer.jsx";
import ScrollToTop from "./components/Home/scroll__top.jsx";
import Seo from "./components/Seo.jsx";

function App() {
  return (
    <>
      <ScrollToTop />
      <Seo />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;