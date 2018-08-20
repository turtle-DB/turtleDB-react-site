import React from 'react';
import { Link } from 'react-router-dom'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierDuneLight } from 'react-syntax-highlighter/styles/hljs'

import Citation from '../../Citation'

const InBrowserStorage = () => {
  const codeSnippet1 = "var React = require('react');\nvar Markdown = require('react-markdown');\n\nReact.render(\n  <Markdown source=\"# Your markdown here\" />,\n  document.getElementById('content')\n);"
  return (
    <div className="container">
      <h2 id='in-browser-storage'>In-Browser Storage</h2>
      <p>
        If you want to store documents in the browser, there are 3 options:
        LocalStorage, WebSQL, and IndexedDB (IDB).
      </p>
      <h5>LocalStorage</h5>
      <p>
        A key value object store with a maximum storage limit of
        only 5 MB. LocalStorage operations are performed synchronously
         via the global `window` object in the browser. <Citation
           url='https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage'
           creator='Mozilla Developer Network'
           creationDate='May 9, 2018'
           contributingOrganization='MDN'
           title='LocalStorage'
         />With its low limit and
         synchronous behavior, it is only good for storing small amounts of data
         in small chunks at a time.
      </p>
      <h5>WebSQL</h5>
      <p>
        WebSQL uses a SQLite variation for local data storage and its original
        goal was to enable web developers to query the database using a syntax
         very similar to traditional SQL.   <Citation
              url='https://en.wikipedia.org/wiki/Web_SQL_Database'
              creator='Wikipedia'
              creationDate='July 31, 2018'
              contributingOrganization='Wikipedia'
              title='Web SQL Database'
            /> However, in 2010 the W3C failed to come
         to a consensus on how to continue developing it in a standardized manner
         so all major browsers dropped support for it before it could become a W3C
         recommendation. It has since been deprecated by all browsers and is no longer
         being developed.
      </p>
      <p>This leaves us with one option.</p>
      <h3 id='idb'>IndexedDB (IDB)</h3>
      <p>
        After dropping support for WebSQL in 2010, the major browser developers
        focused their time and energy into building an alternative in-browser storage
        solution that would offer more sophisticated features.
      </p>
      <p>
        Rather than building another SQL-like database, IDB is a JavaScript NoSQL
        object-oriented database. It allows developers to store structured data such
        as arrays and objects, as well as data in blobs. It is a key-value based storage
        system, and enables more sophisticated database features such as transactions,
        indexing, and the creation of multiple stores.
      </p>
      <p>
        Developers work with IndexedDB via an asynchronous API that can be accessed in
        most browser contexts, even WebWorkers and ServiceWorkers.
      </p>
      <p>
        However, IDB’s API has some issues which contributes to its lack of popularity.
        Multiple async operations are needed to perform even the  simplest of tasks.
        A typical read query requires several async calls; opening a connection, sending
        a request to the store, and then capturing the returned values in a callback function.
      </p>

      <img/>

      <p>
        IDB is quirky in that events fire on objects that are only available for the duration
        of the IndexedDB connection. These objects disappear as soon as the events have fired.
      </p>
      <p>
        Given this specification, IDB is not the simplest API to work with. Even according to Mozilla,
        the primary backer and developer IDB, has stated:
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
        Given the admission by the creators of IndexedDB that it is challenging to work with,
        the lack of popularity for offline-first applications is unsurprising. Developers
        don’t want to have to spend hours reading documentation just to get IDB up and running.
      </p>
      <p>
        We decided to help the developer community by writing a promise-based wrapper that
        condensed native IDB queries down to one line. This was the beginning of turtleDB.
      </p>
      <h3 id="turtledb-promise-api">turtleDB’s Promise API</h3>
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
      <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>
        {codeSnippet1}
      </SyntaxHighlighter>
    </div>
  )
}

export default InBrowserStorage;
