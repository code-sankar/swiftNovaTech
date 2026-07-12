import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";

// ─── Service pages (the six web services) ───
import WebDevelopment from "./pages/Our_services/webdev.jsx";       // /web
import Ecommerce from "./pages/Our_services/Ecommerce.jsx";              // /ecommerce  ⚠️ TEMPORARY: see TODO below
import WebApps from "./pages/Our_services/wenApps.jsx";            // /web-apps  (TODO: rename file -> webApps.jsx)
import CMS from "./pages/Our_services/cms.jsx";                     // /cms
import UIUXDesign from "./pages/Our_services/uiux.jsx";             // /design
import Maintenance from "./pages/Our_services/Maintenence.jsx";     // /maintenance (TODO: rename file -> Maintenance.jsx)
import MobileDevelopment from "./pages/Our_services/mobiledev.jsx";

// TODO(ecommerce): /ecommerce currently renders the CMS page because Ecommerce
// imports cms.jsx. Create pages/Our_services/ecommerce.jsx, then change the
// import above to:
//   import Ecommerce from "./pages/Our_services/ecommerce.jsx";
// No route change needed — just the import.

// ─── Core pages ───
import Home from "./pages/Home.jsx";
import WhyUs from "./pages/Our_services/WhyUs.jsx";
import Technologies from "./pages/Technologies.jsx";
import Blogs from "./pages/Blogs.jsx";
import Contact from "./pages/Contact.jsx";

// ─── Portfolio ───
import CaseStudies from "./pages/Portfolio/CaseStudies.jsx";
import ClientProjects from "./pages/Portfolio/ClientProjects.jsx";
import ProjectDetail from "./pages/Portfolio/ProjectDetail.jsx";

// ─── Legal / footer ───
import PrivacyPolicy from "./pages/FooterPages/PrivacyPolicy.jsx";
import TermsOfService from "./pages/FooterPages/TermsOfService.jsx";
import Disclaimer from "./pages/FooterPages/Disclaimer.jsx";
import Sitemap from "./pages/FooterPages/Sitemap.jsx";

import NotFound from "./pages/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/",      element: <Home /> },
      { path: "/home",  element: <Home /> },

      // Services — the six web practice areas
      { path: "/web",         element: <WebDevelopment /> },
      { path: "/ecommerce",   element: <Ecommerce /> },
      { path: "/web-apps",    element: <WebApps /> },
      { path: "/cms",         element: <CMS /> },
      { path: "/design",      element: <UIUXDesign /> },
      { path: "/maintenance", element: <Maintenance /> },
      { path: "/mobile",      element: <MobileDevelopment /> },
      // Core
      { path: "/blog",    element: <Blogs /> },
      { path: "/contact", element: <Contact /> },
      { path: "/whyUs",   element: <WhyUs /> },
      { path: "/tech",    element: <Technologies /> },

      // Portfolio
      { path: "/cases",          element: <CaseStudies /> },
      { path: "/projects",       element: <ClientProjects /> },
      { path: "/projects/:slug", element: <ProjectDetail /> },

      // Legal
      { path: "/privacy-policy",   element: <PrivacyPolicy /> },
      { path: "/terms-of-service", element: <TermsOfService /> },
      { path: "/disclaimer",       element: <Disclaimer /> },
      { path: "/sitemap",          element: <Sitemap /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);