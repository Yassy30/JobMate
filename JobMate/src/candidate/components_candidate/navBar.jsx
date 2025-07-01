
// export default NavBar;
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";
import "../../styles/sidebar.css";
import profileImg from "../../assets/images/profile.jpg";
import Logo from "../../components/logo";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [searchParams, setSearchParams] = useState({ title: "", location: "" });
  const [showLightbox, setShowLightbox] = useState(false);
  const [isLightBoxVisible, setLightBoxVisible] = useState(false);
  // State for the lightbox
  const navigate = useNavigate(); // For navigating programmatically


  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/Candidate/job-alert', { state: searchParams });
  };

  const handleLogout = () => {
    const email = sessionStorage.getItem('email'); // Fetch email for debugging
    console.log("Logging out: " + email);
  
    sessionStorage.removeItem('email'); // Clear the stored email
    sessionStorage.clear();
    setShowLightbox(false); // Close the lightbox
    navigate('/login'); // Redirect to login
  };
  const handleSettings = () => {
    navigate("/settings");
    setShowLightbox(false); // Close the lightbox
  };

  const handleOpenLightBox = () => {
    setLightBoxVisible(true); // Show the lightbox
  };

  const handleCloseLightBox = () => {
    setLightBoxVisible(false); // Close the lightbox
  };


  return (
    <nav className="navbar navbar-expand-lg topNav px-3 custom-fixed-top" style={{ height: "auto" }}>
      {/* Logo */}
      <div className="d-flex align-items-center  ">
        <Logo />
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="search-container flex-grow-1 d-flex justify-content-center order-2 order-md-1 mt-3 mt-md-0">
        <div className="input-group" style={{ maxWidth: "600px", width: "100%" }}>
          <span className="input-group-text">
            <i className="bi bi-search p-1"></i>
          </span>
          <input
            type="text"
            className="form-control p-1"
            placeholder="Job title, Keyword..."
            aria-label="Job title, Keyword"
            name="title"
            value={searchParams.title}
            onChange={handleChange}
          />
          <span className="input-group-text">
            <i className="bi bi-geo-alt p-1"></i>
          </span>
          <input
            type="text"
            className="form-control p-1"
            placeholder="Your Location"
            aria-label="Your Location"
            name="location"
            value={searchParams.location}
            onChange={handleChange}
          />
          <button className="btnSearch px-3" type="submit">
            Find Job
          </button>
        </div>
      </form>

      {/* Profile Image */}
      <div className="ms-auto d-flex align-items-center order-1 order-md-2 position-relative">
        {/* Profile Picture */}
        <div className="position-relative">
          <img
            src={profileImg}
            className="img-fluid profile rounded-circle"
            alt="profile"
            onClick={() => setShowLightbox(!showLightbox)} // Toggle the lightbox
            style={{ cursor: "pointer", width: "40px", height: "40px" }}
          />
          {/* Red Circle Indicator */}
          <span
            className="position-absolute bg-danger border border-light rounded-circle"
            style={{
              width: "10px",
              height: "10px",
              top: "5px",
              right: "5px",
              transform: "translate(50%, -50%)",
            }}
          ></span>
        </div>

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
            onClick={(e) => e.stopPropagation()} // Prevent click inside lightbox from closing it
          >
            {/* Profile Section */}
            <div className="d-flex align-items-center mb-3">
              {/* Profile Image */}
              <div className="position-relative me-2">
                <img
                  src={profileImg}
                  className="img-fluid rounded-circle"
                  alt="profile"
                  style={{ width: "40px", height: "40px" }}
                />
              </div>
              {/* User Info */}
              <div>
                <h6 className="mb-0">Howard Esther</h6>
              </div>
            </div>

            <hr className="m-0 p-0 mb-2" />

            {/* Links */}
            <div className="d-flex flex-column">
              <Link
                to="/Candidate/settings"
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

      {/* Close Lightbox on Outside Click */}
      {showLightbox && (
        <div
          className="backdrop"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: "9",
            background: "transparent",
          }}
          onClick={() => setShowLightbox(false)} // Close the lightbox when clicking outside
        ></div>
      )}


    </nav>
  );
};

export default NavBar;
