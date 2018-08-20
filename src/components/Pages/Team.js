import React from 'react';

import { SocialIcon } from 'react-social-icons';


export const Team = () => {
  return (
    <div className='container mt-5'>
      <h2 className="text-center mb-5">The Team</h2>
      <div className="row">

        <div className="col-xs-12 col-md-4">
          <div className="card text-center">
            <div className="card-header">
              <h5 className="card-title">
                <a href="https://rockdinosaur.github.io">Steven Shen</a>
              </h5>
            </div>
            <a href="https://rockdinosaur.github.io">
              <img className="card-img-top portrait rounded" src="images/steven.png" alt="Steven Shen"/>
            </a>
            <div className="card-body">
              <p className="card-text">Software Engineer (Toronto, Canada)</p>
              <ul className="list-inline">
                <li className="list-inline-item"><SocialIcon url="https://www.linkedin.com/in/steeveshen/" /></li>
                <li className="list-inline-item"><SocialIcon url="https://github.com/rockdinosaur" /></li>
                <li className="list-inline-item"><SocialIcon url="https://rockdinosaur.github.io" network="email"/></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-xs-12 col-md-4">
          <div className="card text-center">
            <div className="card-header">
              <h5 className="card-title">
                <a href="https://maxiappleton.github.io/">Max Appleton</a>
              </h5>
            </div>
            <a href="https://maxiappleton.github.io/">
              <img className="card-img-top portrait rounded" src="images/max.png" alt="Max Appleton"/>
            </a>
            <div className="card-body">
              <p className="card-text">Software Engineer (San Francisco, USA)</p>
              <ul className="list-inline">
                <li className="list-inline-item"><SocialIcon url="https://www.linkedin.com/in/max-appleton/" /></li>
                <li className="list-inline-item"><SocialIcon url="https://github.com/maxiappleton" /></li>
                <li className="list-inline-item"><SocialIcon url="https://maxiappleton.github.io/" network="email"/></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-xs-12 col-md-4">
          <div className="card text-center">
            <div className="card-header">
              <h5 className="card-title">
                <a href="https://maxiappleton.github.io/">Andrew Houston-Floyd</a>
              </h5>
            </div>
            <img className="card-img-top portrait" src="images/andrew.png" alt="Andrew Houston-Floyd" />
            <div className="card-body">
              <p className="card-text">Software Engineer (New York City, USA)</p>
              <ul className="list-inline">
                <li className="list-inline-item"><SocialIcon url="https://www.linkedin.com/in/andrew-houston-floyd" /></li>
                <li className="list-inline-item"><SocialIcon url="https://github.com/houstonfloyd" /></li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Team;
