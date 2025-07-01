import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import { useEmail } from "../EmailProvider"


// Composant réutilisable pour les champs de saisie
function InputField({ label, type, placeholder, value, onChange, required = false }) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        type={type}
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

// Composant réutilisable pour le téléversement de fichiers
function FileUploader({ img, setImg, importtext }) {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      {img ? (
        <div className="bg-dark img-container">
          <img src={img} alt="Preview" width="100" />
          <button className="close-Img" onClick={() => setImg("")}>
            <i className="fi fi-rr-cross-small"></i>
          </button>
        </div>
      ) : (
        <div>
          <p>{importtext}</p>
        </div>
      )}
      <div className="mt-3">
        <input type="file" className="form-control" onChange={handleImageChange} />
      </div>
    </div>



  );
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [img, setImg] = useState("");
  const [cv, setCv] = useState("");

  const [candidate, setCandidate] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  // const email = location.state?.email;
  // const email = "htimenzay3@gmail.com"
  const email = sessionStorage.getItem('email') || {};


  useEffect(() => {
    if (email) {
      fetch(`http://localhost:8080/api/candidate/findByEmail?email=${email}`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Candidate not found");
          }
          return response.json();
        })
        .then(data => setCandidate(data))
        .catch(err => setError(err.message));
    }
  }, [email]);

  const handleUpdate = (e, updatedCandidate) => {
    e.preventDefault();
    fetch(`http://localhost:8080/api/candidate/updateByEmail?email=${email}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCandidate),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to update candidate.");
        }
        return response.json();
      })
      .then(data => {
        alert("Candidate updated successfully.");
        setCandidate(data);  // Update the candidate state with the new data
      })
      .catch(err => {
        alert(`Error: ${err.message}`);
      });
  };


  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!candidate) {
    return <div>Loading...</div>;
  }

  const tabs = [
    { key: "profile", label: "Personal Info", icon: "bi bi-person-circle" },
    { key: "personal", label: "Professional Info", icon: "bi bi-person-lines-fill" },
    { key: "account-setting", label: "Account Settings", icon: "bi bi-gear" },
  ];

  // Fonction de rendu des contenus des onglets
  const renderContent = () => {
    const contentMap = {
      profile: (
        <div className="card p-4 mb-4">
          <h5>Personal Information</h5>
          <form onSubmit={(e) => handleUpdate(e, candidate)}>
            <div className="row mb-3">
              <div className="col-md-3">
                <label className="form-label">Profile Picture</label>
                <div className="d-flex justify-content-center align-items-center mt-3">
                  <div
                    className="border border-dashed rounded p-4 text-center"
                    style={{ width: "350px", height: "150px" }}
                  >
                    <i className="bi bi-cloud-upload" style={{ fontSize: "30px", color: "#888" }}></i>
                    <FileUploader img={img} setImg={setImg} importtext="Upload Your Image" />
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="row">
                  <div className="col-md-6">
                    <InputField
                      label="First Name"
                      type="text"
                      placeholder="First Name.."
                      value={candidate?.firstname || ''}
                      onChange={(e) => setCandidate(prev => ({ ...prev, firstname: e.target.value }))}
                    />
                  </div>
                  <div className="col-md-6">
                    <InputField
                      label="Last Name"
                      type="text"
                      placeholder="Last Name..."
                      value={candidate.lastname || ''}
                      onChange={(e) => setCandidate(prev => ({ ...prev, lastname: e.target.value }))}
                    />
                  </div>
                  <div className="col-md-6">
                    <InputField
                      label="Date Of Birth"
                      type="date"
                      value={candidate?.dateOfBirth || ''}
                      onChange={(e) => setCandidate(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                    />
                  </div>
                  <div className="col-md-6">
                    <InputField
                      className="form-input-control"
                      type="tel"
                      placeholder="06/07 0000 0000"
                      value={candidate?.phoneNumber || ''}
                      onChange={(e) => setCandidate(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Gender</label>
                    <div className="d-flex align-items-center">
                      <div className="form-check me-3">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="male"
                          name="sex"
                          value="Male"
                          checked={candidate?.gender === 'Male'}
                          onChange={(e) => setCandidate(prev => ({ ...prev, gender: e.target.value }))}
                        />
                        <label className="form-check-label" htmlFor="male">Male</label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="female"
                          name="sex"
                          value="Female"
                          checked={candidate?.gender === 'Female'}
                          onChange={(e) => setCandidate(prev => ({ ...prev, gender: e.target.value }))}
                        />
                        <label className="form-check-label" htmlFor="female">Female</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="blue-btn" style={{ float: "right" }}>
              Save Update
            </button>
          </form>

        </div>
      ),
      personal: (
        <div className="card p-4 mb-4">
          <h5>Professional Information</h5>
          <form onSubmit={(e) => handleUpdate(e, candidate)}>
            <div className="row mb-3">
              <div>
                <span>Biography</span>
                <textarea
                  className="form-control mb-3 mt-2"
                  name="bio"
                  placeholder="Biography"
                  value={candidate?.bio || ''}
                  onChange={(e) => setCandidate(prev => ({ ...prev, bio: e.target.value }))}
                ></textarea>
              </div>
              <div className="col-md">
                <FileUploader img={cv} setImg={setCv} importtext="Importer votre CV" />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                <InputField
                  label="Experience"
                  type="text"
                  placeholder="Experience"
                  value={candidate?.experienceYears || ''}
                  onChange={(e) => setCandidate(prev => ({ ...prev, experienceYears: e.target.value }))}
                />
              </div>
              <div className="col-md-4">
                <InputField
                  label="Education"
                  type="text"
                  placeholder="Education"
                  value={candidate?.educationLevel || ''}
                  onChange={(e) => setCandidate(prev => ({ ...prev, educationLevel: e.target.value }))}
                />
              </div>
              <div className="col-md-4">
                <InputField
                  label="Role"
                  type="text"
                  placeholder="Role"
                  value={candidate?.jobTitle || ''}
                  onChange={(e) => setCandidate(prev => ({ ...prev, jobTitle: e.target.value }))}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <InputField
                  label="LinkedIn"
                  type="url"
                  placeholder="LinkedIn URL..."
                  value={candidate?.linkedinUrl || ''}
                  onChange={(e) => setCandidate(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                />
              </div>
              <div className="col-md-6">
                <InputField
                  label="Personal Website"
                  type="url"
                  placeholder="Website URL..."
                  value={candidate?.personalWebsite || ''}
                  onChange={(e) => setCandidate(prev => ({ ...prev, personalWebsite: e.target.value }))}
                />
              </div>
            </div>

            <button type="submit" className="blue-btn" style={{ float: "right" }}>
              Save Update
            </button>
          </form>

        </div>
      ),
      "account-setting": (
        <div className="card p-4 mb-4">
          <h5>Account Settings</h5>
          <form>
            <div className="row mb-3">
              <div className="col-md-6">
                <InputField label="Email" type="text" placeholder="Email" />
              </div>
              <div className="col-md-6">
                <InputField label="Password" type="text" placeholder="Password" />
              </div>
            </div>

            <button type="submit" className="blue-btn" style={{ float: "right" }}>
              Save Update
            </button>
          </form>
        </div>
      ),
    };

    return contentMap[activeTab] || null;
  };

  return (
    <div className="container-fluid main-content">
      <main className="col p-4">
        <h2 className="mb-4">Settings</h2>

        {/* Tabs */}
        <ul className="nav nav-tabs mb-4">
          {tabs.map((tab) => (
            <li className="nav-item" key={tab.key}>
              <button
                className={`nav-link ${activeTab === tab.key ? "active" : ""}`}
                onClick={() => setActiveTab(tab.key)}
              // style={{
              //     display: "flex",
              //     alignItems: "center",
              //     justifyContent: "center",
              //     padding: "10px 20px",
              //     borderRadius: "8px",
              //     border: "none",
              //     backgroundColor: activeTab === tab.key ? "#007bff" : "#f8f9fa",
              //     color: activeTab === tab.key ? "#fff" : "#6c757d",
              //     fontWeight: activeTab === tab.key ? "bold" : "normal",
              //     cursor: "pointer",
              //     transition: "all 0.3s ease",
              //     marginRight: "10px",
              //   }}
              >
                <i className={tab.icon} style={{ marginRight: "8px" }}></i>
                {tab.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Content */}
        {renderContent()}
      </main>
    </div>
  );
}
