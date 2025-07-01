import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "./logo";

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-white">
      <div className="container-fluid container px-3 d-flex justify-content-between align-items-center">
        <Logo />

        <div className="d-flex">
          <Link to="/signup" className="signup text-white text-decoration-none">
            <button className="me-3 btnSin">
              Sign Up
            </button>
          </Link>
          <Link to="/login" className="login text-decoration-none">
            <button className="btnLog">
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
