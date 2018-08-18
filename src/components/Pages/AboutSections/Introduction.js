import React from 'react';
import Citation from '../../Citation'

const Introduction = () => {
  return (
    <div className="container">
      <h2 id='introduction'>Introduction</h2>
      <p>
        This is the story of how we built turtleDB - a framework for creating offline-first,
        collaborative web applications. We wanted to empower developers with the ability to
        create collaborative apps that are fully functional even when offline.
      </p>
      <h4 id="what-is-offline-first">What is "offline-first"?</h4>
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
        Under the client-server model, all webpages, functionality, and data are held on the server,
        and clients must make repeated requests over the network for every resource.
        Although this is what we’re typically used to, there are some pretty significant drawbacks to
        this approach. Most obviously, a client could lose their connection, and the following would happen:
      </p>
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
        for every interaction, making all of the following scenarios a nightmare for web applications:
      </p>
      <ul>
        <li>
          “Lie-fi” - users believes they’re online, and spins its wheels with a blank screen
        </li>
        <li>
          Server bottleneck - an overloaded server forces clients to wait for responses
        </li>
        <li>
          Distance - even when connected, a typical HTTP request-response across the US can take 200-400ms
        </li>
        <li>
          Network traffic - Heavy traffic to and from the same server, clogging up bandwidth
        </li>
      </ul>

      <h4 id="offline-architecture">Offline Architecture</h4>
      <p>
        In an offline-first approach, clients are not fully dependent on having a persistent internet
        connection and therefore aren’t “dumb”.
      </p>

      <img></img>

      <p>
        In this model, clients locally store static assets and application data, allowing the application
        to be fully usable even without a connection. This has a lot of benefits:
      </p>
      <ul>
        <li>Apps can still be used while offline</li>
        <li>Data can be queried for much faster because local reads are typically faster than an HTTP
          request-response cycle</li>
        <li>A subset (delta) of the full dataset can be transmitted instead in an online-offline scenario, reducing payload size</li>
      </ul>

      <h4 id="Challenges of Offline-First Applications">Challenges of Offline-First Applications</h4>
      <p>
        An offline-first approach to building web applications is very doable, but requires navigating
        challenges that arise depending on the nature of the application. Consider the following table:
      </p>

      <img></img>

      <p>
        This table outlines the difficulty in converting various types of web applications to being offline-first.
        Ultimately, every offline-first app must take into account the following factors:
      </p>
      <ul>

      </ul>
    </div>
  )
}

export default Introduction;
