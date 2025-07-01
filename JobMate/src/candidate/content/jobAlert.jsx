import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/candidate.css";
import Img1 from "../../assets/images/apple.jpg";
import ImgNotMatch from "../../assets/images/notmatch.svg";
import { useLocation } from "react-router-dom";

const JobAlert = () => {
  const locationData = useLocation();
  const { title, location: jobLocation } = locationData.state || {};  // const jobs = [
  const email = sessionStorage.getItem('email');

  const [selectedJob, setSelectedJob] = useState();
  const [isLightBoxVisible, setLightBoxVisible] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [description, setDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/jobs/all");
        if (response.ok) {
          const data = await response.json();
          setJobs(data);

          // Set the first job as selected by default
          if (data.length > 0) {
            setSelectedJob(data[0]);
          }
        } else {
          console.error("Failed to fetch jobs");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const [savedJobs, setSavedJobs] = useState([]);

  const handleSaveJob = (job) => {
    const isJobSaved = savedJobs.some(savedJob => savedJob.id === job.id);
    const updatedSavedJobs = isJobSaved
      ? savedJobs.filter(savedJob => savedJob.id !== job.id)
      : [...savedJobs, job];

    setSavedJobs(updatedSavedJobs);
    localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(saved);
  }, []);


  // Effect to update filtered jobs whenever title or location changes
  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const normalizedJobLocation = jobLocation ? jobLocation.trim().toLowerCase() : null;
      const normalizedTitle = title ? title.trim().toLowerCase() : null;
      const titleMatch = !normalizedTitle || job.title.toLowerCase().includes(normalizedTitle);
      const locationMatch = !normalizedJobLocation || job.location.trim().toLowerCase() === normalizedJobLocation;
      return titleMatch && locationMatch;
    });

    setFilteredJobs(filtered);
    if (filtered.length > 0) {
      setSelectedJob(filtered[0]);
    } else {
      setSelectedJob(jobs[0]); // Fallback
    }
  }, [title, jobLocation, jobs]);


  const handleOpenLightBox = () => {
    setLightBoxVisible(true); // Show the lightbox
  };

  const handleCloseLightBox = () => {
    setLightBoxVisible(false); // Close the lightbox
  };
  //Handle form submission
  const handleSubmitApplication = async (e) => {
    e.preventDefault();

    if (!selectedJob || !description) {
      alert("Please fill the cover letter.");
      return;
    }

    const formData = new FormData();
    formData.append("jobId", selectedJob.id);
    formData.append("description", description);
    formData.append("resume", resumeFile);


    try {
      // Step 1: Upload the file
      const fileFormData = new FormData();
      fileFormData.append("file", resumeFile);

      const uploadResponse = await fetch("http://localhost:8080/api/test/upload", {
        method: "POST",
        body: fileFormData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file");
      }

      const filePath = await uploadResponse.text(); // Get the file path or unique identifier

      // Step 2: Submit the job application
      const applicationData = {
        jobId: selectedJob.id,
        description: description,
        resumePath: filePath, // Use the file path returned from the upload
      };
      const response = await fetch(`http://localhost:8080/api/applications/apply?email=${email}&&jobId=3`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Application submitted successfully!");
        setLightBoxVisible(false);
        setDescription("");
        setResumeFile(null);
      } else {
        console.error("Failed to submit application");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };



  return (
    <div className="container-fluid mt-5">
      <div className="row align-items-center py-3">
        {/* Jobs Dropdowns and Filters */}
        <div className="row align-items-center py-3">
          {/* Jobs Dropdown */}
          <div className="col-12 col-md-auto btn-group">
            <button
              type="button"
              className="btn btn-primary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Work Type
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Internship</a></li>
              <li><a className="dropdown-item" href="#">Employee</a></li>
            </ul>
          </div>

          {/* Work Mode Dropdown */}
          <div className="col-12 col-md-auto btn-group">
            <button
              type="button"
              className="btn btn-primary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Work Mode
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Hybrid</a></li>
              <li><a className="dropdown-item" href="#">Remote</a></li>
              <li><a className="dropdown-item" href="#">On-site</a></li>
            </ul>
          </div>

          {/* Date Posted Dropdown */}
          <div className="col-12 col-md-auto btn-group">
            <button
              type="button"
              className="btn btn-outline-primary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Date Posted
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Past 24 hours</a></li>
              <li><a className="dropdown-item" href="#">Past week</a></li>
              <li><a className="dropdown-item" href="#">Past month</a></li>
            </ul>
          </div>

          {/* Experience Level Dropdown */}
          <div className="col-12 col-md-auto btn-group">
            <button
              type="button"
              className="btn btn-outline-primary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Experience
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">+1 years</a></li>
              <li><a className="dropdown-item" href="#">+3 years</a></li>
              <li><a className="dropdown-item" href="#">+7 years</a></li>
            </ul>
          </div>

          {/* Company Dropdown */}
          <div className="col-12 col-md-auto btn-group">
            <button
              type="button"
              className="btn btn-outline-primary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Company Industry
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Digital</a></li>
              <li><a className="dropdown-item" href="#">Agriculture</a></li>
              <li><a className="dropdown-item" href="#">Medical</a></li>
            </ul>
          </div>

          {/* Reset Button */}
          <div className="col-12 col-md-auto ms-auto">
            <button className="btn btn-outline-danger w-100 w-md-auto">Reset</button>
          </div>
        </div>
      </div>

      <div className="row pt-0 mt-0">
        {/* Display message when no jobs match */}
        {filteredJobs.length === 0 && (
          <div className="col-12 text-center mb-3 pt-0 mt-0">
            <img src={ImgNotMatch} alt="No Matches" className="img-fluid" style={{ width: "120px", height: "120px" }} />
            <p>No matching element</p>
          </div>
        )}

        {/* Sidebar: Job List */}
        <div className="col-md-4 pt-1 py-3 border-end">
          <h5 className="my-3">Top Job Picks</h5>
          {(filteredJobs.length > 0 ? filteredJobs : jobs).map((job) => (
            <div
              className="card p-2 my-2 d-flex align-items-center jobCard"
              key={job.id}
              onClick={() => setSelectedJob(job)}
              style={{
                backgroundColor: selectedJob.id === job.id ? "#dfedff" : "white",
              }}
            >
              <img
                src={Img1}
                alt="logo"
                className="rounded jobImg me-2 mt-1"
                style={{ width: "50px", height: "50px" }}
              />
              <div className="align-self-start">
                <h5 className="p-0 m-0">{job.title}</h5>
                <div className="text-muted small p-0 m-0">
                  <p className="text-muted p-0 m-0">{job.company}</p>
                  <p className="text-muted p-0 m-0">{job.location} . ({job.typePost})</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content: Job Details */}
        <div className="col-md-8 p-4">
          <div className="row">
            <div className="d-flex align-items-center mb-3">
              <img
                src={Img1} // Replace with company logo
                alt="Company Logo"
                className="me-3 imgJobDes"
              />
              <div>
                <h4 className="mb-0">{selectedJob?.title}</h4>
                <p className="text-muted">
                  {selectedJob?.company} · {selectedJob?.location} . ({selectedJob?.type})
                </p>
              </div>
              <div className="d-flex align-items-center ms-auto align-self-start">
                <button
                  className="btn btn-light me-2 p-3 rounded border d-flex align-items-center justify-content-center linksBtn"
                  onClick={() => handleSaveJob(selectedJob?.id)} // On button click, save the job
                >
                  <i
                    className={`fi ${savedJobs.includes(selectedJob?.id) ? 'fi-sr-bookmark' : 'fi-rr-bookmark'}`}
                    style={{ color: "#0a65cc" }}
                  ></i>
                </button>

                {/* Button to open the lightbox */}
                <button
                  className="px-4 py-2 d-flex align-items-center appliedBtn"
                  onClick={handleOpenLightBox}
                >
                  Apply Now
                  <i className="fi fi-rr-arrow-right mx-2 justify-content-center"></i>
                </button>

                {/* Lightbox */}
                {isLightBoxVisible && (
                  <div className="lightbox-overlay" onClick={handleCloseLightBox}>
                    <div
                      className="lightbox-content"
                      style={{ position: "relative" }}
                      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                      <button className="close-btn" onClick={handleCloseLightBox}>
                        <i className="fi fi-rr-cross-small"></i>
                      </button>
                      <h2>Apply for the Job</h2>
                      <p>Please fill in the necessary details to proceed.</p>
                      <form onSubmit={handleSubmitApplication} encType="multipart/form-data">
                        <div className="boxLight mb-3">
                          <label htmlFor="description" className="form-label text-left">
                            Cover Letter
                          </label>
                          <textarea
                            className="form-control"
                            id="description"
                            rows="4"
                            placeholder="Enter your letter here"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          ></textarea>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="fileUpload"
                            className="form-label text-left">
                            Upload CV
                          </label>
                          <input className="form-control"
                            type="file"
                            id="fileUpload"
                            onChange={(e) => setResumeFile(e.target.files[0])}
                          />
                        </div>

                        <button type="submit" className="px-4 py-2 appliedBtn">
                          Send Description
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Job Description, Requirements, and Benefits */}
          <div className="row">
            <div className="col-md-8 pt-3">
              <h5>Job Description</h5>
              <p>{selectedJob?.description}</p>

              <h5>Requirements</h5>
              {/* <ul>
                {selectedJob?.requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul> */}
              <ul>
                <li>{selectedJob?.requirements}</li>
              </ul>

              <h5>Benefits</h5>
              <ul>
                <li>{selectedJob?.benefits}</li>
              </ul>
            </div>

            {/* Job Overview */}
            <div className="col-md-4">
              <div className="bg-light p-3 mb-3 rounded">
                <h6 className="sub-title mb-4 fw-bold text-dark">Salary</h6>
                <h5 className="text-success salary">{selectedJob?.minSalary} DH - {selectedJob?.maxSalary} DH</h5>
              </div>

              <div className="bg-light mb-3 p-4 rounded shadow-sm">
                <h6 className="sub-title mb-4 fw-bold text-dark">Job Details</h6>
                <div className="d-flex align-items-start mb-2">
                  <i
                    className="fi fi-rr-calendar me-3"
                    style={{ color: "#0a65cc", fontSize: "1.5rem" }}
                  ></i>
                  <div>
                    <strong className="text-dark">Job Posted:</strong>{" "}
                    <span className="text-muted">{selectedJob?.postedDate}</span>
                  </div>
                </div>
                <div className="d-flex align-items-start mb-3">
                  <i
                    className="fi fi-rs-map me-3"
                    style={{ color: "#0a65cc", fontSize: "1.5rem" }}
                  ></i>
                  <div>
                    <strong className="text-dark">Location:</strong>{" "}
                    <span className="text-muted">{selectedJob?.location}</span>
                  </div>
                </div>

                <div className="d-flex align-items-start mb-3">
                  <i
                    className="fi fi-rr-employee-man me-3"
                    style={{ color: "#0a65cc", fontSize: "1.5rem" }}
                  ></i>
                  <div>
                    <strong className="text-dark">Type:</strong>{" "}
                    <span className="text-muted">{selectedJob?.subType}</span>
                  </div>
                </div>

                <div className="d-flex align-items-start mb-3">
                  <i
                    className="fi fi-rr-briefcase me-3"
                    style={{ color: "#0a65cc", fontSize: "1.5rem" }}
                  ></i>
                  <div>
                    <strong className="text-dark">Experience:</strong>{" "}
                    <span className="text-muted">{selectedJob?.experience}</span>
                  </div>
                </div>

                <div className="d-flex align-items-start">
                  <i
                    className="fi fi-rr-graduation-cap me-3"
                    style={{ color: "#0a65cc", fontSize: "1.5rem" }}
                  ></i>
                  <div>
                    <strong className="text-dark">Education:</strong>{" "}
                    <span className="text-muted">{selectedJob?.education}</span>
                  </div>
                </div>
              </div>

              <div className="bg-light p-3 mb-3 rounded">
                <h6 className="sub-title mb-4 fw-bold text-dark">Related Links</h6>
                <div className="d-flex align-items-center">
                  {/* LinkedIn Button */}
                  <a
                    href={selectedJob?.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linksBtn btn btn-light me-3 p-3 rounded border d-flex align-items-center justify-content-center"
                  >
                    <i className="fi fi-brands-linkedin linksIcon"></i>
                  </a>
                  {/* Portfolio Button */}
                  <a
                    href={selectedJob?.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linksBtn btn btn-light me-3 p-3 rounded border d-flex align-items-center justify-content-center"
                  >
                    <i className="fi fi-ss-globe linksIcon"></i>
                  </a>
                </div>
              </div>

            </div>
          </div>
          {/* <PostDetail /> */}
        </div>
      </div>
    </div>
  );
};

export default JobAlert;

