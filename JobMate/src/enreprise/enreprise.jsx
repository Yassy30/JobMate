import React from "react";
// import SearchBar from "./searchBar";
import SideBar from "./components_entreprise/SideBar";
import NavBar from "./components_entreprise/navBar";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function Candidate() {
  return (
    <div className="container-fluid p-0 m-0">
      <div className="row">
        
          <div>
            <SideBar />
          </div>
          <div>
          <NavBar />
        </div>
        </div>
      </div>
  );
}
