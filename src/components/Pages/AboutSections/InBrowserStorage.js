import React from 'react';
import { Link } from 'react-router-dom'

import Citation from '../../Citation'

const InBrowserStorage = () => {
  return (
    <div className="container">
      <h2 id='in-browser-storage'>In-Browser Storage</h2>
      <p>
        If you want to store documents in the browser, there are 3 storage options:
        LocalStorage, WebSQL, and IndexedDB (IDB). Let’s talk about each one briefly.
      </p>
      <h5>LocalStorage</h5>
      <p>
        It has a 5MB cap and its API is totally synchronous and therefore blocks the DOM.
        It is essentially a large JavaScript object that can have data attached to it. Good
        for storing small amounts of data in small chunks at a time. 
      </p>
      <h5>WebSQL</h5>
      <p>
        Although it has a non-blocking API and its queries are a variant of SQL, it has
        been deprecated by W3C in 2010 in favor of IndexedDB.
      </p>
      <h5 id='idb'>IndexedDB(IDB)</h5>
    <p>
      IDB is an in-browser (client-side) key-value based storage system. Queries to IDB
      must be made in JavaScript and its entire API operates asynchronously. This all sounds
      great but there are some major flaws with IDB.
    </p>
      <blockquote className="blockquote mb-0">
        <hr></hr>
        <p>“IndexedDB API is powerful, but may seem too complicated for simple cases.”
          <Citation
            url='https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API'
            creator='Mozilla Developer Network'
            creationDate='June 14, 2018'
            contributingOrganization='MDN'
            title='IndexedDB API'
          />
        </p>
        <hr></hr>
      </blockquote>
      <p>
        It’s a little ironic that even MDN themselves admit their creation is not really viable
        for simple use cases. This is definitely a contributing factor for offline-first applications’
        lack of popularity. Developers don’t want to spend a lot of time setting up a database just to
        insert that first document. We took notice of this and decided to write a promise-based wrapper
        while condensing all native IDB queries down to one line. This was the beginning of turtleDB.
      </p>
      <h5>turtleDB’s Promise API</h5>
      <p>
        By nature, asynchronous Javascript takes a little more effort to work with. To add on top of that,
        the native IDB API is event-based which makes it even more awkward to use. Before writing any
        turtleDB code, we carefully decided between the three common ways of working with asyc Javascript:
        good old callbacks, promises, and the recently introduced async await. Callbacks can get extremely
        messy (we want to avoid callback hell as much as possible) and as of this writing, asyc / await is
        a ES7 feature and we didn’t want to be forced into using a transpiler like Babel to ensure our JS
        was working. For these reasons, we decided to go with promises.

        Essentially, we don’t want IDB users to get bogged down thinking about async code and all the quirks
        that come with IDB. With <Link to='/API'>turtleDB's API</Link>, we’ve condensed the code you’d normally have to write (shown on the left) to a one-liner.
      </p>
    </div>
  )
}

export default InBrowserStorage;
