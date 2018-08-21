import React from 'react';
import Citation from '../../Citation'

const FutureWork = () => {
  return (
    <div>
      <h2 id='future-work'>Future Work</h2>
      <h5>More Database Adapters</h5>
      <p>For turtleDB version 1.0.0 we used MongoDB as the default backend database.
        It is a popular option when working with NoSQL document data which maps extremely
        well to IDB. There are not any other offline-first libraries out there that integrate
        with it. We would like to continue building adapters for other JSON compatible
        databases such as Postgres and Redis to offer more developer flexibility.
      </p>
      <h5>Service Workers</h5>
      <p>As IndexedDB runs on the same thread as the DOM, computationally intensive operations
        are blocking. Ideally, we would like to offload these queries to a ServiceWorker which
        runs on a separate thread. This will provide a huge performance boost and takes advantage
        of multi-core systems.
      </p>
      <h5>Web Sockets</h5>
      <p>Instead of using HTTP to transfer data during the synchronization process,
        an alternative solution is WebSockets. It may be faster to transfer data without
        the additional HTTP payload overhead of headers. In addition, avoiding multiple HTTP
        requests can same time.

        A caveat here is that websockets would completely fail if a user had spotty internet connection.
        However, in the case that a user would either be fully online or completely offline with no in-between
        (“lie-fie”), websockets would could be a great fit.
      </p>
      <h5>Authentication</h5>
      <p>
        Authentication is critical when dealing with shared data. For the scope of turtleDB
        1.0.0, we did not implement it. However, it is on our roadmap for future versions as
        we continue to build out tortoiseDB.
      </p>
      <h5>P2P</h5>
      <p>
        An interesting direction this project could be taken in is to consider connecting two
        turtleDB clients with WebSockets and synchronizing them with one another directly.
        This eliminates the middleman (server) entirely, creating a distributed network of
        offline-first databases.
      </p>
    </div>
  )
}

export default FutureWork;
