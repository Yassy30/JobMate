import React from 'react'
import HomImage from "../assets/images/home.png";

const Home = () => {
  return (
    <div className="container py-0 my-0 main-content">
      <div className="row align-items-center my-5">
        <div className="col-md-6 my-5">
          <h1>
            Find a job or internship that matches your passion and expertise.
          </h1>
          <p>
            Explore countless opportunities tailored to your goals. Build your
            future today with ease and confidence.
          </p>
        </div>
        <div className="col-md-6 text-center my-5">
          <img src={HomImage} alt="Home" className="img-fluid" style={{width : "400px"}} />
        </div>
      </div>

      <div className="row my-4">
        <div className="col-sm-6 col-md-6 col-lg-3 mb-3 infoCard">
          <div className="bg-white border shadow p-2 text-center rounded ">
            <div className="row d-flex justify-content-center align-items-center">
              <div className='col-3 homeIcon rounded d-flex justify-content-center align-items-center'>
                <i className="fa-solid fa-briefcase"></i>
              </div>
              <div className="col-6 ms-2">
                <h5>7,532</h5>
                <p className='text-secondary'>Live Jobs</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-md-6 col-lg-3 mb-3 infoCard">
          <div className="bg-white border shadow p-2 text-center rounded">
            <div className="d-flex justify-content-center align-items-center">
              <div className='col-3 homeIcon rounded d-flex justify-content-center align-items-center' style={{background: '#3d6cff'}}>
                <i className="fa-regular fa-building" style={{color: '#fff'}}></i>
              </div>
              <div className="col-6 ms-2">
                <h5>1,75,324</h5>
                <p>Companies</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-md-6 col-lg-3 mb-3 infoCard">
          <div className="bg-white border shadow p-2 text-center rounded">
            <div className="d-flex justify-content-center align-items-center">
              <div className='col-3 homeIcon rounded d-flex justify-content-center align-items-center'>
              <i className="fa-solid fa-users"></i>
              </div>
              <div className="col-6 ms-2">
                <h5>97,354</h5>
                <p>Candidates</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-md-6 col-lg-3 mb-3 infoCard">
          <div className="bg-white border shadow p-2 text-center rounded">
            <div className="d-flex justify-content-center align-items-center">
              <div className='col-3 homeIcon rounded d-flex justify-content-center align-items-center'>
                <i className="fa-solid fa-briefcase"></i>
              </div>
              <div className="col-6 ms-2">
                <h5>38,47,154</h5>
                <p>New jobs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
