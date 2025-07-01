import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom"; 
import '../../styles/candidate.css';
import Img2 from '../../assets/images/apple.jpg';

export default function JobSave() {
    // State to hold saved jobs
    const [savedJobs, setSavedJobs] = useState([]);

    // Fetch saved jobs from localStorage on component mount
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("savedJobs")) || [];
        setSavedJobs(saved);
    }, []);

    // Handler to remove job from saved jobs
    const handleUnsaveJob = (jobId) => {
        const updatedJobs = savedJobs.filter((job) => job.id !== jobId);
        setSavedJobs(updatedJobs);

        // Update localStorage
        localStorage.setItem("savedJobs", JSON.stringify(updatedJobs));
    };

    return (
        <div className="container-fluid table-responsive main-content">
            <h5 className='m-3'>
                Favorite Jobs <span className='small text-secondary'>({savedJobs.length})</span>
            </h5>
            <table className="table">
                <tbody>
                    {savedJobs.map((job) => (
                        <tr key={job.id}>
                            <td>
                                <div className="d-flex align-items-center">
                                    <img src={Img2} style={{ width: '50px' }} alt="logo" className="me-3 rounded" />
                                    <div>
                                        <strong className='h5'>{job.title}</strong>
                                        <span className="badge bg-label-primary medium ms-2 mt-2">{job.type}</span>
                                        <div className="text-muted small pt-1">
                                            <i className="fi fi-rs-marker text-muted small"></i> {job.location}
                                            <i className="fi fi-rr-dollar text-muted small ps-2"></i> {job.minSalary}DH-{job.maxSalary}DH/month
                                        </div>
                                    </div>
                                </div>
                            </td>

                            <td className="text-center align-middle">
                                <button
                                    className="btn btn-light me-2 p-3 rounded border d-flex align-items-center justify-content-center linksBtn"
                                    onClick={() => handleUnsaveJob(job.id)} // Remove job from the saved list
                                >
                                    <i className="fi fi-sr-bookmark" style={{ color: "#0a65cc" }}></i>
                                </button>
                            </td>

                            <td className="text-center align-middle">
                                <span className="pt-5">
                                    {job.status === "Active" ? (
                                        <button className="appliedBtn py-2 px-3">
                                            <NavLink
                                                to="/Candidate/job-alert/post"
                                                className={({ isActive }) =>
                                                    `p-0 nav-link ${isActive ? "active" : ""}`
                                                }
                                            >
                                                Applied Now <i className="fi fi-rr-arrow-right px-2"></i>

                                            </NavLink>
                                        </button>

                                    ) : (
                                        <button className="ExpiredBtn py-2 px-3">Deadline Expired</button>
                                    )}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
