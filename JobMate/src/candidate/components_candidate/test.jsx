import React ,{useState}from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";
import "../../styles/sidebar.css";
import profileImg from "../../assets/images/profile.jpg";
import Logo from "../../components/logo";
import { Link } from "react-router-dom";
import JobAlert from "../content/jobAlert";
const NavBar = () => {
   const [searchParams, setSearchParams] = useState({ title: "", location: "" });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      alert("Form submitted!"); 
      const title = e.target.title.value.trim();
      const location = e.target.location.value.trim();
      setSearchParams({ title, location });
      console.log("Search Parameters:", { title, location }); 
    };
  return (
    <>
    <nav className="navbar navbar-expand-lg topNav px-3 custom-fixed-top" style={{ height: "auto" }}>
      
      {/* Logo */}
      <div className="d-flex align-items-center">
        <Logo />
      </div>

      {/* Search Bar */}
      <div className="search-container flex-grow-1 d-flex justify-content-center order-2 order-md-1 mt-3 mt-md-0">
        <div className="input-group" style={{ maxWidth: "600px", width: "100%" }}>
          <span className="input-group-text">
            <i className="bi bi-search p-1"></i>
          </span>
          <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control p-1"
            placeholder="Job title, Keyword..."
            aria-label="Job title, Keyword"
          />
          <span className="input-group-text">
            <i className="bi bi-geo-alt p-1"></i>
          </span>
          <input
            type="text"
            className="form-control p-1"
            placeholder="Your Location"
            aria-label="Your Location"
          />
          <button className="btnSearch px-3" type="button">
            Find Job
          </button>
          </form>
        </div>
      </div>

      {/* Profile Image */}
      <div className="ms-auto d-flex align-items-center order-1 order-md-2">
        <Link to='settings'>
          <img src={profileImg} className="img-fluid profile" alt="profile" />
          </Link>
     
      </div>
    </nav>
      <JobAlert title={searchParams.title} location={searchParams.location} />
</>
  );
};

export default NavBar;
