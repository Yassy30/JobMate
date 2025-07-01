// import React, { useState } from 'react';
// import img from '../../assets/images/profile.jpg';



// const JobApplications = () => {
//   const [isLightBoxVisible, setLightBoxVisible] = useState(false);
//   const [selectedApp, setSelectedApp] = useState(null);
//   const [applications, setApplications] = useState(jobApplications);

//   const handleOpenLightBox = (app) => {
//     setSelectedApp(app);
//     setLightBoxVisible(true);
//   };

//   const handleCloseLightBox = () => {
//     setLightBoxVisible(false);
//     setSelectedApp(null);
//   };

//   const toggleStar = (id) => {
//     setApplications(applications.map(app => 
//       app.id === id ? { ...app, isStarred: !app.isStarred } : app
//     ));
//     if (selectedApp && selectedApp.id === id) {
//       setSelectedApp(prevApp => ({ ...prevApp, isStarred: !prevApp.isStarred }));
//     }
//   };

//   return (
//     <div className="container mt-5 pt-4">
//       <h5 className="mb-4">Job Applications ({applications.length})</h5>

//       {/* Lightbox Modal */}
//       {isLightBoxVisible && selectedApp && (
//         <div className="lightbox-overlay" style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: 'rgba(0, 0, 0, 0.5)',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           zIndex: 9999,
//         }}>
//           <div className="lightbox-content" style={{
//             backgroundColor: 'white',
//             padding: '20px',
//             borderRadius: '8px',
//             width: '400px',
//             maxWidth: '90%',
//           }}>
//             <h4>{selectedApp.name}</h4>
//             <p>Role: {selectedApp.role}</p>
//             <p>Experience: {selectedApp.experience}</p>
//             <p>Education: {selectedApp.education}</p>
//             <p>Applied: {selectedApp.appliedDate}</p>
//             <button
//               className="btn btn-light me-2 p-3 rounded border d-flex align-items-center justify-content-center linksBtn p-0 mx-1"
//               onClick={() => toggleStar(selectedApp.id)}
//             >
//               <i
//                 className={`fi ${selectedApp.isStarred ? 'fi-sr-star' : 'fi-rr-star'}`}
//                 style={{ color: "#0a65cc" }}
//               ></i>
//             </button>
//             <a href={selectedApp.cvLink} className="blue-btn text-decoration-none me-3">Download CV</a>
//             <button onClick={handleCloseLightBox} className="gray-btn mt-2">Close</button>
//           </div>
//         </div>
//       )}

//       <div className="row g-4 bg-light p-2 mt-0">
//         {applications.map((app) => (
//           <div key={app.id} className="col-lg-3 col-md-4 col-sm-6 d-flex">
//             <div className="card shadow-sm border-0 w-100">
//               <div className="card-body d-flex pb-1">
//                 <img
//                   src={img} // Use the app's photo or fallback to the default
//                   alt={`${app.name}'s photo`}
//                   className="rounded-circle me-3"
//                   style={{ width: '45px', height: '45px', objectFit: 'cover' }}
//                   onClick={() => handleOpenLightBox(app)}
//                 />
//                 <div className="w-100" onClick={() => handleOpenLightBox(app)}>
//                   <h6 className="card-title mb-1">{app.name}</h6>
//                   <p className="text-muted small mb-2">{app.role}</p>
//                 </div>
                
//                 <button
//                   className="btn btn-light me-2 p-3 rounded border d-flex align-items-center justify-content-center linksBtn p-0 mx-1"
//                   onClick={() => toggleStar(app.id)}
//                 >
//                   <i
//                     className={`fi ${app.isStarred ? 'fi-sr-star' : 'fi-rr-star'}`}
//                     style={{ color: "#0a65cc" }}
//                   ></i>
//                 </button>

//               </div>
//               <hr className="m-1 p-1" />
//               <div className="mx-auto mb-2 mt-0">
//                 <ul className="list-styled small mb-2">
//                   <li>{app.experience}</li>
//                   <li>Education: {app.education}</li>
//                   <li>Applied: {app.appliedDate}</li>
//                 </ul>
//                 <a
//                   href={app.cvLink}
//                   className="btn btn-link ps-3 text-primary text-decoration-none small"
//                 >
//                   <i className="fi fi-br-download me-2" style={{ fontSize: '16px' }}></i>
//                   Download CV
//                 </a>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default JobApplications;
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Axios for HTTP requests
import img from '../../assets/images/profile.jpg';

