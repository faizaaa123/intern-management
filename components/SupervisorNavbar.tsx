import React from 'react'
import Link from 'next/link'
import navBarStyles from "../styles/navBar.module.css"
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
const SuperVisorNavbar = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="/supervisorDashboard">Supervisor Dashboard</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="./supervisorCalendar">Calendar</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="./interns">Interns</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="./supervisorProfile">Profile</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

    </div>
  )
}

export default SuperVisorNavbar;
