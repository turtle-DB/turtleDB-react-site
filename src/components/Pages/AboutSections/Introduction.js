import React from 'react';
import Citation from '../../Citation'
import { SocialIcon } from 'react-social-icons';

const Introduction = () => {
  return (
    <div>
      <h3 id="what-is-turtledb">What is turtleDB?</h3>
      <p>
        turtleDB is a framework for creating offline-first,
        collaborative web applications. Developers using turtleDB have the ability to
        create collaborative apps that are fully functional even when offline. We are the first
        to have implemented bi-directional synchronization and conflict resolution with MongoDB!
      </p>
      <p>
        turtleDB can be installed as a package to web applications that rely on document style data and
        give them offline-first capabilities. Direct queries to the server are intercepted by turtleDB
        and are passed to your in-browser storage instead.
      </p>

      <p>
        A second package, tortoiseDB, enables server-side storage in MongoDB
        and collaboration for multiple clients.
      </p>



      <h2 id='introduction'>Introduction</h2>

      <h3 id="what-is-offline-first">What is Offline-First?</h3>
      <p>
        “Offline-first” is a design choice that allows web applications to
        remain functional even in cases where there is no internet connection.
        Ideally, users of an offline-first application don’t notice any difference
        in their experience in an online vs an offline scenario.
      </p>
      <p>
        Most apps fall under the traditional client-server model.
      </p>

      <div className="img-container">
        <img className="img-style" src="../images/intro/client-server.png" />
      </div>


      <p>
        All assets and data are held on the server and in order to access them,
        clients must make repeated requests over the network.
      </p>
      <p>
        Although this is what we are typically used to, there are some pretty significant
        drawbacks to this approach. Most obviously, a client could lose their
        connection, and the following would happen:
      </p>

      <div className="img-container">
        <img className="img-style" src="../images/intro/dinosaur-game.png" />
      </div>

      <p>
        Of course, this is not the only downside of the traditional model. Clients rely on the server for
        every interaction, making all of the following scenarios hindrances for a web application:
      </p>

      <ul>
        <li>
          “Lie-fi” - When your device indicates you're connected to the internet but the network is so slow it's practically unusable
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

      <div className="img-container">
        <img className="img-style" src="../images/intro/offline-first.png" />
      </div>

      <p>
        In this model, clients store static assets and application data locally, allowing the application
        to be fully usable even without a connection. This provides many benefits:
      </p>
      <ul>
        <li>
          Apps can still be used while offline.
        </li>
        <li>
          Data can be queried much faster because local reads are faster than an HTTP
          request-response cycle.
        </li>
        <li>
          Only a subset (delta) of the full dataset needs to be transmitted,
          reducing payload size
        </li>
      </ul>

      <h4 id="challenges-of-offline-first-applications">Challenges of Offline-First Applications</h4>
      <p>
        An offline-first approach to building web applications is very doable,
        but certain challenges arise depending on the nature of the app.
      </p>

      <div className="img-container">
        <img className="img-style" src="../images/intro/offline-spectrum.png" />
      </div>

      <p>
        This table outlines the difficulty in converting various types of web applications to be offline-first.
        Ultimately, every offline-first app must address the following questions:
      </p>
      <ul>
        <li>
          Does the app rely on persisting data? Some sort of client-side storage
          is going to be needed to guard against an
          offline scenario.
        </li>
        <li>
          How data intensive is the app?  Whatever the case may be, the storage
          on the client-side must be able to handle it.
        </li>
        <li>
          Is this a collaborative app? Will multiple users access and edit the same data?
        </li>
      </ul>

      <h4 id="design-goals">Design Goals</h4>
      <p>
        Taking into consideration client-side storage, synchronization and conflict resolution,
        we wanted to design a solution that would fulfill the following goals:
      </p>
      <ul>
        <li>
          Simplicity - Developers would be able to take their existing projects
          and easily convert them to be offline-first
        </li>
        <li>
          Flexibility - We would support applications where clients might be
          offline for extended periods of time
        </li>
        <li>
          Performance - We would maximize the potential of client-side storage
          to support more data intensive applications
        </li>
      </ul>

      <h3 id="introducing-turtledb">Introducing turtleDB</h3>

      <div className="img-container">
        <img className="img-style" src="../images/intro/turtleDB-architecture.png" />
      </div>

      <p>
        turtleDB is a framework that sits between your web application and browser storage.
        This means read queries that normally go directly to the server run through turtleDB first. On the flip side, write queries
        are also made to turtleDB and therefore your in-browser storage before being sent off to the server.
        For some applications, turtleDB alone is sufficient to provide local,
        persistent storage without requiring any interaction with a back-end server. This means no additional
        applications have to be installed in order for turtleDB to work.
      </p>
      <p>
        On the back-end, we introduce tortoiseDB, a server and adapter that
        receives queries sent by turtleDB and interfaces with a MongoDB
        database. Multiple clients running turtleDB can communicate to the same
        tortoiseDB, enabling collaboration. Bi-directional synchronization between
        all clients and tortoiseDB means changes from each client is shared with all others.
      </p>
      <p>
        With an understanding of what turtleDB is intended for, we can begin talking about
        client-side persistence.
      </p>
    </div>
  )
}

export default Introduction;
