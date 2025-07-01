import React from "react";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../../styles/entreprise.css'

const VerificationPage = () => {


  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      
        <div className="d-flex justify-content-center align-items-center mb-4 icon">
        <i className="fi fi-rr-check-double"></i>
        </div>
        <h3>🎉Congratulation, You profile is 100% complete!</h3>
        <p className="text-muted text-center">Your information is being verified...</p>
        {/* <p className="text-muted text-center">Your compte is verified, Welcome to JobMate</p> */}
        <div>
        <Link to='../Entreprise/overview'>  

          <button className="white-btn me-2">
            View Dashboard
          </button>
          </Link>
          <Link to='../Entreprise/post-job'>  
          <button className="blue-btn ms-2"> 
            Post Job
            <i className="fi fi-rr-arrow-right mx-2 justify-content-center"></i>
          </button>
          </Link>
        </div>
      </div>
  
  );
};

export default VerificationPage;
