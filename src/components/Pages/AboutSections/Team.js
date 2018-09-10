import React from 'react';
import { SocialIcon } from 'react-social-icons';

const Team = () => {
  return (
    <div>
      <h2 id="team">The turtleDB Team</h2>
      <p>
        turtleDB was made by a team of three developers who wanted to expand
        and popularize the world of offline-first applications. We also happen
        to be looking for new work opportunities - please don’t hesitate to
        reach out if we seem like a good fit for your team!
      </p>
      <div className='container mt-5'>
        <div className="row intro-team">

          <div className="intro-card col-xs-12 col-md-4">
            <div className="card text-center">
              <a className="photo-link" href="https://rockdinosaur.github.io" target="_blank">
                <h5 className="card-title">Steven Shen</h5>
                <img className="card-img-top portrait rounded" src="images/steven.png" alt="Steven Shen" />
              </a>
              <div className="card-body">
                <p className="card-text text-center">Toronto, Canada</p>
                <ul className="list-inline">
                  <li className="list-inline-item intro-si"><SocialIcon url="https://www.linkedin.com/in/steeveshen/" /></li>
                  <li className="list-inline-item intro-si"><SocialIcon url="https://github.com/rockdinosaur" /></li>
                  <li className="list-inline-item intro-si"><SocialIcon url="https://rockdinosaur.github.io" network="email" /></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="intro-card col-xs-12 col-md-4">
            <div className="card text-center">
              <a className="photo-link" href="https://maxiappleton.github.io/" target="_blank">
                <h5 className="card-title">Max Appleton</h5>
                <img className="card-img-top portrait rounded" src="images/max.png" alt="Max Appleton" />
              </a>
              <div className="card-body">
                <p className="card-text text-center">San Francisco, USA</p>
                <ul className="list-inline">
                  <li className="list-inline-item intro-si"><SocialIcon url="https://www.linkedin.com/in/max-appleton/" /></li>
                  <li className="list-inline-item intro-si"><SocialIcon url="https://github.com/maxiappleton" /></li>
                  <li className="list-inline-item intro-si"><SocialIcon url="https://maxiappleton.github.io" network="email" /></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="intro-card col-xs-12 col-md-4">
            <div className="card text-center">
              <a className="photo-link" href="https://houstonfloyd.github.io/" target="_blank">
                <h5 className="card-title">Andrew Houston-Floyd</h5>
                <img className="card-img-top portrait andrew" src="images/andrew.png" alt="Andrew Houston-Floyd" />
              </a>
              <div className="card-body">
                <p className="card-text text-center">New York, USA</p>
                <ul className="list-inline">
                  <li className="list-inline-item intro-si"><SocialIcon url="https://www.linkedin.com/in/andrew-houston-floyd" /></li>
                  <li className="list-inline-item intro-si"><SocialIcon url="https://github.com/houstonfloyd" /></li>
                  <li className="list-inline-item intro-si"><SocialIcon url="https://houstonfloyd.github.io" network="email" /></li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Team;
