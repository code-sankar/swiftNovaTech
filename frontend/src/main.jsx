import { React, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import App from "./App.jsx";
import CMS from "./pages/Our_services/cms.jsx";
import Ecommerce from "./pages/Our_services/cms.jsx";
import WebApps from "./pages/Our_services/wenApps.jsx";
import Maintenance from "./pages/Our_services/Maintenence.jsx";
import UIUXDesign from "./pages/Our_services/uiux.jsx";
import WebDevelopment from "./pages/Our_services/webdev.jsx";
import NotFound from "./pages/NotFound.jsx";
import Technologies from "./pages/Technologies.jsx";
import Blogs from "./pages/Blogs.jsx";
import Contact from "./pages/Contact.jsx";
import Home from "./pages/Home.jsx";
import WhyUs from "./pages/Our_services/WhyUs.jsx";
import CaseStudies from "./pages/Portfolio/CaseStudies.jsx";
import ClientProjects from "./pages/Portfolio/ClientProjects.jsx";
//import AIMachineLearning from "./pages/Our_services/ai_machine_learning.jsx";
import PrivacyPolicy from "./pages/FooterPages/PrivacyPolicy.jsx";
import TermsOfService from "./pages/FooterPages/TermsOfService.jsx";
import Disclaimer from "./pages/FooterPages/Disclaimer.jsx";
import Sitemap from "./pages/FooterPages/Sitemap.jsx";
import ProjectDetail from "./pages/Portfolio/ProjectDetail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/web",
        element: <WebDevelopment />,
      },
      // {
      //   path: "/apps",
      //   element: <MobileDevelopment />,
      // },
      {
        path: "/design",
        element: <UIUXDesign />,
      },
      {
        path: "/cms",
        element: <CMS />,
      },
      {
        path: "/web-apps",
        element: <WebApps />,
      },
      {
        path: "/maintenance",
        element: <Maintenance />,
      },
      {
        path: "/ecommerce",
        element: <Ecommerce />,
      },

      {
        path: "/blog",
        element: <Blogs />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/whyUs",
        element: <WhyUs />,
      },
      {
        path: "/cases",
        element: <CaseStudies />,
      },
      {
        path: "/projects",
        element: <ClientProjects />,
      },
      {
        path: "/tech",
        element: <Technologies />,
      },
      // {
      //   path: "ai",
      //   element: <AIMachineLearning />,
      // },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
      { path: "/terms-of-service", element: <TermsOfService /> },
      { path: "/disclaimer", element: <Disclaimer /> },
      { path: "/sitemap", element: <Sitemap /> },
      {
        path: "/projects/:slug",
        element: <ProjectDetail />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
