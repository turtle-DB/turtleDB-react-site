import React from 'react';
import Citation from '../../Citation'

const Introduction = () => {
  return (
    <div className="container">
      <h2 id='introduction'>Introduction</h2>
    <p>
      turtleDB is a Javascript promise-based wrapper with synchronization and conflict resolution capabilities
      built around the native in-browser database, IndexedDB. That was a pretty loaded sentence so let’s simplify
      things a little bit. turtleDB can effectively be broken down into 3 features:

      <ol>
        <li>Promise-based wrapper around IndexedDB (IDB)</li>
        <li>Synchronization</li>
        <li>Conflict Resolution</li>
      </ol>
      These core features also happen to prove themselves as the most significant engineering challenges our team faced
      when building turtleDB. Each has its own dedicated section where we break down the whys and hows around it.
    </p>
      <h3 id='why-idb'>Why IndexedDB?</h3>

      <p>Our proposal is to build a library that provides front-end applications an
        API to an in-browser, NoSQL document database. This library will be able to store data locally
        on the client, and coordinate automatic synchronization with a remote database.
        The primary use case for this is to build offline first and distributed web applications.

      </p>
      <h3 id="promise-wrapper">The Promise Wrapper</h3>
      <p>
        blah blah
      </p>
    </div>
  )
}

export default Introduction;
