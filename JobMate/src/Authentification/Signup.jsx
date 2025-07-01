import React, { useState } from 'react';
import LoginImage from '../assets/images/login.jpeg';
import Logo from '../components/logo';
import { useNavigate, Link } from 'react-router-dom';
// import { useEmail } from "../candidate/EmailProvider"

const Signup = () => {
  const [accountType, setAccountType] = useState('Candidate');
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState(''); // New state for email error
  const navigate = useNavigate();

  const email = sessionStorage.getItem('email');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear errors as user types
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
    if (name === 'email') {
      setEmailError('');
    }
  };

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      alert('You must agree to the Terms of Service.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    if (accountType === 'Candidate') {
      try {
        const response = await fetch('http://localhost:8080/api/users/signup/candidate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            firstname: formData.firstname,
            lastname: formData.lastname,
          }),
        });

        if (response.ok) {
          if (response.ok) {
            // Store the email in sessionStorage
            sessionStorage.setItem('email', formData.email);
            console.log(formData.email)
            navigate('/Candidate/overview');  // No need to pass email in state
          }
          // navigate('/Candidate/overview', { state: { email: formData.email} });
        } else {
          const errorData = await response.json();
          if (errorData.message && errorData.message.toLowerCase().includes('email')) {
            setEmailError('This email is already in use.');
          } else {
            alert(`Error: ${errorData.message || 'Something went wrong.'}`);
          }
        }
      } catch (error) {
        alert('Failed to register candidate. Please try again.');
      }
    }
    if (accountType === 'Entreprise') {
      try {
        const response = await fetch('http://localhost:8080/api/users/signup/recruiter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });
    
        if (response.ok) {
          sessionStorage.setItem('email', formData.email);
          console.log(formData.email)
          navigate('/Entreprise/signIn', { state: { email: formData.email } });
        } else {
          alert('Failed to register entreprise.');
        }
      } catch (error) {
        alert('Failed to register entreprise. Please try again.');
      }
    }
    
  };

  return (
    <div className="container-fluid full-height m-0 p-0">
      <div className="row w-100 m-0 p-0">
        <div className="col-md-6 form-container bg-white p-3">
          <Logo />
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="container w-75">
              <h2>Create account.</h2>
              <p>
                Already have an account?{' '}
                <Link to="/login" className="login">
                  Log In
                </Link>
              </p>
              <div className="d-flex flex-column align-items-center mb-4 p-2 rounded bg-light">
                <p className="text-secondary fw-bold">CREATE ACCOUNT AS A</p>
                <div className="btn-group w-100" role="group">
                  <button
                    className={`btn ${accountType === 'Candidate' ? 'btn-primary' : 'btn-light'} me-2 w-50 rounded`}
                    onClick={() => setAccountType('Candidate')}
                  >
                    <i className="fa-regular fa-circle-user me-2"></i>
                    Candidate
                  </button>
                  <button
                    className={`btn ${accountType === 'Entreprise' ? 'btn-primary' : 'btn-light'} w-50 rounded`}
                    onClick={() => setAccountType('Entreprise')}
                  >
                    <i className="fa-regular fa-building me-2"></i>
                    Entreprise
                  </button>
                </div>
              </div>
              <form onSubmit={handleFormSubmit}>
                {accountType === 'Candidate' && (
                  <div className="mb-3 d-flex">
                    <input
                      className="form-control w-50 me-2"
                      type="text"
                      name="firstname"
                      placeholder="First Name"
                      value={formData.firstname}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      className="form-control w-50"
                      type="text"
                      name="lastname"
                      placeholder="Last Name"
                      value={formData.lastname}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )}
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  {emailError && (
                    <span className="text-danger small">{emailError}</span>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  {passwordError && (
                    <span className="text-danger small">{passwordError}</span>
                  )}
                </div>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="termsCheck"
                    checked={termsAccepted}
                    onChange={handleTermsChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="termsCheck">
                    I’ve read and agree with your Terms of Services
                  </label>
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-3">
                  {accountType === 'Candidate' ? 'Create Account' : 'Complete Your Profile'}
                  <i className="fa-solid fa-arrow-right ms-2"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6 image-container p-0 m-0">
          <img src={LoginImage} alt="Jobpilot" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
    </div>
  );
};

export default Signup;
