import React from 'react';
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer class="page-footer font-small special-color-dark pt-4">
      <div class="container">
        <div class="row">
          <div class="col text-center">
            <Link className="logo-link" to='/'>
              <img className="card-img-top logo-small" src="images/logo.png" alt="small logo" />
            </Link>
            <p>Free and Open-Source (MIT)</p>
            <p>Current turtleDB Version: 1.0.0</p>
          </div>
        </div>
      </div>
  </footer>
  )
}

export default Footer;
