import React from 'react';
import Citation from '../../Citation'
import { SocialIcon } from 'react-social-icons';


const Introduction = () => {
  return (
    <div>
      <h2 id='introduction'>Introduction</h2>
      <p>
        This is the story of how we built turtleDB - a framework for creating offline-first,
        collaborative web applications. We wanted to empower developers with the ability to
        create collaborative apps that are fully functional even when offline.
      </p>
      <h2 id="meet-the-team">The Team Behind turtleDB</h2>
      <div className='container mt-5'>
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

      <h3 id="what-is-offline-first">What is "offline-first"?</h3>
      <p>
        “Offline-first” is a design choice that allows web applications to
        remain functional even in cases where there is no internet connection.
        Ideally, users of an offline-first application wouldn’t notice any difference
        in their experience in an online to offline scenario.
      </p>
      <p>
        Most apps fall under the traditional client-server model.
      </p>

      <img className="w-100" src="../images/intro/client-server.png" />

      <p>
        All assets and data are held on the server and in order to access them,
        clients must make repeated requests over the network.
      </p>
      <p>
        Although this is what we are typically used to, there are some pretty significant
        drawbacks to this approach. The most significant one being this scenario:
      </p>

      <img />

      <p>
        The dinosaur game is fun, we’re willing to bet you’d rather have your page load.
      </p>
      <p>
        Of course, this is not the only downside of the traditional model. Clients rely on the server for
        every interaction, making all of the following scenarios hindrances for a web application:
      </p>

      <img></img>

      <p>
        The dinosaur game is fun, we’re willing to bet you’d rather have your page load.
      </p>
      <p>
        Of course, this is not the only downside of the traditional model. Clients fully rely on the server
        for every interaction, making all of the following scenarios a nightmare for a web application:
      </p>
      <ul>
        <li>
          “Lie-fi” - users believe they’re online but the connection is unusable
        </li>
        <li>
          Server bottleneck - an overloaded server forces clients to wait for responses
        </li>
        <li>
          Server downtime - servers inevitably have downtime rendering the web app to be inaccessible
        </li>
        <li>
          Distance - even when connected, an HTTP request-response cycle across the US can take 200-400ms
        </li>
      </ul>

      <h3 id="offline-first-architecture">Offline-First Architecture</h3>
      <p>
        In an offline-first approach, clients are not reliant on having a persistent internet connection.
        They take on a larger share of the application logic and data storage.
      </p>

      <img></img>

      <p>
        In this model, clients store static assets and application data locally, allowing the application
        to be fully usable even without a connection. This provides many benefits:
      </p>
      <ul>
        <li>
          Apps can still be used while offline
        </li>
        <li>
          Data can be queried for much faster because local reads are faster than an HTTP
          request-response cycle
        </li>
        <li>
          Only a subset (delta) of the full dataset can be transmitted instead in an online-offline scenario,
          reducing payload size
        </li>
      </ul>

      <h4 id="challenges-of-offline-first-applications">Challenges of Offline-First Applications</h4>
      <p>
        An offline-first approach to building web applications is very doable but certain challenges arise depending on
        the nature of the app.
      </p>

      <img/>

      <p>
        This table outlines the difficulty in converting various types of web applications to offline-first. Ultimately,
        every offline-first app must address the following questions:
      </p>
      <ul>
        <li>
          Does the app rely on persisting data? Some sort of client-side storage is going to be needed to guard against an
          offline scenario.
        </li>
        <li>
          How data intensive is the app?  Whatever the case may be, the storage on the client-side must be able to handle it.
        </li>
        <li>
          Is this a collaborative app? Will multiple users access and edit the same data?
        </li>
      </ul>

      <h4 id="design-goals">Design Goals</h4>
      <p>
         Taking into consideration client-side storage, synchronization and conflict resolution, we wanted to design a solution that would fulfill
         the following goals:
      </p>
      <ul>
        <li>
          Simplicity - Developers would be able to take their existing projects and easily convert them to be offline-first
        </li>
        <li>
          Flexibility - We would support applications where clients might be offline for extended periods of time
        </li>
        <li>
          Performance - We would maximize the potential of client-side storage to support more data intensive applications
        </li>
      </ul>

      <h3 id="introducing-turtledb">Introducing turtleDB</h3>

      <img/>

      <p>
        turtleDB is a framework that sits between your web application and browser storage on every client.
        This means read queries that normally go directly to the server run through turtleDB first and write queries hit
        the client’s local hard drive before being sent off to the server. For some applications, turtleDB alone is sufficient to provide
        local, persistent storage without requiring any interaction with a back-end server.
      </p>
      <p>
        On the back-end, we introduce tortoiseDB, a server and adapter whose job is to receive queries sent by turtleDB and interface with a MongoDB
        database. Multiple clients running turtleDB can communicate to the same tortoiseDB, enabling collaboration. Bi-directional
        synchronization between all clients and tortoiseDB means changes from each client is shared with others.
      </p>
      <p>
        With an understanding of what turtleDB is intended for, we can begin talking about the first layer of persistence.
      </p>
    </div>
  )
}

export default Introduction;
