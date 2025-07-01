import React from "react";
import logoImage from "../assets/images/logo.png"
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" style={{textDecoration: "none"}}>
      <div className="navbar-brand ms-4 d-flex align-items-center">
        <img src={logoImage} alt="Logo" style={{ height: "35px", marginRight: "10px" }} />
        <span className="fw-bold fs-5" style={{ color: "#000" }}>
          JobMate
        </span>
      </div>
    </Link>


  )
}

export default Logo