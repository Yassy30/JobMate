import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom"; 
import '../../styles/candidate.css';
import Img2 from '../../assets/images/apple.jpg';
import { clippingParents } from '@popperjs/core';

export default function JobList() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        const email = sessionStorage.getItem('email');
        console.log(email)
        const fetchAppliedJobs = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/applications/all?email=${email}`);
                if (response.ok) {
                    const data = await response.json();
                    setJobs(data);
                } else {
                    setError("Failed to fetch applied jobs");
                }
            } catch (error) {
                setError("Error fetching applied jobs");
            } finally {
                setLoading(false);
            }
        };

        fetchAppliedJobs();
    }, []);

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-5 text-danger">{error}</div>;
    }

    return (
        <>
            <div className="container-fluid table-responsive main-content">
                <h5 className='m-3'>Applied Jobs <span className='small text-secondary'>({jobs.length})</span></h5>
                <table className="table">
                    <thead style={{ backgroundColor: "#e7e8fc" }}>
                        <tr style={{ backgroundColor: "#e7e8fc" }}>
                            <th scope="col">JOBS</th>
                            <th scope="col">DATE APPLIED</th>
                            <th scope="col">STATUS</th>
                            <th scope="col" className="text-center">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job) => (
                            <tr key={job.id}>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <img src={Img2} style={{ width: '50px' }} alt="logo" className="me-3 rounded" />
                                        <div>
                                            <strong className='h5'>{job.jobTitle}</strong>
                                            <span className="badge bg-label-primary medium ms-2 mt-2">{job.type}</span>
                                            <div className="text-muted small pt-1">
                                                <i className="fi fi-rs-marker text-muted small"></i> {job.location}
                                                <i className="fi fi-rr-dollar text-muted small ps-2"></i> {job.minSalary}DH-{job.maxSalary}DH/month
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className='align-middle'>{job.appliedDate}</td>
                                <td className="align-middle fw-bold activeJob">
                                    <span className='pt-5' style={{ color: job.status === "ACTIVE" ? "#16b91e" : "#b93416" }}>{job.status}</span>
                                </td>
                                <td className="text-center align-middle">
                                    <button className="appliedBtn py-2">
                                        <NavLink
                                            to="/Candidate/job-alert/post"
                                            className={({ isActive }) =>
                                                `p-0 nav-link ${isActive ? "active" : ""}`
                                            }
                                        >
                                            View Details
                                        </NavLink>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
