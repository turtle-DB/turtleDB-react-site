import React from 'react';
import Citation from '../../Citation'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierDuneLight } from 'react-syntax-highlighter/styles/hljs'

const newMetaDoc = "{\r\n  winningRev: \'4-bds\',\r\n  leafRevs: [\'4-bds\'],\r\n  \'new\': [\'3-ghi\', \'4-bds\'],\r\n  tree: {\r\n    \'1-abc\': { children: [\'2-xyz\'] },\r\n    \'2-xyz\': { parent: \'1-abc\', children: [\'3-ghi\'] },\r\n    \'3-ghi\': {  parent: \'2-xyz\' },\r\n    \'4-bds\': {  parent: \'3-ghi\' }\r\n  },\r\n}"
const checkpoints = "checkpoints: {\r\n  turtle1: { },\r\n  turtle2: { \'foo\': [\'3-ghi\', \'4-bds\'], \'bar\': [\'1-xyz\'] }\r\n}"

const FutureWork = () => {
  return (
    <div>
      <h2 id='future-work'>Future Work</h2>
      <p>We have a list of several items that would be valuable additions to turtleDB. These include:
      </p>
      <h3 id="roadmap">Roadmap</h3>
      <h4>More Database Adapters</h4>
      <p>For turtleDB version 1.0.0 we used MongoDB as the default backend database.
        It is a popular option when working with NoSQL document data which maps extremely
        well to IDB. There are not any other offline-first libraries out there that integrate
        with it. We would like to continue building adapters for other JSON compatible
        databases such as Postgres and Redis to offer more developer flexibility.
      </p>
      <h4>Service Workers</h4>
      <p>As IndexedDB runs on the same thread as the DOM, computationally intensive operations
        are blocking. Ideally, we would like to offload these queries to a ServiceWorker which
        runs on a separate thread. This will provide a huge performance boost and takes advantage
        of multi-core systems.
      </p>
      <h4>Web Sockets</h4>
      <p>Instead of using HTTP to transfer data during the synchronization process,
        an alternative solution is WebSockets. It may be faster to transfer data without
        the additional HTTP payload overhead of headers. In addition, avoiding multiple HTTP
        requests can same time.

        A caveat here is that websockets would completely fail if a user had spotty internet connection.
        However, in the case that a user would either be fully online or completely offline with no in-between
        (“lie-fie”), websockets would could be a great fit.
      </p>
      <h4>Authentication</h4>
      <p>
        Authentication is critical when dealing with shared data. For the scope of turtleDB
        1.0.0, we did not implement it. However, it is on our roadmap for future versions as
        we continue to build out tortoiseDB.
      </p>
      <h4>P2P</h4>
      <p>
        An interesting direction this project could be taken in is to consider connecting two
        turtleDB clients with WebSockets and synchronizing them with one another directly.
        This eliminates the middleman (server) entirely, creating a distributed network of
        offline-first databases.
      </p>

      <h3 id="new-meta-documents">New Meta Documents and Sync Protocol</h3>
      <p>We are currently implementing a set of improvements that will greatly improve the speed of synchronization for turtleDB, bringing it down from 2-3 seconds, to approximately 0.5 seconds. It will greatly reduce the Big O complexity of all common operations made on history trees, and also prevent IndexedDB from throwing errors when very large document histories are stored.
      </p>
      <p>Building an offline-first framework requires getting several pieces to work together, all of which have been reviewed in this paper - the IndexedDB adapter, meta document design, document versioning and history trees, the synchronization, and sharing updates via the tree merging mechanism. All of these components feature individual optimizations, but the larger design was affected by earlier decisions.
      </p>
      <p>Building on experience in putting turtleDB together, we designed several new components, which also allows for a redesign of the synchronization protocol and speeds up common operations. These include: a new data structure to track document histories, and three separate changelogs.
      </p>
      <p>We will introduce these changes, and then describe the benefits they bring.
      </p>

      <h4>New Tree Data Structure</h4>
      <p>Currently, meta documents track document histories using a nested sub-array structure to track document histories. The head of the tree is in the first sub-array, and all descendant nodes are contained inside more sub-arrays.
      </p>
      <p>Instead, meta documents will now have a hash object with a simpler flat structure. Each key is a revision ID, and its value is another object that only contains two properties: ‘parent’ and ‘children’. This structure more closely resembles a doubly-linked list:
      </p>

      <div className="pre-container">
        <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>{newMetaDoc}</SyntaxHighlighter>
      </div>

      <h4>New Document Changelog</h4>
      <p>A significant addition is the ‘new’ property in the new meta document design. This serves a changelog for the document. Whenever a new revision is made, the revision ID is added to the ‘new’ array.
      </p>
      <p>Because revision IDs are always pushed onto the ‘new’ array, they are in order, which will assist the server during a sync (see below).
      </p>
      <p>After a sync, the server always returns an updated meta document with an empty ‘new’ array. This ensures that all items in the new array are guaranteed to be changes that should be sent to the server.
      </p>

      <h4>Turtle Changelog</h4>
      <span className="inline-code">changelog: ['foo']</span>
      <p></p>
      <p>Just like the changelog each meta document tracks in its ‘new’ array, the turtleDB of each client also tracks what documents have changed. This changelog is an object that takes O(1) to update with the document ID.
      </p>

      <h4>Server Checkpoints</h4>

      <div className="pre-container">
        <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>{checkpoints}</SyntaxHighlighter>
      </div>

      <p>Finally, the server now tracks all changes that need to be sent to each client. The server updates this checkpoints object as it receives updates from each client. This is made possible by a server only receiving one sync at a time, which became feasible as turtleDB was developed. See below for more details.
      </p>

      <h4>Benefits Summary</h4>
      <p>These changes ultimately provide the following benefits:
      </p>

      <p><span className='bold-text'>Sync Efficiency - </span>Currently, the exchange  of changes between client and server requires 8 HTTP request-response cycles, i.e. 3-4 seconds. New approach cuts this to one cycle, i.e. 0.5 seconds, without expanding the space requirement on either client or server. This is due to the three changelogs introduced earlier, which enable the client and server to know exactly what to send each other.
      </p>
      <p>This allows collaborative apps using turtleDB to get closer to real-time collaboration.
      </p>

      <p><span className='bold-text'>Big O Complexity - </span>The new tree data structure reduces the complexity of all important operations:
      </p>
      <ul>
        <li>Updates: with a hash, local updates now happen in O(1) time, instead of O(N) due to recursive traversal.
        </li>
        <li>Merging: Currently, merging is a linear operation, measured by the number of common nodes between the server and client trees. The new structure still requires a linear operation, but instead only steps through the differences between each tree. This makes syncing much faster, especially when frequent syncs are being made on large history trees. Furthermore, the quadratic operation to compare child nodes is no longer required.
        </li>
        <li>Identifying conflicts: Conflicts are found by ‘collecting’ leaf nodes after a merge. This operation took O(N), but now takes O(1).
        </li>
      </ul>

      <p><span className='bold-text'>Not Nested - </span>The tree data structure is no longer a set of nested sub-arrays, but instead just a hash/object with keys and small values. There will no longer be need for recursive traversals.
      </p>

      <p>One reason for this decision is to head off issues in the future. While turtleDB has not encountered issues with deeply nested histories, other in-browser solutions claim that they can cause IndexedDB to throw errors. </p>
      <p>Preventing those errors with the current structure would require storing the arrays as strings; this in turn would require stringifying and un-stringifying the meta document every time it was handled. Moving to a hash prevents this.
      </p>

    </div>
  )
}

export default FutureWork;
