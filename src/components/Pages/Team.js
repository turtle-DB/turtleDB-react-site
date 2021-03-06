import React from 'react';

import { SocialIcon } from 'react-social-icons';


export const Team = () => {
  return (
    <div className='container mt-5'>
      <h2 className="text-center mb-4 team-header">The Team</h2>
      <div className="row">

        <div className="col-xs-12 col-md-4">
          <div className="card text-center">
            <div className="card-header">
              <h5 className="card-title">
                <a href="https://rockdinosaur.github.io" target="_blank">Steven Shen</a>
              </h5>
            </div>
            <a href="https://rockdinosaur.github.io" target="_blank">
              <img className="card-img-top portrait rounded" src="images/steven.png" alt="Steven Shen" />
            </a>
            <div className="card-body">
              <p className="card-text">Software Developer (Toronto, Canada)</p>
              <ul className="list-inline">
                <li className="list-inline-item"><SocialIcon url="https://www.linkedin.com/in/steeveshen/" /></li>
                <li className="list-inline-item"><SocialIcon url="https://github.com/rockdinosaur" /></li>
                <li className="list-inline-item"><SocialIcon url="https://rockdinosaur.github.io" network="email" /></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-xs-12 col-md-4">
          <div className="card text-center">
            <div className="card-header">
              <h5 className="card-title">
                <a href="https://maxiappleton.github.io/" target="_blank">Max Appleton</a>
              </h5>
            </div>
            <a href="https://maxiappleton.github.io/" target="_blank">
              <img className="card-img-top portrait rounded" src="images/max.png" alt="Max Appleton" />
            </a>
            <div className="card-body">
              <p className="card-text">Software Developer (San Francisco, USA)</p>
              <ul className="list-inline">
                <li className="list-inline-item"><SocialIcon url="https://www.linkedin.com/in/max-appleton/" /></li>
                <li className="list-inline-item"><SocialIcon url="https://github.com/maxiappleton" /></li>
                <li className="list-inline-item"><SocialIcon url="https://maxiappleton.github.io/" network="email" /></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-xs-12 col-md-4">
          <div className="card text-center">
            <div className="card-header">
              <h5 className="card-title">
                <a href="https://houstonfloyd.github.io/" target="_blank">Andrew Houston-Floyd</a>
              </h5>
            </div>
            <a href="https://houstonfloyd.github.io/" target="_blank">
              <img className="card-img-top portrait andrew" src="images/andrew.png" alt="Andrew Houston-Floyd" />
            </a>
            <div className="card-body">
              <p className="card-text">Software Developer (New York City, USA)</p>
              <ul className="list-inline">
                <li className="list-inline-item"><SocialIcon url="https://www.linkedin.com/in/andrew-houston-floyd" /></li>
                <li className="list-inline-item"><SocialIcon url="https://github.com/houstonfloyd" /></li>
                <li className="list-inline-item"><SocialIcon url="https://houstonfloyd.github.io/" network="email" /></li>
              </ul>
            </div>
          </div>
        </div>

      </div>
      <div className="row team-questions">
        <div className="col">
          <h2>Questions?</h2>
          <p>
            Feel free to reach out to us if you have any questions about the project.
          </p>
          <p>
            All three members of the the turtleDB team are currently open to new opportunities so if
            you think we’d be a good fit for your team, we’d love to hear from you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Team;
