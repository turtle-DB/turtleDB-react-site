import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom'

import React from 'react';
import Citation from '../../Citation'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierDuneLight } from 'react-syntax-highlighter/styles/hljs'

const syncTo = "function syncTo() {\r\n  return this.checkServerConnection(\'\/connect\')\r\n    .then(() => this.getSyncToTortoiseDoc())\r\n    .then(() => this.getHighestTurtleKey())\r\n    .then(() => this.sendRequestForLastTortoiseKey(\'\/_last_tortoise_key\'))\r\n    .then(() => this.getChangedMetaDocsForTortoise())\r\n    .then(() => this.batchSendChangedMetaDocsToTortoise(\'\/_missing_rev_ids\'))\r\n    .then(() => this.getStoreDocsForTortoise())\r\n    .then(() => this.createNewSyncToTortoiseDoc())\r\n    .then(() => this.batchSendTurtleDocsToTortoise(\'\/_insert_docs\'))\r\n    .then(() => this.updateSyncToTortoiseDoc())\r\n    .catch(err => console.log(\'Sync To Error:\', err));\r\n}"
const lastKeyApproach = "function getSyncToTortoiseDoc() {\r\n  return this.idb.command(this.idb._syncToStore, \"READ_ALL\", {})\r\n    .then(syncRecords => this.syncToTortoiseDoc = syncRecords[0])\r\n}\r\n\r\nfunction getHighestTurtleKey() {\r\n  return this.idb.command(this.idb._store, \"GET_ALL_KEYS\", {})\r\n    .then(keys => {\r\n      const lastKey = keys[keys.length - 1];\r\n      this.highestTurtleKey = lastKey ? lastKey : 0;\r\n    });\r\n}\r\n\r\nfunction sendRequestForLastTortoiseKey(path) {\r\n  return axios.post(this.targetUrl + path, this.syncToTortoiseDoc)\r\n    .then(res => this.lastTortoiseKey = res.data)\r\n}"
const getChangedMetaDocsForTortoise = "function getChangedMetaDocsForTortoise() {\r\n  if (this.lastTortoiseKey === this.highestTurtleKey) {\r\n    return Promise.reject(\r\n      \"No sync needed - last key and highest key are equal\"\r\n    );\r\n  } else {\r\n    return this.getMetaDocsBetweenStoreKeys(\r\n      this.lastTortoiseKey, this.highestTurtleKey\r\n      )\r\n      .then(metaDocs => this.changedTurtleMetaDocs = metaDocs)\r\n    });\r\n  }\r\n}"
const sendMetaDocs = "function batchSendChangedMetaDocsToTortoise(path) {\r\n  if (this.changedTurtleMetaDocs.length === 0) return;\r\n  \r\n  let currentBatch = this.changedTurtleMetaDocs.splice(0, this.batchLimit);\r\n\r\n  return this.sendBatchOfMetaDocs(path, currentBatch)\r\n    .then(() => this.batchSendChangedMetaDocsToTortoise(path));\r\n}\r\n\r\nfunction sendBatchOfMetaDocs(path, batch) {\r\n  return axios.post(this.targetUrl + path, { metaDocs: batch })\r\n    .then(revIdsFromTortoise => \r\n      this.revIdsFromTortoise.push(...revIdsFromTortoise.data)\r\n    );\r\n}"
const getMetaDocsBetweenStoreKeys = "function getMetaDocsBetweenStoreKeys(lastTortoiseKey, highestTurtleKey) {\r\n  return this.idb.command(\r\n    this.idb._store, \"READ_BETWEEN\", { x: lastTortoiseKey, y: highestTurtleKey }\r\n    )\r\n    .then(docs => this.getUniqueIDs(docs))\r\n    .then(ids => this.getMetaDocsByIDs(ids))\r\n}"
const getUniqueIDs = "function getUniqueIDs(docs) {\r\n  let ids = {};\r\n  for (let i = 0; i < docs.length; i++) {\r\n    const id = docs[i]._id_rev.split(\"::\")[0];\r\n    if (ids[id]) continue;\r\n    ids[id] = true;\r\n  }\r\n  const uniqueIDs = Object.keys(ids);\r\n  return uniqueIDs;\r\n}"
const getStoreDocsForTortoise = "function getStoreDocsForTortoise() {\r\n  const promises = this.revIdsFromTortoise.map(_id_rev => \r\n    this.idb.command(\r\n      this.idb._store, \"INDEX_READ\", \r\n      { data: { indexName: \'_id_rev\', key: _id_rev }}\r\n\t));\r\n  \r\n  return Promise.all(promises)\r\n    .then(docs => this.storeDocsForTortoise = docs)\r\n}"
const updateSyncDoc = "function createNewSyncToTortoiseDoc() {\r\n  let newHistory = { \r\n    lastKey: this.highestTurtleKey, sessionID: this.sessionID \r\n  };\r\n  \r\n  this.newSyncToTortoiseDoc = Object.assign(\r\n    this.syncToTortoiseDoc, { \r\n      history: [newHistory].concat(this.syncToTortoiseDoc.history) \r\n    }\r\n  );\r\n}"
const sendStoreDocs = "function batchSendTurtleDocsToTortoise(path) {\r\n  let currentBatch = this.storeDocsForTortoise.splice(0, this.batchLimit);\r\n\r\n  if (this.storeDocsForTortoise.length === 0) {\r\n    return this.sendBatchOfDocs(path, currentBatch, true)\r\n  } else {\r\n    return this.sendBatchOfDocs(path, currentBatch)\r\n      .then(() => {\r\n        return this.batchSendTurtleDocsToTortoise(path);\r\n      });\r\n  }\r\n}\r\n\r\nfunction sendBatchOfDocs(path, batch, lastBatch = false) {\r\n  let payload = { docs: batch };\r\n\r\n  if (lastBatch) {\r\n    payload.newSyncToTortoiseDoc = this.newSyncToTortoiseDoc;\r\n    payload.lastBatch = lastBatch;\r\n  }\r\n\r\n  return axios.post(this.targetUrl + path, payload);\r\n}"
const batchLimit = "function setBatchLimit(batchLimit) {\r\n  this.batchLimit = batchLimit;\r\n}";
const syncFrom = "function syncFrom() {\r\n  return this.checkServerConnection(\'\/connect\')\r\n    .then(() => this.getTurtleID())\r\n    .then(() => this.getLastTurtleKey())\r\n    .then(() => this.sendRequestForTortoiseMetaDocs(\'\/_changed_meta_docs\'))\r\n    .then(() => this.findMissingRevIds())\r\n    .then(() => this.sendRequestForTortoiseDocs(\'\/_changed_docs\'))\r\n    .then(() => this.insertUpdatedMetaDocs())\r\n    .then(() => this.insertNewDocsIntoStore())\r\n    .then(() => this.updateSyncFromTortoiseDoc())\r\n    .then(() => this.sendSuccessConfirmation(\'\/_confirm_sync\'))\r\n    .catch((err) => console.log(\'Sync From Error:\', err));\r\n}";
const lastKey = "else if (action === \'GET_ALL_IDS_GREATER_THAN\') {\r\n          return collection.find({\r\n            _id: {\r\n              $gt: ObjectId(query.min)\r\n            }\r\n          }, { _id: 1 })\r\n          .sort({ _id: 1 })\r\n          .map(function (item) { return item._id; })\r\n          .toArray();\r\n        }"
const mongoBulk = "  insertUpdatedMetaDocs() {\r\n    return Promise.resolve().then(() => {\r\n      return this.mongoShell.updateManyMetaDocs(this.updatedMetaDocs);\r\n    })\r\n      .then(() => {\r\n        if (this.newTurtleMetaDocs.length > 0) {\r\n          return this.mongoShell.command(this.mongoShell._meta, \"CREATE_MANY\", \r\n          this.newTurtleMetaDocs);\r\n        }\r\n      })\r\n  }"

