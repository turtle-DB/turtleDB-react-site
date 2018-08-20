import React from 'react';
import { Link } from 'react-router-dom'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierDuneLight } from 'react-syntax-highlighter/styles/hljs'

import Citation from '../../Citation'

const InBrowserStorage = () => {
  const codeSnippet1 = "var React = require('react');\nvar Markdown = require('react-markdown');\n\nReact.render(\n  <Markdown source=\"# Your markdown here\" />,\n  document.getElementById('content')\n);"
  const readQuery = "turtleDB.read('foo').then(data => console.log(data))";
  return (
    <div>
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
        Furthermore, events fire on objects that are only available for the duration of the IDB connection.
        These objects disappear as soon as the connection closes.
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
        The lack of popularity for offline-first applications is unsurprising.
        That is why turtleDB offers a promise-based wrapper that <Link to='/API'>condenses native IDB queries
        down to one line.</Link>
      </p>
      <h3 id="turtledb-promise-api">turtleDB’s Promise API</h3>
      <p>
        Without Promises, developers have to rely on nested callback functions.
        Callbacks can get extremely messy (i.e. ‘callback hell’), and the JavaScript
        community has embraced Promises as a much simpler and elegant solution for dealing
        with asynchronous code.
      </p>
      <p>
        Promises allow us to control the execution flow of async calls. turtleDB abstracts
        away all the complexities of asynchronous IDB code to instead expose a more familiar
        <Link to='/API'> Promise-based API</Link> for the developer. The below code snippets
        show how much code we save a developer from writing when using turtleDB. Both open a
        connection to IDB and insert a new document.
      </p>
      <p>
        In cases where sequential execution matters, database operations must be kept atomic.
        For these cases, turtleDB uses a “Promise chain” where the operation only ends once
        the final Promise is resolved or an error was thrown somewhere along the chain.
      </p>

      <img/>

      <p>
        With all of these operations within turtleDB, developers are able to just open their
        browsers, set up a database and begin interacting with IDB. They no longer need to
        worry about tasks such as opening and closing connections to IDB, creating a store,
        setting up `onsuccess` and `onerror` handlers for basic operations, or controlling the
        flow of asynchronous operations.
      </p>
      <p>
        The only required knowledge for developers is that all queries to turtleDB return a Promise.
        This means if you want to read a document of id `foo`, that code would be written as:
      </p>
      <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>
        {readQuery}
      </SyntaxHighlighter>

      <p>
        turtleDB’s designed consists of two modules. The first is an IDB adapter which contains
        all the native code for interacting with IDB. The other is a public facing and
        developer-friendly API that communicates with the IDB adapter. In short, a
        developer can interact with IDB without having to write a single line of IDB specific code.
      </p>
      <img />
    </div>
  )
}

export default InBrowserStorage;
