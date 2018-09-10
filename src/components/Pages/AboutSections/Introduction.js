import React from 'react';
import Citation from '../../Citation'
import { SocialIcon } from 'react-social-icons';

const Introduction = () => {
  return (
    <div>
      <h2 id='introduction'>Introduction</h2>

      <h3 id="what-is-turtledb">What is turtleDB?</h3>
      <p>
        turtleDB is a JavaScript framework and in-browser database adapter for building offline-first, collaborative web applications. Leveraging the in-browser IndexedDB database, it allows developers to manage document data client-side and have offline-ready capabilities without installing any additional software, and offers back-end integration with MongoDB (via a second package, tortoiseDB) to enable bi-directional synchronization and multi-client collaboration.
      </p>

      <p>
      Building such a framework presents several challenges. The first is creating a developer-friendly API and adapter for in-browser storage technologies, which is made difficult by working with an event-driven browser API and asynchronous JavaScript. The second is enabling collaboration between offline clients, which can be handled by versioning data to track document histories. This in turn requires an array-based tree structure and related algorithms, and shapes the implementation of in-browser storage and backend synchronization. For turtleDB, all of these components - in-browser storage adapter, history trees, and synchronization protocol - were crafted from scratch.
      </p>

      <p>This article will explore what offline-first applications are, working with in-browser storage, the justification for tracking document history, and one approach to synchronizing data and resolving conflicts between all clients and a server.
      </p>

      <h3 id="what-is-offline-first">What is Offline-First?</h3>
      <p>
        “Offline-first” is a design choice that allows web applications to remain functional even in cases where there is no internet connection. Ideally, users of an offline-first application don’t notice any difference in their experience in an online vs an offline scenario.
      </p>
      <p>
      Compared to offline-first, most apps fall under the traditional client-server model.
      </p>

      <div className="img-container">
        <img className="img-style" src="../images/intro/client-server.png" />
      </div>


      <p>
      All assets and data are held on the server and in order to access them, clients must make repeated requests over the network.
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

      <h4 id="offline-first-architecture">Offline-First Architecture</h4>
      <p>
      In an offline-first approach, clients are not reliant on having a persistent internet connection. They take on a larger share of the application logic and data storage:
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

      <h3 id="offline-first-challenges">Offline-First Challenges</h3>
      <p>
        An offline-first approach to building web applications is very doable,
        but certain challenges arise depending on the nature of the app.
      </p>

      <div className="img-container">
        <img className="img-style" src="../images/intro/offline-spectrum.png" />
      </div>

      <p>
        This table outlines the difficulty in converting various types of web applications to be offline-first. The challenges posed by the offline-first model primarily depend on the features of the application - all of the following are present for the ‘Hard’ category:
      </p>
      <ul>
        <li>
          Data - any data required by the application needs to be stored on the client for offline functionality. The challenge increases as the amount and velocity of data grows. Client-side storage needs to provide comparable performance to server-side calls.
        </li>
        <li>
          Server-side persistence - Simple offline apps will only store data on the client, but larger apps will want to persist data or receive updates from a server. In these cases, a synchronization protocol is needed to share changes between the client and server.
        </li>
        <li>
          Collaboration - If the offline-first application features multiple clients sharing access to the same data, then the synchronization protocol needs to share changes across the network. The challenge increases if conflicting changes need to be visible and prevent lost work.
        </li>
      </ul>

      <h3 id="design-goals">turtleDB Design</h3>
      <p>
      Given these challenges, any effective solution that enables developers to equip more complex, document-based applications to be offline-ready with client-side storage, synchronization and conflict resolution should have the following features:
      </p>
      <ul>
        <li>
          An adapter for in-browser storage to persist and access large amounts of data while offline
        </li>
        <li>
          A backend storage solution and performant client-server synchronization protocol
        </li>
        <li>
          An elegant solution for collaborative apps that would make conflicting work visible and traceable
        </li>
        <li>
          A simple API that would enable developers to adapt their existing projects
        </li>
      </ul>

      <h4 id="introducing-turtledb">turtleDB Architecture</h4>

      <div className="img-container">
        <img className="img-style" src="../images/intro/turtleDB-architecture.png" />
      </div>

      <p>
      With these design goals, we came up with a conceptual architecture for turtleDB, as seen in the above diagram. At a high level, turtleDB is composed of two parts.
      </p>
      <p>
        The client-side piece has the adapter for in-browser storage and a developer API. Developers add this package to their web applications, and replace their backend code with calls to turtleDB - requests for data go through turtleDB to in-browser storage, rather than across a network to a server.
      </p>
      <p>
        A second package, tortoiseDB, operates on a remote server. It serves as an adapter for a NoSQL document database (MongoDB), and handles synchronization requests from clients running turtleDB. Changes from each client are eventually shared with all others.
      </p>
      <p>
        In this design, the first challenge is the client-side storage adapter.
      </p>
    </div>
  )
}

export default Introduction;
