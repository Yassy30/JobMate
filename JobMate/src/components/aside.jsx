import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Aside = () => {
  return (
    <div className="d-flex">
      <nav className="sidebar d-flex flex-column p-3" style={{ height: '100vh', backgroundColor: '#f8f9fa', borderRight: '1px solid #dee2e6' }}>
        <a href="#" className="d-flex align-items-center mb-3 text-decoration-none">
          <span className="fs-4 fw-bold">B Sidebar</span>
        </a>
        <hr />
        <ul className="nav flex-column mb-auto">
          <li className="nav-item">
            <a href="#" className="nav-link active" style={{ backgroundColor: '#0d6efd', color: 'white' }}>
              <i className="bi bi-house"></i> Home
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-dark">
              <i className="bi bi-speedometer2"></i> Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-dark">
              <i className="bi bi-table"></i> Orders
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-dark">
              <i className="bi bi-grid"></i> Products
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-dark">
              <i className="bi bi-person"></i> Customers
            </a>
          </li>
        </ul>
        <div className="profile d-flex align-items-center mt-auto p-3" style={{ borderTop: '1px solid #dee2e6' }}>
          <img
            src="https://via.placeholder.com/40"
            alt="User Profile"
            className="rounded-circle"
            style={{ width: '40px', height: '40px' }}
          />
          <div className="ms-2">
            <span>mdo</span>
            <i className="bi bi-caret-down-fill ms-1"></i>
          </div>
        </div>
      </nav>
      <div className="content p-4">
        {/* Main content here */}
        <h1>Welcome to the Sidebar</h1>
      </div>
    </div>
  );
};

export default Aside;
