import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginImage from '../assets/images/login.jpeg';
import Logo from '../components/logo';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json(); // Assuming the backend returns the user role and email
        if (data.role === 'CANDIDATE') {
          sessionStorage.setItem('email', data.email); // Now storing email in sessionStorage
          navigate('/Candidate/overview');
        } else if (data.role === 'RECRUITER') {
          sessionStorage.setItem('email', data.email); // Storing email for recruiters too
          navigate('/Entreprise/overview');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };
  

  

  return (
    <div className="container-fluid full-height m-0 p-0">
      <div className="row w-100 m-0 p-0">
        {/* Left Side: Form */}
        <div className="col-md-6 form-container bg-white p-3">
          <Logo />
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="container w-75">
              <h2>Sign in to your account.</h2>
              <p>
                Don't have an account yet?{' '}
                <a href="/signup" className="login">
                  Sign Up
                </a>
              </p>
              {error && <p className="text-danger">{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-check mb-3">
                  <input type="checkbox" className="form-check-input" id="rememberMe" />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-3">
                  Log In
                  <i className="fa-solid fa-arrow-right ms-2"></i>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="col-md-6 image-container p-0">
          <img
            src={LoginImage}
            alt="Jobpilot"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
