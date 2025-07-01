import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";
// import "../../styles/sidebar.css";
import profileImg from "../../assets/images/profile.jpg";
import Logo from "../../components/logo";


const NavBar = () => {
  const [showLightbox, setShowLightbox] = useState(false); // State for the lightbox
  const navigate = useNavigate();

  const handleLogout = () => {
    const email = sessionStorage.getItem('email'); // Fetch email for debugging
    console.log("Logging out: " + email);
  
    sessionStorage.removeItem('email'); // Clear the stored email
    setShowLightbox(false); // Close the lightbox
    navigate('/login'); // Redirect to login
  };
  const handleSettings = () => {
    navigate("/settings");
    setShowLightbox(false); // Close the lightbox
  };
  return (
    <nav className="navbar navbar-expand-lg topNav px-3 custom-fixed-top" style={{ height: "auto" }}>

      {/* Logo */}
      <div className="d-flex align-items-center">
        <Logo />
      </div>

      {/* Profile Image */}
      <div className="ms-auto d-flex align-items-center">
        <Link to='post-job'>
          <button className="outside-btn me-4">Add A Jobs</button>
        </Link>
        <div className="ms-auto d-flex align-items-center order-1 order-md-2 position-relative">
          <img
            src={profileImg}
            className="img-fluid profile rounded-circle"
            alt="profile"
            onClick={() => setShowLightbox(!showLightbox)} // Toggle the lightbox
            style={{ cursor: "pointer", width: "40px", height: "40px" }}
          />

          {/* Lightbox */}
          {showLightbox && (
            <div
              className="lightbox position-absolute bg-white p-3 shadow-lg rounded"
              style={{
                top: "60px",
                right: "10px",
                zIndex: "10",
                width: "250px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Profile Section */}
              <div className="d-flex align-items-center mb-3">
                <img
                  src={profileImg}
                  className="img-fluid rounded-circle"
                  alt="profile"
                  style={{ width: "40px", height: "40px", marginRight: "10px" }}
                />
                <div>
                  <h6 className="mb-0">Howard Esther</h6>
                </div>

              </div>

              <hr className="m-0 p-0 mb-2" />

              {/* Links */}
              <div className="d-flex flex-column">
                <Link
                  to="/Entreprise/settings"
                  className="LinkProf d-flex align-items-center mb-2 text-decoration-none text-dark m-0 py-1"
                >
                  <i className="fi fi-rr-user px-3"></i>
                  My Profile
                </Link>
                <hr className="m-0 p-0 mb-2" />
                <Link
                  to="/"
                  className="LinkProf d-flex align-items-center text-decoration-none text-dark m-0 py-1"
                  onClick={handleLogout}
                >
                  <i className="fi fi-rr-sign-out-alt px-3"></i>
                  Log Out
                </Link>
              </div>
            </div>
          )}
        </div>
        {showLightbox && (
          <div className="backdrop"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: "9",
            background: "transparent",
          }}
          onClick={() => setShowLightbox(false)}

          >

          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
