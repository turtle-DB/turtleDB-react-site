import React from 'react';
import Footer from './../Footer';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Home = () => {
  return (
    <div className="text-center">
      <div className="jumbotron jumbotron-fluid pb-3 mb-0">
        <div className='container'>
          <h1 className="display-4">
            <img className="card-img-top w-75" src="images/logo_full.png" alt="turtleDB" />
          </h1>
          <p className="lead">A JavaScript framework and in-browser database adapter for building offline-first, collaborative web apps.</p>
          <hr className="my-4"></hr>
          <div className="download-links d-flex justify-content-around">
            <div className="turtle-links">
              <p><span className="font-weight-bold">turtleDB</span> for the front-end:</p>
              <div className="link-buttons d-flex flex-wrap justify-content-center">
                <a className="btn btn-danger btn-lg icon-link" href="https://www.npmjs.com/package/turtledb" target="_blank">
                  <FontAwesomeIcon icon={['fab', 'npm']} size="2x" />
                </a>
                <a className="btn btn-success btn-lg" href="https://unpkg.com/turtledb@1.0.1/dist/turtleDB.min.js" role="button" target="_blank">
                  <FontAwesomeIcon icon='download' />
                </a>
                <a className="btn btn-light btn-lg icon-link" href="https://github.com/turtle-DB/turtleDB" target="_blank">
                  <FontAwesomeIcon icon={['fab', 'github']} size="2x" />
                </a>
              </div>
            </div>
            <div className="tortoise-links">
              <p><span className="font-weight-bold">tortoiseDB</span> for the back-end:</p>
              <div className="link-buttons d-flex flex-wrap justify-content-center">
                <a className="btn btn-danger btn-lg icon-link" href="https://www.npmjs.com/package/tortoisedb" target="_blank">
                  <FontAwesomeIcon icon={['fab', 'npm']} size="2x" />
                </a>
                <a className="btn btn-success btn-lg" href="https://unpkg.com/tortoisedb@1.0.0/dist/tortoiseDB.min.js" role="button" target="_blank">
                  <FontAwesomeIcon icon='download' />
                </a>
                <a className="btn btn-light btn-lg icon-link" href="https://github.com/turtle-DB/tortoiseDB" target="_blank">
                  <FontAwesomeIcon icon={['fab', 'github']} size="2x" />
                </a>
              </div>
              <p className="subtext">Currently supported back-end databases: MongoDB</p>
            </div>
          </div>
          <hr className="my-4"></hr>
          <div className="learn-more">
            <p>Learn More</p>
            <FontAwesomeIcon icon="chevron-down" size="2x" />
          </div>
        </div>
      </div>
      <div className="section home-about">
        <div className="d-flex justify-content-center text-center">
          <blockquote>
            <p>turtleDB is a framework for developers to build offline-first, collaborative web apps.
              It provides a user-friendly API for developers, empowering them with the ability to create apps
              with in-browser storage, effective server synchronization, document versioning, and flexible conflict
              resolution for any document data.
              </p>
            <p>
              Web applications will work seamlessly online or offline, and developers can leave the backend to turtleDB -
              it will handle all data synchronization and conflict resolution between users. Works with MongoDB out of the box!
            </p>
            <p id="lastHomePara">
              Curious about how we built this framework? We wrote about the entire process and engineering challenges here:
            </p>
          </blockquote>
        </div>
        <p className="center">
          <Link className="nav-link" to='/about'>
            <button className="btn btn-success btn-lg" href="#">Read More Here</button>
          </Link>
        </p>
      </div>

      <div className="section cards">
        <div className="container">
          <hr className="my-4"></hr>
          <div className="row">
            <div className="col-xs-12 col-md-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Offline-First</h5>
                </div>
                <img className="card-img-top center card-image" src="images/1.png" alt="Offline-First" />
                <div className="card-body">
                  <p className="card-text">Queries are made to your local in-browser storage first.</p>
                </div>
              </div>
            </div>

            <div className="col-xs-12 col-md-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Synchronization</h5>
                </div>
                <img className="card-img-top center card-image" src="images/2.png" alt="Synchronization" />
                <div className="card-body">
                  <p className="card-text">Syncs your data to the back-end when you have internet.</p>
                </div>
              </div>
            </div>

            <div className="col-xs-12 col-md-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Conflict Resolution</h5>
                </div>
                <img className="card-img-top center card-image" src="images/3.png" alt="Conflict Resolution" />
                <div className="card-body">
                  <p className="card-text">Multiple people can work on the same document without overwriting each other's changes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
