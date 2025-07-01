import React from "react";
import SideBar from "./components_candidate/SideBar";
import NavBar from "./components_candidate/navBar";
import '../styles/candidate.css'

import { BrowserRouter } from "react-router-dom";

export default function Candidate() {

  return (
    <div className="container-fluid p-0 m-0">
      <div className="row">
        
        <div className="sideblachnav">
          
          <SideBar />
        </div>
        <div>
          <NavBar />
        </div>
      </div>
    </div>
  );
}
