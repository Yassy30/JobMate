import React, { useState } from "react";
import Img1 from "../../assets/images/apple.jpg"

export default function Post() {
    const job = 
        {
            id: 1,
            title: "Programador Host",
            company: "Knowmad Mood",
            location: "Agadir",
            description: `InnovationTeam is a forward-thinking technology company...InnovationTeam is a forward-thinking technology company...InnovationTeam is a forward-thinking technology company...InnovationTeam is a forward-thinking technology company...InnovationTeam is a forward-thinking technology company...`,
            salary: "$80,000 - $100,000",
            jobPosted: "14 Jul, 2024",
            jobExpires: "14 Aug, 2024",
            experience: "3+ years",
            typeJob: "Remote",
            typePost: "Internship",
            education: "Bachelor's Degree",
            requirements: [
                "Experience in Scrum methodology",
                "Good communication skills",
                "English level B2 or higher",
            ],
            benefits: ["Remote Work", "Health Insurance", "Flexible Hours"],
        }
    
  const [savedJobs, setSavedJobs] = useState([]);
    const [isLightBoxVisible, setLightBoxVisible] = useState(false);
  

  const handleSaveJob = (jobId) => {
    // Check if job is already saved
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId)); // Remove job from saved list
    } else {
      setSavedJobs([...savedJobs, jobId]); // Add job to saved list
    }
  };

  
  const handleOpenLightBox = () => {
    setLightBoxVisible(true); // Show the lightbox
  };

  const handleCloseLightBox = () => {
    setLightBoxVisible(false); // Close the lightbox
  };

    return (
        <div className="container main-content mt-4">
            <div className="row justify-content-center mx-3">
                <div className="d-flex align-items-center mb-3">
                    <img
                        src={Img1} // Replace with company logo
                        alt="Company Logo"
                        className="me-3 imgJobDes"
                    />
                    <div>
                        <h4 className="mb-0">{job.title}</h4>
                        <p className="text-muted">
                            {job.company} · {job.location} . ({job.typePost})
                        </p>
                    </div>
                    <div className="d-flex align-items-center ms-auto align-self-start">
                        <button
                            className="btn btn-light me-2 p-3 rounded border d-flex align-items-center justify-content-center linksBtn"
                            onClick={() => handleSaveJob(job.id)} // On button click, save the job
                        >
                            <i
                                className={`fi ${savedJobs.includes(job.id) ? 'fi-sr-bookmark' : 'fi-rr-bookmark'}`}
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
                                    <form>
                                        <div className="boxLight mb-3">
                                            <label htmlFor="description" className="form-label text-left">
                                                Description
                                            </label>
                                            <textarea
                                                className="form-control"
                                                id="description"
                                                rows="4"
                                                placeholder="Enter your description here"
                                            ></textarea>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="fileUpload" className="form-label text-left">
                                                Upload CV
                                            </label>
                                            <input className="form-control" type="file" id="fileUpload" />
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
            <div className="row justify-content-center">
                <div className="col-md-7 ms-3 pt-3 ">
                    <h5>Job Description</h5>
                    <p>{job.description}</p>

                    <h5>Requirements</h5>
                    <ul>
                        {job.requirements.map((requirement, index) => (
                            <li key={index}>{requirement}</li>
                        ))}
                    </ul>

                    <h5>Benefits</h5>
                    <ul>
                        {job.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                        ))}
                    </ul>
                </div>

                {/* Job Overview */}
                <div className="col-md-4">
                    <div className="bg-light p-3 mb-3 rounded">
                        <h6 className="sub-title mb-4 fw-bold text-dark">Salary</h6>
                        <h5 className="text-success salary">{job.salary}</h5>
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
                                <span className="text-muted">{job.jobPosted}</span>
                            </div>
                        </div>
                        <div className="d-flex align-items-start mb-3">
                            <i
                                className="fi fi-rs-map me-3"
                                style={{ color: "#0a65cc", fontSize: "1.5rem" }}
                            ></i>
                            <div>
                                <strong className="text-dark">Location:</strong>{" "}
                                <span className="text-muted">{job.location}</span>
                            </div>
                        </div>

                        <div className="d-flex align-items-start mb-3">
                            <i
                                className="fi fi-rr-employee-man me-3"
                                style={{ color: "#0a65cc", fontSize: "1.5rem" }}
                            ></i>
                            <div>
                                <strong className="text-dark">Type:</strong>{" "}
                                <span className="text-muted">{job.typeJob}</span>
                            </div>
                        </div>

                        <div className="d-flex align-items-start mb-3">
                            <i
                                className="fi fi-rr-briefcase me-3"
                                style={{ color: "#0a65cc", fontSize: "1.5rem" }}
                            ></i>
                            <div>
                                <strong className="text-dark">Experience:</strong>{" "}
                                <span className="text-muted">{job.experience}</span>
                            </div>
                        </div>

                        <div className="d-flex align-items-start">
                            <i
                                className="fi fi-rr-graduation-cap me-3"
                                style={{ color: "#0a65cc", fontSize: "1.5rem" }}
                            ></i>
                            <div>
                                <strong className="text-dark">Education:</strong>{" "}
                                <span className="text-muted">{job.education}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-light p-3 mb-3 rounded">
                        <h6 className="sub-title mb-4 fw-bold text-dark">Related Links</h6>
                        <div className="d-flex align-items-center">
                            {/* LinkedIn Button */}
                            <a
                                href={job.linkedIn}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="linksBtn btn btn-light me-3 p-3 rounded border d-flex align-items-center justify-content-center"
                            >
                                <i className="fi fi-brands-linkedin linksIcon"></i>
                            </a>
                            {/* Portfolio Button */}
                            <a
                                href={job.website}
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
    )
}