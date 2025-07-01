import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import '../../styles/entreprise.css'
import Logo from '../../components/logo'

export default function MultiStepForm() {
  const [activeTab, setActiveTab] = useState("companyInfo");
  const navigate = useNavigate();
  const email = sessionStorage.getItem('email') || {} ;
  console.log(email)

   const [formData, setFormData] = useState({
      companyName: "",
      companyLogo: "",
      companyDescription: "",
      organisationType: "",
      industryType: "",
      teamSize: "",
      yearOfEstablishment: "",
      websiteUrl: "",
      linkedinUrl: ""
    });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      companyLogo: file.name, // Update to handle file upload properly if needed
    }));
  };

  const handleSubmit = () => {
    fetch(`http://localhost:8080/api/recruiter/updateByEmail?email=${email}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        console.log(response + formData.organisationType)
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to update recruiter');
        }
      })
      .then((data) => {
        alert('Recruiter updated successfully!');
        navigate("/Entreprise/verification");
      })
      .catch((error) => {
        console.error('Error updating recruiter:', error);
        alert('Failed to update recruiter.');
      });
  };


  return (
    <div className="container mt-4">
      <Logo />
      <div className="card mt-4 d-flex justify-content-center">
        <div className="card-body">
          <ul className="nav NavLine">
            <li
              className={`nav-item ${activeTab === "companyInfo" ? "NavDes" : "NavDisabled"}`}
              onClick={() => handleTabChange("companyInfo")}>
              <button
                className={`nav-link ${activeTab === "companyInfo" ? "active" : ""}`}
                onClick={() => handleTabChange("companyInfo")}

              >
                Company Info
              </button>
            </li>
            <li className={`nav-item ${activeTab === "foundingInfo" ? "NavDes" : "NavDisabled"}`}
              onClick={() => handleTabChange("foundingInfo")}>
              <button
                className={`nav-link ${activeTab === "foundingInfo" ? "active" : ""}`}
                onClick={() => handleTabChange("foundingInfo")}
              >
                Founding Info
              </button>
            </li>
            <li className={`nav-item ${activeTab === "socialMediaProfile" ? "NavDes" : "NavDisabled"}`}
              onClick={() => handleTabChange("socialMediaProfile")}>
              <button
                className={`nav-link ${activeTab === "socialMediaProfile" ? "active" : ""}`}
                onClick={() => handleTabChange("socialMediaProfile")}
              >
                Social Media Profile
              </button>
            </li>
          </ul>

          <div className="tab-content mt-4">
            {activeTab === "companyInfo" && (
              <div>
                <h6 className="my-4" >Company Information</h6>
                <form>
                  {/* Company Info Form */}
                  <div className="mb-3">
                    <div className="row g-3">
                      <div className="col-md-3">
                        <label className="form-label">Logo</label>

                        <div className="border p-3 text-center rounded h-75">
                          <label htmlFor="logoUpload" className="form-label">
                            <strong>Upload Logo</strong>
                          </label>
                          <input type="file" className="form-control" id="logoUpload" onChange={handleFileChange}/>
                          <small className="text-muted d-block mt-2">
                            Max size: 5MB | JPG, PNG
                          </small>
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="mb-3">
                          <label htmlFor="companyName" className="form-label">
                            Company Name
                          </label>
                          <input
                          type="text"
                          className="form-control w-75"
                          id="companyName"
                          placeholder="Enter company name"
                          value={formData.companyName}
                          onChange={handleInputChange}
                        />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="aboutUs" className="form-label">
                            About Us
                          </label>
                          <textarea
                          className="form-control"
                          id="companyDescription"
                          rows="4"
                          placeholder="Write about your company here..."
                          value={formData.companyDescription}
                          onChange={handleInputChange}
                        ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>


                  <button
                      type="button"
                      className="blue-btn"
                      onClick={() => handleTabChange("foundingInfo")}
                    >
                      Save & Next
                      <i className="fi fi-rr-arrow-right mx-2 justify-content-center"></i>

                    </button>
                </form>
              </div>
            )}

            {activeTab === "foundingInfo" && (
              <div>
                <h6 className="my-4">Founding Info</h6>
                <form>
                  {/* Founding Info Form */}
                  <div className="mb-3">
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label htmlFor="organisationType" className="form-label">Organization Type</label>
                        <input
                          type="text"
                          className="form-control"
                          id="organisationType"
                          placeholder="Select..."
                          value={formData.organisationType}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="industryType" className="form-label">
                            Industry Type
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="industryType"
                            placeholder="Select..."
                            value={formData.industryType}
                          onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="teamSize" className="form-label">
                            Team Size
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="teamSize"
                            placeholder="Select..."
                            value={formData.teamSize}
                          onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row g-3">
                      <div className="col-md-4">
                        <label htmlFor="yearOfEstablishment" className="form-label">Year Of Establishment</label>
                        <input
                          type="text"
                          className="form-control"
                          id="yearOfEstablishment"
                          value={formData.yearOfEstablishment}
                          onChange={handleInputChange}
                        />
                      </div>

                    </div>

                    
                  </div>
                  {/* (Form Elements) */}
                  <button
                      type="button"
                      className="gray-btn me-4"
                      onClick={() => handleTabChange("companyInfo")}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      className="blue-btn"
                      onClick={() => handleTabChange("socialMediaProfile")}
                    >
                      Save & Next
                      <i className="fi fi-rr-arrow-right mx-2 justify-content-center"></i>
                    </button>
                </form>
              </div>
            )}

            {activeTab === "socialMediaProfile" && (
              <div>
                <h6>Social Media Profile</h6>
                <form>
                  {/* Social Media Profile Form */}
                  <div className="row g-3">
                      <div className="col-md-4">
                        <label htmlFor="websiteUrl" className="form-label">Company Website</label>
                        <input
                          type="text"
                          className="form-control"
                          id="websiteUrl"
                          placeholder="Website url..."
                          value={formData.websiteUrl}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="linkedinUrl" className="form-label">
                            Company LinkedIn 
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="linkedinUrl"
                            placeholder="LinkedIn url..."
                            value={formData.linkedinUrl}
                          onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  {/* (Form Elements) */}
                  <button
                      type="button"
                      className="gray-btn me-4"
                      onClick={() => handleTabChange("foundingInfo")}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      className="blue-btn"
                      onClick={handleSubmit}
                    >
                      Finish Editing
                      <i className="fi fi-rr-arrow-right mx-2 justify-content-center"></i>
                    </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

