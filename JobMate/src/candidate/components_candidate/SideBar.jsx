import React from "react";
import { NavLink, Outlet } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";
import "../../styles/sidebar.css";


const SideBar = () => {
  // main-content
  return (
    <div className="d-flex ">
      {/* Sidebar */}
      <nav className="sideNav h-100">
        <div className="d-flex flex-column w-100 h-100">
          {/* Header de la page */}
          <div className="my-3 d-flex justify-content-center align-items-center d-none d-md-flex">
            <span className="text-uppercase text-muted small">
              Candidate Dashboard
            </span>
          </div>

          {/* Liens de la sidebar */}
          <ul className="navbar-nav flex-column w-100">
          <li className="nav-item my-2 Nvg">
              <NavLink
                to="/Candidate/overview"
                className={({ isActive }) =>
                  `btn nav-link navItem d-flex align-items-center px-0 m-0 py-2 w-100 text-start ${isActive ? "active" : ""}`
                }
              >
                <i className="fi fi-rr-layers mx-4"></i>
                <span className="d-none d-md-inline">Overview</span>
              </NavLink>
            </li>
            <li className="nav-item my-2 Nvg">
              <NavLink
                to="/Candidate/job-alert"
                className={({ isActive }) =>
                  `btn nav-link navItem d-flex align-items-center px-0 m-0 py-2 w-100 text-start ${isActive ? "active" : ""}`
                }
              >
                <i className="fi fi-rs-bell mx-4"></i>
                <span className="d-none d-md-inline">Job Alert</span>
              </NavLink>
            </li>

            <li className="nav-item my-2 Nvg">
              <NavLink
                to="/Candidate/applied-jobs"
                className={({ isActive }) =>
                  `btn nav-link navItem d-flex align-items-center px-0 m-0 py-2 w-100 text-start ${isActive ? "active" : ""}`
                }
              >
                <i className="fi fi-rr-briefcase mx-4"></i>
                <span className="d-none d-md-inline">Applied Jobs</span>
              </NavLink>
            </li>

            <li className="nav-item my-2 Nvg">
              <NavLink
                to="/Candidate/saved-jobs"
                className={({ isActive }) =>
                  `btn nav-link navItem d-flex align-items-center py-2 px-0 m-0 w-100 text-start ${isActive ? "active" : ""}`
                }
              >
                <i className="fi fi-rr-bookmark mx-4"></i>
                <span className="d-none d-md-inline">Save Jobs</span>
              </NavLink>
            </li>

            <li className="nav-item my-2 Nvg">
              <NavLink
                to="/Candidate/settings"
                className={({ isActive }) =>
                  `btn nav-link navItem d-flex align-items-center px-0 m-0 py-2 w-100 text-start ${isActive ? "active" : ""}`
                }
              >
                <i className="fi fi-rr-settings mx-4"></i>
                <span className="d-none d-md-inline">Settings</span>
              </NavLink>
            </li>

          </ul>
        </div>
      </nav>

      {/* Zone de contenu */}
      <div className="content-area p-4 w-100">
        <Outlet /> {/* C'est ici que les sous-routes seront rendues */}
      </div>
    </div>
  );
};

export default SideBar;
