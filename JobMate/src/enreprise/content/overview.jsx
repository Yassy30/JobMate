import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/candidate.css";
import JobList from "./myJobs";
import { Link} from "react-router-dom";


const Overview = () => {
  const [recruiter, setRecruiter] = useState(null);
  const email = sessionStorage.getItem('email');
  if (!email) {
    console.log('Email not found in sessionStorage');
    // Handle the error or redirect to login page
  }
  console.log(email)

  useEffect(() => {
    fetch(`http://localhost:8080/api/recruiter/findByEmail?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setRecruiter(data);
        } else {
          setProfileWarning("Recruiter not found.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setProfileWarning("Error fetching recruiter data.");
      });
  }, [email]);

  if (!recruiter) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid main-content" style={{ height: "1000px" }}>
      {/* Main Content */}
      <main className="col-md p-4">
        {/* Overview Section */}
        <section className="mb-4">
          <h4>Welcome {recruiter.companyName} !</h4>
          <p>Here is your daily activities and job alerts</p>
          <div className="container my-5">
      <div className="row">
        <div className="col-md-4">
          <div
            className="card text-center shadow-sm p-2 my-2"
            style={{ backgroundColor: "#EAF3FF", border: "none", borderRadius: "10px" }}
          >
            <div className="card-body">
                <div className="row">
                    <div className="col"> 
              <h5 className="card-title mb-1">589</h5>
              <p className="card-text text-muted">Open Jobs</p>
              </div>
              <div className="col"> 
                
              <i className="fas fa-briefcase fa-2x text-primary bg-white p-3 border border-white rounded-2"></i>

              </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="card text-center shadow-sm p-2 my-2"
            style={{ backgroundColor: "#FFF7E6", border: "none", borderRadius: "10px" }}
          >
            <div className="card-body">
            <div className="row">
            <div className="col"> 
              <h5 className="card-title mb-1">238</h5>
              <p className="card-text text-muted">Saved Candidates</p>
              </div>
              <div className="col">
              <i className="fas fa-id-card fa-2x text-warning bg-white p-3 border border-white rounded-2"></i>

              </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

          
        </section>

        {/* Recently Applied Jobs */}
        <section>
      
          <JobList/>
        </section>
      </main>
    </div>
  );
};

export default Overview;
