import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <Link className="nav-link logo-link" to='/'>
        <img className="card-img-top logo-small" src="images/logo.png" alt="small logo" />
      </Link>
      <div className="navbar-collapse collapse w-100 dual-collapse2 order-1 order-md-0">
        <ul className="navbar-nav ml-auto text-center">
          <li className="nav-item">
            <Link className="nav-link" to='/'>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/api'>
              {"API"}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/about'>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/team'>
              Team
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/github'>
              Github
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header;
