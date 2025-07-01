import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { EmailProvider } from './candidate/EmailProvider';
import Navbar from "./components/navbar";
import Home from "./Authentification/Home";
import SignUp from "./Authentification/Signup";
import Login from "./Authentification/Login";
import './styles/home.css';
import Candidate from "./candidate/candidate";
import Overview from "./candidate/content/overview";
import JobAlert from "./candidate/content/jobAlert";
import JobList from "./candidate/content/JobList";
import JobSave from "./candidate/content/jobSave";
import Settings from "./candidate/content/settings";
import Post from "./candidate/content/post";
import SignIn from './enreprise/components_entreprise/Sigin'
import VerficationPage from './enreprise/components_entreprise/verificationPage'
import Entreprise from './enreprise/enreprise'
import OverviewEnr from './enreprise/content/overview'
import MyJobs from './enreprise/content/myJobs'
import SavedCandidate from './enreprise/content/candidateSaved'
import PostJob from './enreprise/content/PostJob'
import SettingsEnr from './enreprise/content/settings'
import Applications from './enreprise/content/applications'

// import Overview from "./enreprise/content/overview";


const App = () => {
  return (
    <div className="main">
      {/* <EmailProvider> */}
        <Router>
          <Routes>
            {/* Route principale */}
            <Route path="/" element={
              <div className="home">
                <Navbar />
                <Home />
              </div>
            } />

            {/* Routes d'authentification */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

            {/* Route pour le candidat */}
            <Route path="/Candidate" element={<Candidate />}>
              {/* Routes imbriquées pour le candidat */}
              <Route index element={<Overview />} />
              <Route path="overview" element={<Overview />} />
              <Route path="job-alert" element={<JobAlert />} />
              <Route path="applied-jobs" element={<JobList />} />
              <Route path="saved-jobs" element={<JobSave />} />
              <Route path="settings" element={<Settings />} />
              <Route path="job-alert/post" element={<Post />} />
            </Route>

            <Route path="/Entreprise/SignIn" element={<SignIn />} />
            <Route path="/Entreprise/verification" element={<VerficationPage />} />
            <Route path="/Entreprise" element={<Entreprise />} >
              <Route index element={<OverviewEnr />} />
              <Route path="overview" element={<OverviewEnr />} />
              <Route path="post-job" element={<PostJob />} />
              <Route path="my-jobs" element={<MyJobs />} />
              <Route path="saved-candidates" element={<SavedCandidate />} />
              <Route path="settings" element={<SettingsEnr />} />
              <Route path="my-jobs/applications" element={<Applications />} />
              <Route path="my-jobs/details" element={<Post />} />
            </Route>
          </Routes>
        </Router>
      {/* </EmailProvider> */}
    </div>
  );
};

export default App;