const Synchronization = () => {
  return (
    <div>
      <h2 id='synchronization'>Synchronization</h2>
      <p>Client-side storage and document history tracking are powerful features, but collaborative applications ultimately need to share all database changes across the network. Designing a protocol to do this is an important question.
      </p>
      <p>The largest challenge is ensuring the efficiency of this protocol. Clients don’t have many resources to determine what they need to share, and what they are missing. They also need to avoid sharing changes more than once.
      </p>
      <p>This protocol also needs to ensure that, after a sync, clients have everything they need to identify and resolve conflicts. We will briefly step through turtleDB’s solutions to these problems.
      </p>

      <h3 id="architecture"> Architecture</h3>

      <p>Collaborative applications can have different architectures for sharing changes. Clients can exchange directly with each other, or only communicate with a server in a centralized model. turtleDB uses the latter approach.
      </p>

      <div className="img-container">
        <img className="img-style" src="../images/sync/1-centralized.png" />
      </div>

      <p>In this centralized model, there can be multiple clients, but each client only ever connects to a central server which runs <span className="inline-code">tortoiseDB</span> and uses MongoDB as its data store. Periodically, clients send changes to the server, and the server sends back the changes it has received from other clients. This ensures that all clients eventually receive all changes.
      </p>

      <p>This decision brings several advantages. Because the server receives all changes, it always has the latest state. It also conducts expensive operations as much as possible, freeing up client resources.
      </p>

      <h3 id="synchronization-challenges">Synchronization Challenges</h3>

      <p>Along with a network model, clients and server need a way to exchange local updates. For the kind of collaborative apps that turtleDB aims to support, any solution needs to support two scenarios - ongoing syncs every few seconds when clients are online, and potentially larger syncs that occur when a clients comes online after a period of time offline. The solution also has to be “bi-directional” - it has to enable sharing a client’s changes with the server, and server changes with the client. This is the only way that changes from each client are eventually shared with all others.
      </p>
      <p>turtleDB uses an HTTP protocol. Using a series of HTTP request-response cycles for both sync directions allows the application logic to be organized into a series of GET and POST requests that look very similar for each direction, and abstract the sync process above the details of working with IndexedDB or MongoDB. Clients running turtleDB make HTTP requests using the <a href="https://github.com/axios/axios">axios</a> library; the server uses <a href="https://www.expressjs.com">Express</a> as a router to handle these requests.
      </p>
      <p>HTTP defines the structure of a sync session for changes to be shared, but clients and server still have to know <i>what</i> to share. Imagine if a client had 1000 documents, synced to a server, and created 50 new documents (so now there are 1050). It would be hugely inefficient to send those previous 1000 documents over again on the next sync cycle. It would also be inefficient to have the server recreate the client’s document history tree from scratch. These two questions pose the largest challenge for efficient syncing.
      </p>

      <h4>Checkpoints - Last Keys</h4>

      <p>turtleDB uses checkpoints based on database primary keys to ensure that clients and server only share new changes in a sync session. This approach takes advantage of turtleDB’s document versioning, which treats data as immutable - all data operations, even updates and deletes, create new records. This means that all operations add records in the database stores, and are associated with an incrementing primary key. This is true for the server as well, which only adds records as it receives records from clients.
      </p>

      <div className="img-container">
        <img className="img-style" src="../images/sync/2-last-key.png" />
      </div>

      <p>After a sync session, the highest primary key in the store can be saved as a checkpoint - the “last key”. In the next sync session, turtleDB only has to share database records with primary keys that are higher than the last key - i.e., records that have been added since the last sync session. Last keys get saved in the database as part of a timestamped sync history record.
      </p>

      <p>This snippet shows the server’s highest primary key being pulled from MongoDB:
      </p>

      <div className="pre-container">
        <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>{lastKey}</SyntaxHighlighter>
      </div>

      <p>Storing last keys is a flexible way to make syncing more efficient.  Compared to an in-memory queue of pending updates to be shared, last keys are stored in the database and are not lost if the client browser is closed, and have an O(1) space requirement regardless of the number of updates.
      </p>

      <p>The last key approach also works in a multi-client environment. After each sync session, each client tracks the “last key” of the server’s relevant MongoDB collection. Before that client next syncs again, other clients could have synced with the server and added more records. By storing its own checkpoint, the first client ensures that it will receive those other changes.
      </p>

      <h4>Meta Documents</h4>

      <p>With a set of updates to share in a sync defined by last keys, the remaining challenge is to determine what exactly the clients and server should send each other.
      </p>

      <p>Due to our implementation of meta documents to track document histories (described previously), a key requirement is that at the end of a sync session, the client and server have to have identical meta documents with history trees that include all document revisions. This is how updates (and conflicts) are to be shared across the network.
      </p>

      <p>The server should always be responsible for updating document histories. Due to the centralized model adopted for turtleDB, the server always has previous changes from all other clients - it only needs to incorporate changes from individual clients.
      </p>

      <p>Clients could simply send over the document revisions stored in the last key range, but this would be problematic. Without a meta document, the server would have no way of knowing the relationship between revisions. Therefore, it would not be able to update its history tree.
      </p>

      <p>Clients therefore first send over meta documents in an HTTP POST request, determined by the set of unique document IDs within a last key range. This snippet shows those meta documents being pulled:
      </p>

      <div className="pre-container">
        <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>{getMetaDocsBetweenStoreKeys}</SyntaxHighlighter>
      </div>

      <p>The history trees of these meta documents are efficiently “merged” into the server meta document using the algorithm described previously.
      </p>

      <p>In the HTTP response, the server sends back the updated meta documents to the client. It also sends a list of the revision IDs that were only present in the client tree - these are the actual document revisions that the server does not have.
      </p>

      <p>In a second HTTP POST request, the client sends over the new document revisions. The server inserts these into the MongoDB collection and sends back its highest primary key for the client to save as a new last key checkpoint. At this point, the sync is complete, with client and server holding a shared document history.
      </p>

      <h4>Bulk Operations - HTTP</h4>

      <p>An important optimization of the sync process is limiting the number of HTTP request-response cycles that are required to share all changes between a client and server. </p>

      <p>To synchronize the changes for a document, two steps are required. The meta document is sent first to merge the history tree, and then the missing revisions are sent.  This equates to two HTTP request-response cycles between the client and server. </p>

      <p>Obviously, performing these HTTP requests per document would equate to long-running sync sessions for even a small set of changes (a single HTTP cycle can take 150-300ms when the client and server are located on opposite coasts in the US).
      </p>

      <p>Instead, turtleDB performs these two steps in two HTTP cycles - the first sends over all relevant meta documents to be merged; the server merges all of them and sends back a list of missing revisions; a second sends over all the revisions in a second request. Along with two additional HTTP requests to compare last keys and confirm successful syncs, a full sync session requires 4 HTTP request cycles. </p>

      <p>These requests return Promises, and are chained together within an instance of a Sync class object. Doing so allows values relevant to the sync session to be saved as properties and accessed outside of just one HTTP cycle’s scope.
      </p>

      <p>This snippet shows the HTTP requests and other methods in a sync session: </p>


    <div className="pre-container">
      <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>{syncTo}</SyntaxHighlighter>
    </div>

      <h4>Bulk Operations - MongoDB</h4>

      <p>In addition to grouping meta documents and documents into single HTTP requests, it is also important for the server-side sync operations to bulk requests to MongoDB as much as possible.
      </p>

      <p>turtleDB’s sync process requires the server to access its MongoDB collections at several points - retrieving meta documents, inserting them, searching for missing document revisions, and inserting new revisions from the client. A single MongoDB read request takes at least 5ms to execute, so executing individual queries for each meta document or revision could considerably lengthen sync sessions.
</p>

      <p>Instead, a list of meta documents is requested in one query. For small lists, most query time goes to opening and closing the query connection, so query time did not increase at all for most sync sessions.
</p>

      <p>This snippet shows the server updating the meta documents in its MongoDB collection. It needs to perform an update query for existing meta documents, and an insert query for new meta documents (i.e., documents recently created on the client). It groups both sets of meta documents into one query each.
</p>

      <div className="pre-container">
        <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>{mongoBulk}</SyntaxHighlighter>
      </div>

      <h4>Conclusion</h4>

      <p>With the implementation of last key checkpoints, meta document tree merging, and consolidating HTTP and MongoDB requests, the majority of turtleDB sync sessions reliably complete within 2-3 seconds. This speed enables turtleDB to support ongoing collaboration while clients are online.
</p>



      <p>
        For reference, the following slides illustrate three different sync sessions between a client and server:
        </p>


      <Carousel showArrows={true}>
        <div>
          <img src="../images/sync/last_slideshow/1.png" />
        </div>
        <div>
          <img src="../images/sync/last_slideshow/2.png" />
        </div>
        <div>
          <img src="../images/sync/last_slideshow/3.png" />
        </div>
        <div>
          <img src="../images/sync/last_slideshow/4.png" />
        </div>
        <div>
          <img src="../images/sync/last_slideshow/5.png" />
        </div>
        <div>
          <img src="../images/sync/last_slideshow/6.png" />
        </div>
        <div>
          <img src="../images/sync/last_slideshow/7.png" />
        </div>
        <div>
          <img src="../images/sync/last_slideshow/8.png" />
        </div>
        <div>
          <img src="../images/sync/last_slideshow/9.png" />
        </div>
        <div>
          <img src="../images/sync/last_slideshow/10.png" />
        </div>
        <div>
          <img src="../images/sync/last_slideshow/11.png" />
        </div>
        <div>
          <img src="../images/sync/last_slideshow/12.png" />
        </div>
        <div>
          <img src="../images/sync/last_slideshow/13.png" />
        </div>
        <div>
          <img src="../images/sync/last_slideshow/14.png" />
        </div>
        <div>
          <img src="../images/sync/last_slideshow/15.png" />
        </div>
        <div>
          <img src="../images/sync/last_slideshow/16.png" />
        </div>
        <div>
          <img src="../images/sync/last_slideshow/17.png" />
        </div>
        <div>
          <img src="../images/sync/last_slideshow/18.png" />
        </div>
        <div>
          <img src="../images/sync/last_slideshow/19.png" />
        </div>
        <div>
          <img src="../images/sync/last_slideshow/20.png" />
        </div>
        <div>
          <img src="../images/sync/last_slideshow/21.png" />
        </div>
        <div>
          <img src="../images/sync/last_slideshow/22.png" />
        </div>
      </Carousel>
    </div>
  )
}

export default Synchronization;
