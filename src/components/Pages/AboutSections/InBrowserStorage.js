import React from 'react';
import { Link } from 'react-router-dom'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierDuneLight } from 'react-syntax-highlighter/styles/hljs'

import Citation from '../../Citation'

const readQuery = "turtleDB.read('foo').then(data => console.log(data))";
const idbQuery = "let db;\r\nlet request = window.indexedDB.open(\"myDB\");\r\nrequest.onerror = function(event) {\r\n  alert(\"Connection failed to open\");\r\n};\r\nrequest.onsuccess = function(event) {\r\n  db = event.target.result;\r\n};\r\n\r\nlet transaction = db.transaction([\"customers\"]);\r\nlet objectStore = transaction.objectStore(\"customers\");\r\n\r\nlet request = objectStore.get(\"John Smith\");\r\nrequest.onerror = function(event) {\r\n  \/\/ Handle errors\r\n};\r\nrequest.onsuccess = function(event) {\r\n  \/\/ Capture returned values\r\n  alert(\"Returned document is \" + request.result);\r\n};"
const promiseQuery = "function read(id) {\r\n  let db;\r\n  this.ready = new Promise((resolve, reject) => {\r\n    const request = window.indexedDB.open(name);\r\n\r\n    request.onsuccess = e => {\r\n      this.db = e.target.result;\r\n      resolve();\r\n    };\r\n    request.onerror = e => {\r\n      this.db = e.target.result;\r\n      reject(e);\r\n    };\r\n  });\r\n\r\n  return this.ready.then(() => {\r\n    return new Promise((resolve, reject) => {\r\n      let request = this.getStore(\'customers\', \'readonly\').get(_id);\r\n\r\n      request.onsuccess = e => {\r\n        resolve(e.target.result);\r\n      }\r\n      request.onerror = e => {\r\n        console.log(`${action} error:`, e.target.error);\r\n        reject(e.target.error);\r\n      }\r\n    })\r\n  });\r\n}"
const promiseAllQuery = "  ...\r\n  \r\n  const promises = ids.map(id => {\r\n    return this.command(this._store, \"INDEX_READ\", { data: { indexName: \'id\', key: id } });\r\n  });\r\n\r\n  return Promise.all(promises);\r\n\r\n  ..."
const promiseThenQuery = "...\r\n\r\nlet result = Promise.resolve();\r\n\r\nids.forEach(id => {\r\n  result = result.then(() => this.delete(id));\r\n});\r\n\r\nreturn result;\r\n\r\n..."

