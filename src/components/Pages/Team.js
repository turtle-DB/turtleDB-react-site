import React from 'react';

import { SocialIcon } from 'react-social-icons';


export const Team = () => {
  return (
    <div className='container'>
      <h2 className="text-center">The Team</h2>
      <div className="row">

        <div className="col-xs-12 col-md-4">
          <div className="card text-center">
            <div className="card-header">
              <h5 className="card-title">Steven Shen</h5>
            </div>
            <img className="card-img-top portrait rounded" src="images/steven.png" alt="Steven Shen"/>
            <div className="card-body">
              <p class="card-text">Software Engineer (Toronto, Canada)</p>
              <ul className="list-inline">
                <li className="list-inline-item"><SocialIcon url="https://www.linkedin.com/in/steeveshen/" /></li>
                <li className="list-inline-item"><SocialIcon url="https://github.com/rockdinosaur" /></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-xs-12 col-md-4">
          <div className="card text-center">
            <div className="card-header">
              <h5 className="card-title">Max Appleton</h5>
            </div>
            <img className="card-img-top portrait rounded" src="images/max.png" alt="Max Appleton"/>
            <div className="card-body">
              <p class="card-text">Software Engineer (San Francisco, USA)</p>
              <ul className="list-inline">
                <li className="list-inline-item"><SocialIcon url="https://www.linkedin.com/in/max-appleton/" /></li>
                <li className="list-inline-item"><SocialIcon url="https://github.com/maxiappleton" /></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-xs-12 col-md-4">
          <div className="card text-center">
            <div className="card-header">
              <h5 className="card-title">Andrew Houston-Floyd</h5>
            </div>
            <img className="card-img-top portrait rounded" src="images/andrew.png" alt="Andrew Houston-Floyd"/>
            <div className="card-body">
              <p class="card-text">Software Engineer (New York City, USA)</p>
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
