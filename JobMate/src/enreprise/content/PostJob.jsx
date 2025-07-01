import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/candidate.css";

export default function PostJob() {
  const [jobTitle, setJobTitle] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [category, setCategory] = useState("");
  const [employmentType, setEmploymentType] = useState("Internship"); // Default is Internship
  const [jobDescription, setJobDescription] = useState("");
  const [requirements, setRequirements] = useState([]);
  const [currentRequirement, setCurrentRequirement] = useState("");
  const [benefits, setBenefits] = useState([]);
  const [currentBenefit, setCurrentBenefit] = useState("");
  const currentDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

  const jobTypeOptions =
    employmentType === "Internship"
      ? ["Paid Internship", "Unpaid Internship", "Remote Internship"]
      : ["Remote", "Hybrid", "On_Site", "Full_Time", "Part_Time"];

  const addRequirement = () => {
    if (currentRequirement.trim() !== "") {
      setRequirements([...requirements, currentRequirement.trim()]);
      setCurrentRequirement("");
    }
  };

  const addBenefit = () => {
    if (currentBenefit.trim() !== "") {
      setBenefits([...benefits, currentBenefit.trim()]);
      setCurrentBenefit("");
    }
  };

  const handleSubmit = async () => {
    const email = sessionStorage.getItem('email'); // Retrieve the recruiter's email from session storage
    if (!email) {
      alert("User not logged in. Please log in first.");
      return;
    }

    const jobData = {
      title: jobTitle,
      company: "CompanyName", // Replace with dynamic company name if available
      location: location,
      subType: jobType.toUpperCase(),
      type: employmentType.toUpperCase(),
      category: category,
      minSalary: parseFloat(minSalary),
      maxSalary: parseFloat(maxSalary),
      description: jobDescription,
      postedDate: currentDate,
      expirationDate: "2024-12-31", // Set a default expiration date or allow user input
      requirements: requirements.join(", "), // Convert array to string
      benefits: benefits.join(", "), // Convert array to string
      experience: experience,
      education: education,
      companyWebsite: "https://yourcompany.com", // Replace with dynamic data if available
      linkedInUrl: "https://linkedin.com/company/yourcompany", // Replace with dynamic data if available
      email, // Recruiter's email
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/api/jobs/post?email=${email}`,
        jobData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        alert("Job posted successfully!");
        window.location.href = "/Entreprise/my-jobs"; // Redirect to "My Jobs" page
      }
    } catch (error) {
      console.error("Error posting job:", error);
      const errorMessage =
        error.response?.data || "Failed to post the job. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <div className="container-fluid main-content">
      <h5 className="m-3">Post a Job</h5>

      {/* Job Details */}
      <div className="row mt-4">
        <h6>Job Title</h6>
        <div className="col-5">
          <div className="mb-3">
            <label htmlFor="jobTitle" className="form-label">
              Job Title
            </label>
            <input
              type="text"
              className="form-control"
              id="jobTitle"
              placeholder="Add job title, role, etc."
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="col-7">
          <div className="mb-3">
            <label htmlFor="jobKey" className="form-label">
              Tags
            </label>
            <input
              type="text"
              className="form-control"
              id="jobKey"
              placeholder="Job keyword, tags, etc."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Education and Experience */}
      <div className="row mt-3">
        <h6>Qualifications</h6>
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="education" className="form-label">
              Education
            </label>
            <input
              type="text"
              className="form-control"
              id="education"
              placeholder="e.g., Bachelor's Degree"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="experience" className="form-label">
              Experience
            </label>
            <input
              type="text"
              className="form-control"
              id="experience"
              placeholder="e.g., +3 years"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Salary */}
       <div className="row mt-3">
         <h6>Salary</h6>
         <div className="col-md-6">
           <div className="mb-3">
             <label htmlFor="minSalary" className="form-label">
              Min Salary <span className="text-muted">(monthly Salary)</span>
            </label>
            <div className="input-group">
               <input
                type="text"
                className="form-control"
                id="minSalary"
                placeholder="Minimum Salary..."
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
              />
              <button className="dhBtn" type="button" disabled>
                DH
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="maxSalary" className="form-label">
              Max Salary <span className="text-muted">(monthly Salary)</span>
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="maxSalary"
                placeholder="Maximum Salary..."
                value={maxSalary}
                onChange={(e) => setMaxSalary(e.target.value)}
              />
              <button className="dhBtn" type="button" disabled>
                DH
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="row mt-3 city">
        <h6>Location</h6>
        <div className="col">
          <select
            className="form-select"
            id="city"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="" disabled>
              Choose the City
            </option>
            <option value="City1">City1</option>
            <option value="City2">City2</option>
            <option value="City3">City3</option>
          </select>
        </div>
      </div>


      <div className="row mt-4">
        <div className="col">
          <h6>Type of Employment</h6>
          <div className="col mt-4">
            {["Internship", "Job"].map((type) => (
              <span
                key={type}
                className={`${employmentType === type ? "TypeBgSelected" : "TypeBg"
                  } me-3 mt-2`}
                onClick={() => setEmploymentType(type)}
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className="col">
          <h6>Job Type</h6>
          <div className="col mt-4">
            {jobTypeOptions.map((type) => (
              <span
                key={type}
                className={`${jobType === type ? "TypeBgSelected" : "TypeBg"
                  } me-3 mt-2`}
                onClick={() => setJobType(type)}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* About Job */}
      <div className="row mt-4">
        <h6>About Job</h6>
        <div className="col-md-12 mb-3">
          <label htmlFor="jobDesc" className="form-label">
            Job Description
          </label>
          <textarea
            className="form-control"
            id="jobDesc"
            rows="4"
            placeholder="Add your job description ..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="col-md-12 mb-3">
          <label htmlFor="jobReq" className="form-label">
            Job Requirements
          </label>
          <div className="d-flex mb-2">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Enter a requirement"
              value={currentRequirement}
              onChange={(e) => setCurrentRequirement(e.target.value)}
            />
            <button className="white-btn" onClick={addRequirement}>
              <i className="fi fi-br-plus"></i>
            </button>
          </div>
          <ul className="list-group">
            {requirements.map((req, index) => (
              <li key={index} className="list-group-item">
                {req}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-12 mb-3">
          <label htmlFor="jobBenefits" className="form-label">
            Job Benefits
          </label>
          <div className="d-flex mb-2">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Enter a benefit"
              value={currentBenefit}
              onChange={(e) => setCurrentBenefit(e.target.value)}
            />
            <button className="white-btn" onClick={addBenefit}>
              <i className="fi fi-br-plus"></i>
            </button>
          </div>
          <ul className="list-group">
            {benefits.map((benefit, index) => (
              <li key={index} className="list-group-item">
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Submit Button */}
      <button className="blue-btn" onClick={handleSubmit}>
        Post Job
        <i className="fi fi-rr-arrow-right mx-2 justify-content-center"></i>
      </button>
    </div>
  );
}

