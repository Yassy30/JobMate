import React, { useState } from "react";
import "../../styles/candidate.css";
import Img2 from "../../assets/images/Profile.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
export default function SavedCandidate() {
  const userData = {
    id: 1,
    profilePicture: "https://example.com/profile.jpg",
    name: "Jane Doe",
    jobTitle: "Android Developer",
    description: "Passionate software engineer with 5+ years of experience in building scalable web applications.",



    profession: "Software Engineer",
    location: "New York, USA",
    availability: "Available for Remote Work",
    email: "jane.doe@example.com",
    phone: "+1 123-456-7890",
    about:
      "Passionate software engineer with 5+ years of experience in building scalable web applications. Skilled in React, Node.js, and cloud infrastructure.",
    experience: "Frontend Developer",
    cover_letter: "Diplômée en développement Full Stack Digital à CMC Agadir, et ayant développé une expérience pratique à travers des projets tels qu’un système de gestion d’orphelinat, je suis enthousiaste à l’idée de rejoindre votre entreprise en tant que Développeur Full Stack.Lors de ma formation, j’ai acquis des compétences solides en développement front-end et back-end, maîtrisant des technologies comme React, TypeScript, Spring Boot, et la gestion des bases de données complexes. Dans le cadre de mon projet de gestion d’orphelinat, j’ai conçu des interfaces utilisateur intuitives, intégré des fonctionnalités de gestion avancées et optimisé la performance globale de l’application.Mon expertise technique s’accompagne d’un esprit rigoureux et créatif, ce qui me permet de m’adapter rapidement aux besoins d’un projet et d’apporter des solutions modernes et efficaces. En travaillant chez Tech Innovators Maroc, je souhaite contribuer au développement de vos produits innovants tout en continuant à relever de nouveaux défis dans un environnement collaboratif et stimulant.Je suis motivée par l’idée de mettre mes compétences au service de vos projets et d’évoluer au sein de votre équipe. Je serais ravie de discuter plus en détail de mes qualifications lors d’un entretien.Dans l’attente de votre retour, je vous remercie pour votre attention et reste à votre disposition pour toute information complémentaire.",
    yearsExperience: 5,
    education: "Bachelor's Degree in Computer Science",
    linkedIn: "https://linkedin.com/in/janedoe",
    website: "https://janedoe.dev",
    CV: "mina.pdf"
  };

  const [isLightBoxVisible, setLightBoxVisible] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(userData); // Add selectedJob state to store job details

  const handleOpenLightBox = () => {
    setLightBoxVisible(true);
  };

  const handleCloseLightBox = () => {
    setLightBoxVisible(false);
  };

  const handleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  return (
    <div className=" container-fluid table-responsive main-content">
      <h5 className="m-3">Favorite Candidate</h5>
      <table className="table">
        <tbody>
          <tr>
            <td>
              <div className="d-flex align-items-center">
                <img
                  src={Img2}
                  style={{ width: "50px" }}
                  alt="logo"
                  className="me-3 rounded"
                />
                <div>
                  <strong className="h5">{userData.name}</strong>
                  <div className="text-muted small pt-1">
                    {userData.jobTitle}
                  </div>
                </div>
              </div>
            </td>
            <td
              className="text-center align-middle me-3"
              style={{ width: "150px" }}
            >
              <button className="white-btn" onClick={handleOpenLightBox}>
                View Profile
                <i className="fi fi-rr-arrow-right mx-2 justify-content-center"></i>
              </button>

              {isLightBoxVisible && (
                <div
                  className="lightbox-overlay mainnn-content"
                  onClick={handleCloseLightBox}
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0, 0, 0, 0.8)",
                    zIndex: 9999,
                  }}
                >
                  <div
                    className="lightbox-content"
                    style={{
                      position: "relative",
                      maxWidth: "800px",
                      margin: "50px auto",
                      background: "#fff",
                      borderRadius: "15px",
                      padding: "20px",
                      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="close-btn"
                      onClick={handleCloseLightBox}
                      style={{
                        position: "absolute",
                        top: "15px",
                        right: "15px",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <i
                        className="fi fi-rr-cross-small"
                        style={{ fontSize: "20px", color: "#333" }}
                      ></i>
                    </button>
                    <div className="container">



                      <div className="row">

                        <div className="col-md-8 pt-3">
                          <div className="d-flex align-items-center mb-4">
                            <img
                              src={Img2}
                              alt="Candidate Profile"
                              className="me-3 imgCandidate"
                              style={{
                                width: "120px",
                                height: "120px",
                                borderRadius: "50%",
                                border: "4px solid #f0f0f0",
                              }}
                            />
                            <div>
                              <h2 className="mb-1" style={{ color: "#2c3e50", textAlign: "start" }}>
                                {userData.name}
                              </h2>
                              <p className="text-muted" style={{ textAlign: "start" }}>
                                {userData.profession} · {userData.location} ·{" "}
                                {userData.availability}
                              </p>
                            </div>
                          </div>
                          <h4
                            style={{
                              color: "#2c3e50",
                              marginBottom: "15px",
                              textAlign: "start"
                            }}
                          >
                            BIOGRAPHY
                          </h4>
                          <p style={{ lineHeight: "1.8", color: "#7f8c8d", textAlign: "start" }}>
                            {userData.about}
                          </p>
                          <hr />
                          <h4
                            style={{
                              color: "#2c3e50",
                              marginBottom: "15px",
                              textAlign: "start"
                            }}
                          >
                            COVER LETTER
                          </h4>
                          <p style={{ lineHeight: "1.8", color: "#7f8c8d", textAlign: "start" }}>
                            {userData.cover_letter}
                          </p>
                          <hr />

                        </div>

                        <div className="col-md-4 pt-1 " style={{ paddingBottom: '20px' }}>
                          <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
                            {/* Send Email Button */}
                            <button
                              style={{
                                background: "#0077B5",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                // padding: "10px 15px",
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                cursor: "pointer",

                              }}
                              onClick={() => alert("Send Email Clicked")}
                            >
                              <i
                                className="fi fi-rr-envelope"
                                style={{ fontSize: "16px" }}
                              ></i>{" "}
                              Send Mail
                            </button>

                            {/* Save Icon */}
                            <button
                              className="btn btn-light me-2 p-3 rounded border d-flex align-items-center justify-content-center linksBtn"

                              onClick={() => handleSaveJob(userData.id)} // On button click, save the job
                            >
                              <i
                                className={`fi ${savedJobs.includes(userData.id) ? 'fi-sr-star' : 'fi-rr-star'}`}
                                style={{ color: "#0a65cc" }}
                              ></i>
                            </button>
                          </div>
                          {/* Download the CV */}
                          <div
                            className="p-3 mb-4 rounded"
                            style={{
                              background: "#f7f9fb",
                              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                              marginBottom: "15px"
                            }}
                          >
                            <h5 style={{ color: "#2c3e50" }}>

                              Download My Resume
                            </h5>
                            <div className="row">
                              <i
                                className="col  me-1  fas fa-file-pdf"
                                style={{ fontSize: "6rem", color: "#ffffff" }}
                              ></i>
                              <div className="col me-5 p-3">
                                <div className="row">
                                  <p className=" text-muted"> {userData.name}</p>
                                  <strong>PDF</strong>
                                </div>
                              </div>
                              {/* Button with dynamic download icon */}
                              <a
                                href={userData.CV} // Replace with the actual path to your CV file
                                download={userData.CV} // Optional: Set the default filename for the download
                                // className="col btn btn-light me-2 p-3 rounded border d-flex align-items-center justify-content-center "
                                style={{
                                  backgroundColor: "#C7DBF2",

                                  color: "#0a65cc",
                                  textDecoration: "none",
                                  borderRadius: "5px",
                                  display: "inline-block",
                                  marginTop: "10px"
                                }}
                              >
                                <i
                                  className='fi fi-rr-download'
                                  style={{ fontSize: "1.5rem" }}
                                ></i>
                              </a>
                            </div>
                          </div>



                          {/* Contact Information */}
                          <div
                            className="p-3 mb-4 rounded"
                            style={{
                              background: "#f7f9fb",
                              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                              marginBottom: "15px"
                            }}
                          >
                            <h5 style={{ color: "#2c3e50" }}>
                              Contact Information
                            </h5>
                            <div className="d-flex align-items-start mb-3" style={{ marginBottom: "5px" }}>
                            <i className="fi fi-rr-envelope" style={{ color: "#0a65cc", fontSize: "1.5rem" }}></i>
                              <div>
                                <strong className="text-dark">Email:</strong>{" "}
                                <span className="text-muted">{userData.email}</span>
                              </div>
                            </div>
                            <div className="d-flex align-items-start mb-3" style={{ marginBottom: "5px" }}>
                              <i className="fi fi-rr-phone-flip me-3" style={{ color: "#0a65cc", fontSize: "1.5rem" }}></i>
                              <div>
                                <strong className="text-dark">Phone:</strong>{" "}
                                <span className="text-muted">{userData.phone}</span>
                              </div>
                            </div>


                          </div>

                          {/* Candidate Details */}
                          <div
                            className="p-3 rounded"
                            style={{
                              background: "#f7f9fb",
                              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                            }}
                          >
                            <h5 style={{ color: "#2c3e50", marginBottom: "15px" }}>
                              Candidate Details
                            </h5>
                            <div className="d-flex align-items-start mb-3" style={{ marginBottom: "15px" }}>
                              <i
                                className="fi fi-rs-briefcase me-3"
                                style={{ color: "#0a65cc", fontSize: "1.5rem" }}
                              ></i>
                              <div>
                                <strong className="text-dark">Profession:</strong>{" "}
                                <span className="text-muted">{userData.profession}</span>
                              </div>
                            </div>
                            <div className="d-flex align-items-start mb-3">
                              <i
                                className="fi fi-rs-briefcase me-3"
                                style={{ color: "#0a65cc", fontSize: "1.5rem" }}
                              ></i>
                              <div>
                                <strong className="text-dark">Experience:</strong>{" "}
                                <span className="text-muted">{userData.experience}</span>
                              </div>
                            </div>

                            <div className="d-flex align-items-start mb-3" style={{ marginBottom: "15px" }}>
                              <i
                                className="fi fi-rs-clock me-3"
                                style={{ color: "#0a65cc", fontSize: "1.5rem" }}
                              ></i>
                              <div>
                                <strong className="text-dark">Years of Experience:</strong>{" "}
                                <span className="text-muted">{userData.yearsExperience}</span>
                              </div>
                            </div>

                            <div className="d-flex align-items-start mb-3" style={{ marginBottom: "15px" }}>
                              <i
                                className="fi fi-rs-graduation-cap me-3"
                                style={{ color: "#0a65cc", fontSize: "1.5rem" }}
                              ></i>
                              <div>
                                <strong className="text-dark">Education:</strong>{" "}
                                <span className="text-muted">{userData.education}</span>
                              </div>
                            </div>


                          </div>

                          {/* Social Media Links */}
                          <div className="bg-light p-3 mb-3 social-media-icons rounded">
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
                          {/* <div
                            className="social-media-icons"
                            style={{
                              marginTop: "20px",
                              display: "flex",
                              gap: "15px",
                              justifyContent: "center",
                            }}
                          >
                            <a href={userData.linkedIn} target="_blank" rel="noopener noreferrer">
                              <FaLinkedin size={24} color="#0077B5" />
                            </a>
                            <a href={userData.website} target="_blank" rel="noopener noreferrer">
                              <FaGlobe size={24} color="#4CAF50" />
                            </a>
                          </div> */}
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
  