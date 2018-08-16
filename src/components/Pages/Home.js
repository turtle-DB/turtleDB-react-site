import React from 'react';

export const Home = () => {
  return (
    <div className="text-center">
      <div className="jumbotron jumbotron-fluid pb-3 mb-0">
        <div className='container'>
          <h1 className="display-4">
            <img className="card-img-top w-75" src="images/logo_full.png" alt="turtleDB" />
          </h1>
          <p className="lead">An open source promise-based wrapper for IndexedDB with syncing and conflict resolution.</p>
          <hr className="my-4"></hr>
          <div className="download-links d-flex justify-content-around">
            <div className="turtle-links">
              <p><span className="font-weight-bold">turtleDB</span> for the front-end:</p>
              <div className="link-buttons d-flex flex-wrap justify-content-center">
                <a className="btn btn-success btn-lg" href="#" role="button"><i className="fas fa-download"></i></a>
                <a className="btn btn-danger btn-lg icon-link" href="#"><i className="fab fa-npm fa-2x"></i></a>
                <a className="btn btn-light btn-lg icon-link" href="#"><i className="fab fa-github fa-2x"></i></a>
              </div>
            </div>
            <div className="tortoise-links">
              <p><span className="font-weight-bold">tortoiseDB</span> for the back-end:</p>
              <div className="link-buttons d-flex flex-wrap justify-content-center">
                <a className="btn btn-success btn-lg" href="#" role="button"><i className="fas fa-download"></i></a>
                <a className="btn btn-danger btn-lg icon-link" href="#"><i className="fab fa-npm fa-2x"></i></a>
                <a className="btn btn-light btn-lg icon-link" href="#"><i className="fab fa-github fa-2x"></i></a>
              </div>
              <p className="subtext">Currently supported back-end databases: MongoDB</p>
            </div>
          </div>
          <hr className="my-4"></hr>
          <div className="learn-more">
            <p>Learn More</p>
            <i className="fa fa-chevron-down fa-2x" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="about d-flex justify-content-center">
          <p>Testing</p>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-4">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Offline-First</h5>
              </div>
              <img className="card-img-top center" src="images/1.png" alt="Offline-First" />
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
              <img className="card-img-top center" src="images/2.png" alt="Synchronization" />
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
              <img className="card-img-top center" src="images/3.png" alt="Conflict Resolution" />
              <div className="card-body">
                <p className="card-text">Multiple people can work on the same document without overwriting each other's changes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
