import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import { useEmail } from "../EmailProvider"
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/candidate.css";
import JobList from "./JobList";
import { Link } from "react-router-dom";

const checkNullColumns = (candidate) => {
  const nullColumns = [];
  for (const key in candidate) {
    if (candidate[key] === null || candidate[key] === undefined) {
      nullColumns.push(key);
    }
  }
  return nullColumns.length > 0
    ? { hasNullColumns: true, nullColumns }
    : { hasNullColumns: false, nullColumns: [] };
};

const Overview = () => {
  const [candidate, setCandidate] = useState(null);
  const [profileWarning, setProfileWarning] = useState("");
  const location = useLocation();
  const email = sessionStorage.getItem('email');
  if (!email) {
    console.log('Email not found in sessionStorage');
    // Handle the error or redirect to login page
  }

  useEffect(() => {
    fetch(`http://localhost:8080/api/candidate/findByEmail?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setCandidate(data);
          const result = checkNullColumns(data);
          if (result.hasNullColumns) {
            setProfileWarning(`Please complete your profile. Missing fields: ${result.nullColumns.join(", ")}`);
          }
        } else {
          setProfileWarning("Candidate not found.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setProfileWarning("Error fetching candidate data.");
      });
  }, [email]);

  if (!candidate) {
    return <div>Loading...</div>;
  }


  return (
    <div className="container-fluid main-content" style={{ height: "1000px" }}>
      {/* Main Content */}
      <main className="col-md p-4">
        {/* Overview Section */}
        <section className="mb-4">
          <h4>Hello {candidate.firstname} {candidate.lastname}!</h4>
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
                        <p className="card-text text-muted">Applied Jobs</p>
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
                        <p className="card-text text-muted">Saved Jobs</p>
                      </div>
                      <div className="col">
                        <i className="fas fa-bookmark fa-2x text-warning  bg-white p-3 border border-white rounded-2"></i>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div
                  className="card text-center shadow-sm p-2 my-2"
                  style={{ backgroundColor: "#EBFAEB", border: "none", borderRadius: "10px" }}
                >
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h5 className="card-title mb-1">574</h5>
                        <p className="card-text text-muted">Job Alerts</p>
                      </div>
                      <div className="col">
                        <i className="fas fa-bell fa-2x text-success bg-white p-3 border border-white rounded-2"></i>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          {profileWarning && (
            // <div className="alert alert-warning mt-4">
            //   {profileWarning}
            // </div>
            <div className="alert alert-danger mt-4 d-flex justify-content-between align-items-center">
              <span>Your profile editing is not completed.</span>
              <Link to='../settings'>
                <button className="btn btn-primary btn-sm" style={{ backgroundColor: 'white', border: 'none', color: '#be2637' }}>Edit Profile</button>
              </Link>
            </div>
          )}

        </section>

        {/* Recently Applied Jobs */}
        <section>

          <JobList />
        </section>
      </main>
    </div>
  );
};

export default Overview;