const InBrowserStorage = () => {
  return (
    <div>
      <h2 id='in-browser-storage'>In-Browser Storage</h2>

      <h3 id="storage-options">Storage Options</h3>
      <p>
        If you want to store documents in the browser, there are 3 options:
        LocalStorage, WebSQL, and IndexedDB (IDB).
      </p>
      <h4>LocalStorage</h4>
      <p>
        A key value object store with a maximum storage limit of
        only 5 MB. LocalStorage operations are performed synchronously
         via the global `window` object in the browser. With its low limit and
         synchronous behavior, it is only good for storing small amounts of data
         in small chunks at a time. <Citation
          url='https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage'
          creator='Mozilla Developer Network'
          title='LocalStorage'
        />
      </p>

      <h4>WebSQL</h4>
      <p>
        WebSQL uses a SQLite variation for local data storage and its original
        goal was to enable web developers to query the database using a syntax
         very similar to traditional SQL. However, in 2010, the W3C failed to come
         to a consensus on how to continue developing it in a standardized manner,
         so all major browsers dropped support for it before it could become a W3C
         recommendation. It has since been deprecated by all browsers and is no longer
         being developed.<Citation
          url='https://en.wikipedia.org/wiki/Web_SQL_Database'
          creator='Wikipedia'
          title='Web SQL Database'
        />
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
        However, the IDB API has some issues which contributes to its lack of popularity.
        Multiple async operations are needed to perform even simple queries.
        A typical read query requires several async calls; opening a connection, sending
        a request to the store, and then capturing the returned values in a callback function.
      </p>

      <div className="img-container">
        <img className="img-style" src="../images/browser_storage/async-queries.png" />
      </div>

      <p>
        Furthermore, events fire on objects that are only available for the duration of the IDB connection.
        These objects disappear as soon as the connection closes.
      </p>

      <p>
        A separate set of requests, objects, and events is needed for making schema
        changes, defining indexes or running cursors.
      </p>

      <p>
        Given this specification, IDB is not the simplest API to work with. According to Mozilla,
        the primary backer and developer of IDB:
      </p>
      <blockquote className="blockquote mb-0">
        <hr></hr>
        <p>“The IndexedDB API is powerful, but may seem too complicated for simple cases.”
          <Citation
            url='https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API'
            creator='Mozilla Developer Network'
            title='IndexedDB API'
          />
        </p>
        <hr></hr>
      </blockquote>
      <p>
        Given this admission, the lack of popularity for offline-first applications is unsurprising.
        turtleDB therefore has a promise-based wrapper that <Link to='/API'>
          condenses native IDB queries down to one line.</Link>
      </p>

      <h3 id="turtledb-promise-api">turtleDB's Promise API</h3>
      <p>
        Without Promises, developers have to rely on nested callback functions.
        Callbacks can get extremely messy (i.e. ‘callback hell’), and the
        JavaScript community has embraced Promises as a much simpler and
        elegant solution for dealing with asynchronous code.
      </p>

      <p>
        Promises allow us to control the execution flow of async calls.
        turtleDB abstracts away all the complexities of asynchronous IDB code
        to instead expose a more familiar promise-based API for the developer.
      </p>

      <p>
        This code is a simple example of how a developer would read a document from IndexedDB
        using the browser API:
      </p>

      <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>
        {idbQuery}
      </SyntaxHighlighter>

      <p>
        The above code is adapted from MDN documentation, but would not actually
        work. Sending the query to the store needs to wait on an open database
        connection. Within the turtleDB IDB adapter, promises are often used to
        change the above code to this:
      </p>

      <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>
        {promiseQuery}
      </SyntaxHighlighter>

      <h4 id="promise-all-promise-then">Promise.all, Promise.then</h4>

      <p>
        However, single read queries limit performance.
        When iterating through a list of queries, each iteration opens and closes an IndexedDB connection.
        This does not take advantage of the fact that IndexedDB can receive multiple connections, meaning
        independent queries can be executed concurrently.
      </p>

      <p>
        Running queries in parallel is therefore possible, but it is important to ensure they are all completed sequentially. turtleDB accomplishes this using <span className="inline-code">Promise.all</span>:
      </p>

      <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>
        {promiseAllQuery}
      </SyntaxHighlighter>

      <div className="img-container">
        <img className="img-style" src="../images/browser_storage/promise-all.png" />
      </div>

      <p>
        However, some database operations should be kept atomic. If multiple queries
        edit the same document using the
         <span className="inline-code">Promise.all</span> approach, work will be lost:
      </p>

      <div className="img-container">
        <img className="img-style" src="../images/browser_storage/promise-all-error.png" />
      </div>

      <p>
        In these cases where sequential execution matters, turtleDB uses a “Promise chain” where
        each operation waits for the previous one to complete, and the entire
        set of queries only returns once the final Promise is resolved or an error
        is thrown somewhere along the chain. Because Promise chains must begin with a
        Promise, we start our Promise-chain with an automatically-resolved
        <span className="inline-code">Promise.resolve()</span>.:
      </p>

      <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>
        {promiseThenQuery}
      </SyntaxHighlighter>

      <div className="img-container">
        <img className="img-style" src="../images/browser_storage/promise-then.png" />
      </div>

      <h3 id="turtledb-developer-api">turtleDB Developer API</h3>

      <p>
        With all of these operations within turtleDB, developers are able to just
        open their browsers, set up a database and begin interacting with IDB. They
        no longer need to worry about tasks such as opening and closing connections to
        IDB, creating a store, setting up `onsuccess` and `onerror` handlers for basic
        operations, or controlling the flow of asynchronous operations.
      </p>

      <p>
        The only required knowledge for developers is that all queries to turtleDB return a Promise.
        This means if you want to read a document of id `foo`, that code would be written as:
      </p>

      <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>
        {readQuery}
      </SyntaxHighlighter>

      <p>
        turtleDB’s design consists of two modules. The first is an IDB adapter which contains
        all the native code for interacting with IDB. The other is a public facing and
        developer-friendly API that communicates with the IDB adapter. In short, a
        developer can interact with IDB without having to write a single line of IDB specific code.
      </p>

      <div className="img-container">
        <img className="img-style" src="../images/browser_storage/developer-API.png" />
      </div>

      <p>
        With a working understanding of browser storage, we can examine turtleDB’s
        approach to storing documents for offline-first applications while enabling collaboration.
      </p>
    </div>
  )
}

export default InBrowserStorage;
