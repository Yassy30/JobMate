// import React, { useState } from 'react';
// import '../../styles/entreprise.css';
// import { Link } from "react-router-dom";

// export default function MyJobs() {
//     const initialJobs = [
//         {
//             id: 1,
//             title: "Networking Engineer",
//             jobType: "Remote",
//             applicationsTotal: "123",
//             datePosted: "Feb 2, 2019",
//             status: "Active"
//         },
//         {
//             id: 2,
//             title: "Product Designer",
//             jobType: "Full Time",
//             applicationsTotal: "123",
//             datePosted: "Dec 7, 2019",
//             status: "Expert"
//         }
//     ];

//     const [jobs, setJobs] = useState(initialJobs);

//     const handleMakeExpert = (jobId) => {
//         const updatedJobs = jobs.map((job) => {
//             if (job.id === jobId) {
//                 return { ...job, status: "Expert" }; // Update the status to "Expert"
//             }
//             return job;
//         });
//         setJobs(updatedJobs); // Update the state
//     };

//     return (
//         <div className="container-fluid table-responsive main-content">
//             <h5 className='m-3'>My Jobs <span className='small text-secondary'>({jobs.length})</span></h5>
//             <table className="table">
//                 <thead style={{ backgroundColor: "#e7e8fc" }}>
//                     <tr style={{ backgroundColor: "#e7e8fc" }}>
//                         <th scope="col">JOBS</th>
//                         <th scope="col">STATUS</th>
//                         <th scope="col">APPLICATIONS</th>
//                         <th scope="col" className="text-center">ACTION</th>
//                         <th scope="col"></th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {jobs.map((job) => (
//                         <tr key={job.id}>
//                             <td>
//                                 <div className="d-flex align-items-center">
//                                     <div>
//                                         <strong className='h5'>{job.title}</strong>
//                                         <div className="text-muted small pt-1">
//                                             <i className="fi fi-rr-employee-man text-muted small"></i> {job.jobType}
//                                             <i className="fi fi-rr-calendar text-muted small ps-2"></i> {job.datePosted}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td className="align-middle fw-bold activeJob">
//                                 <span className='pt-5' style={{ color: job.status === "Active" ? "#16b91e" : "#b93416" }}>
//                                     {job.status}
//                                 </span>
//                             </td>
//                             <td className="align-middle fw-bold activeJob">
//                                 <span className='pt-5 text-muted fw-normal'>{job.applicationsTotal} Applications</span>
//                             </td>
//                             <td className="text-center align-middle">
//                                 <Link to={"applications"}>
//                                     <button className="grayBlue-btn">View Applications</button>
//                                 </Link>
//                             </td>
//                             <td className="text-center align-middle">
//                                 <div className="dropdown">
//                                     <button
//                                         type="button"
//                                         className="p-0 dropdown-toggle hide-arrow"
//                                         data-bs-toggle="dropdown"
//                                         aria-expanded="false"
//                                         style={{ background: "white", border: "none" }}
//                                     >
//                                         <i className="fi fi-br-menu-dots-vertical"></i>
//                                     </button>
//                                     <ul className="dropdown-menu">
//                                         <li><Link className="dropdown-item LinkProf" to={"details"}>
//                                             <i className="fi fi-rs-eye align-self-center me-2" style={{ fontSize: "15px" }}></i>
//                                             View Details
//                                         </Link></li>
//                                         <li><a
//                                             className="dropdown-item LinkProf"
//                                             href="#"
//                                             onClick={() => handleMakeExpert(job.id)} // Handle click
//                                         >
//                                             <i className="fi fi-rr-cross-circle align-self-center me-2" style={{ fontSize: "13px" }}></i>
//                                             Make it Expert
//                                         </a></li>
//                                     </ul>
//                                 </div>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }
import React, { useState, useEffect } from 'react';
import '../../styles/entreprise.css';
import { Link } from "react-router-dom";

export default function MyJobs() {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const email = sessionStorage.getItem('email'); // Fetch recruiter's email from session storage
                if (!email) {
                    setError("User not logged in.");
                    return;
                }

                const response = await fetch(`http://localhost:8080/api/jobs/allJobs?email=${email}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch jobs");
                }

                const data = await response.json();
                setJobs(data);
            } catch (err) {
                console.error("Error fetching jobs:", err);
                setError(err.message);
            }
        };

        fetchJobs();
    }, []);

    const handleMakeExpert = (jobId) => {
        const updatedJobs = jobs.map((job) => {
            if (job.id === jobId) {
                return { ...job, status: "Expert" }; // Update the status to "Expert"
            }
            return job;
        });
        setJobs(updatedJobs); // Update the state
    };

    if (error) {
        return <div className="text-center text-danger mt-5">{error}</div>;
    }

    return (
        <div className="container-fluid table-responsive main-content">
            <h5 className='m-3'>My Jobs <span className='small text-secondary'>({jobs.length})</span></h5>
            <table className="table">
                <thead style={{ backgroundColor: "#e7e8fc" }}>
                    <tr style={{ backgroundColor: "#e7e8fc" }}>
                        <th scope="col">JOBS</th>
                        <th scope="col">STATUS</th>
                        <th scope="col">APPLICATIONS</th>
                        <th scope="col" className="text-center">ACTION</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job) => (
                        <tr key={job.id}>
                            <td>
                                <div className="d-flex align-items-center">
                                    <div>
                                        <strong className='h5'>{job.title}</strong>
                                        <div className="text-muted small pt-1">
                                            <i className="fi fi-rr-employee-man text-muted small"></i> {job.jobType}
                                            <i className="fi fi-rr-calendar text-muted small ps-2"></i> {job.datePosted}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="align-middle fw-bold activeJob">
                                <span className='pt-5' style={{ color: job.status === "Active" ? "#b93416" : "#16b91e" }}>
                                    {job.status}
                                </span>
                            </td>
                            <td className="align-middle fw-bold activeJob">
                                <span className='pt-5 text-muted fw-normal'>{job.applicationsTotal} Applications</span>
                            </td>
                            <td className="text-center align-middle">
                                <Link to={"applications"}>
                                    <button className="grayBlue-btn">View Applications</button>
                                </Link>
                            </td>
                            <td className="text-center align-middle">
                                <div className="dropdown">
                                    <button
                                        type="button"
                                        className="p-0 dropdown-toggle hide-arrow"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        style={{ background: "white", border: "none" }}
                                    >
                                        <i className="fi fi-br-menu-dots-vertical"></i>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item LinkProf" to={"details"}>
                                            <i className="fi fi-rs-eye align-self-center me-2" style={{ fontSize: "15px" }}></i>
                                            View Details
                                        </Link></li>
                                        <li><a
                                            className="dropdown-item LinkProf"
                                            href="#"
                                            onClick={() => handleMakeExpert(job.id)} // Handle click
                                        >
                                            <i className="fi fi-rr-cross-circle align-self-center me-2" style={{ fontSize: "13px" }}></i>
                                            Make it Expert
                                        </a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