const JobApplications = ({ jobId }) => {
  const [isLightBoxVisible, setLightBoxVisible] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch job applications for the specific job ID
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/applications/candidates?jobId=1`, {
          params: { jobId },
        });
        setApplications(
          response.data.map((app) => ({
            id: app.id,
            name: `${app.firstname} `, // Combine first and last name
            role: app.title,
            experience: app.experience || "N/A", // Default to "N/A" if not provided
            education: app.education || "N/A", // Default to "N/A" if not provided
            appliedDate: app.appliedDate,
            cvLink: app.resumePath, // Link to the CV
            isStarred: false, // Default value
          }))
        );
      } catch (error) {
        console.error('Error fetching job applications:', error);
        setApplications([]); // Fallback to an empty array on error
      }
    };

    fetchApplications();
  }, [jobId]);

  const handleOpenLightBox = (app) => {
    setSelectedApp(app);
    setLightBoxVisible(true);
  };

  const handleCloseLightBox = () => {
    setLightBoxVisible(false);
    setSelectedApp(null);
  };

  const toggleStar = (id) => {
    setApplications((applications) =>
      applications.map((app) =>
        app.id === id ? { ...app, isStarred: !app.isStarred } : app
      )
    );
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp((prevApp) => ({ ...prevApp, isStarred: !prevApp.isStarred }));
    }
  };

  return (
    <div className="container mt-5 pt-4">
      <h5 className="mb-4">Job Applications ({applications.length})</h5>

      {/* Lightbox Modal */}
      {isLightBoxVisible && selectedApp && (
        <div
          className="lightbox-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <div
            className="lightbox-content"
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '400px',
              maxWidth: '90%',
            }}
          >
            <h4>{selectedApp.name}</h4>
            <p>Role: {selectedApp.role}</p>
            <p>Experience: {selectedApp.experience}</p>
            <p>Education: {selectedApp.education}</p>
            <p>Applied: {selectedApp.appliedDate}</p>
            <button
              className="btn btn-light me-2 p-3 rounded border d-flex align-items-center justify-content-center linksBtn p-0 mx-1"
              onClick={() => toggleStar(selectedApp.id)}
            >
              <i
                className={`fi ${selectedApp.isStarred ? 'fi-sr-star' : 'fi-rr-star'}`}
                style={{ color: '#0a65cc' }}
              ></i>
            </button>
            <a href={selectedApp.cvLink} className="blue-btn text-decoration-none me-3">
              Download CV
            </a>
            <button onClick={handleCloseLightBox} className="gray-btn mt-2">
              Close
            </button>
          </div>
        </div>
      )}

      <div className="row g-4 bg-light p-2 mt-0">
        {applications.map((app) => (
          <div key={app.id} className="col-lg-3 col-md-4 col-sm-6 d-flex">
            <div className="card shadow-sm border-0 w-100">
              <div className="card-body d-flex pb-1">
                <img
                  src={img}
                  alt={`${app.name}'s photo`}
                  className="rounded-circle me-3"
                  style={{ width: '45px', height: '45px', objectFit: 'cover' }}
                  onClick={() => handleOpenLightBox(app)}
                />
                <div className="w-100" onClick={() => handleOpenLightBox(app)}>
                  <h6 className="card-title mb-1">{app.name}</h6>
                  <p className="text-muted small mb-2">{app.role}</p>
                </div>
                <button
                  className="btn btn-light me-2 p-3 rounded border d-flex align-items-center justify-content-center linksBtn p-0 mx-1"
                  onClick={() => toggleStar(app.id)}
                >
                  <i
                    className={`fi ${app.isStarred ? 'fi-sr-star' : 'fi-rr-star'}`}
                    style={{ color: '#0a65cc' }}
                  ></i>
                </button>
              </div>
              <hr className="m-1 p-1" />
              <div className="mx-auto mb-2 mt-0">
                <ul className="list-styled small mb-2">
                  <li>{app.experience}</li>
                  <li>Education: {app.education}</li>
                  <li>Applied: {app.appliedDate}</li>
                </ul>
                <a
                  href={app.cvLink}
                  className="btn btn-link ps-3 text-primary text-decoration-none small"
                >
                  <i className="fi fi-br-download me-2" style={{ fontSize: '16px' }}></i>
                  Download CV
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobApplications;
