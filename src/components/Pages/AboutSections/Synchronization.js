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
const mongoBulk = "  insertUpdatedMetaDocs() {\r\n    return Promise.resolve().then(() => {\r\n      return this.mongoShell.updateManyMetaDocs(this.updatedMetaDocs);\r\n    })\r\n      .then(() => {\r\n        if (this.newTurtleMetaDocs.length > 0) {\r\n          return this.mongoShell.command(this.mongoShell._meta, \"CREATE_MANY\", this.newTurtleMetaDocs);\r\n        }\r\n      })\r\n  }"

const Synchronization = () => {
  return (
    <div>
      <h2 id='synchronization'>Synchronization</h2>
      <p>By this point, turtleDB had robust client-side storage using native browser technologies, and an efficient approach to tracking document histories. The next step was to design a protocol that would share all database changes across the network. Every client running turtleDB needed to eventually receive all the changes that other clients had made.
</p>
      <p>The largest challenge was ensuring the efficiency of this protocol. Clients couldn’t spend too many resources (time? processing?) determining what they needed to share, and what they were missing. They also needed to avoid sharing changes more than once. </p>
      <p>Finally, this protocol had to ensure that, after a sync, clients would have everything needed to identify and resolve conflicts. We will briefly step through turtleDB’s solutions to these problems.</p>

      <h3> Architecture (Topology?) </h3>

      <p>One decision was whether clients would synchronize with other clients, or only synchronize with the server. turtleDB adopted the latter.</p>

      <div className="img-container">
        <img className="img-style" src="../images/sync/1-centralized.png" />
      </div>

      <p>In this centralized topology, there can be multiple clients, but each client only ever connects to a central server which runs `tortoiseDB` and uses MongoDB as its data store. Periodically, clients send changes to the server, and the server sends back the changes it has received from other clients. This ensures that all clients eventually receive all changes.
</p>

      <p>This decision was made for several reasons. Because the server receives all changes, it always has the latest state. It also conducts expensive operations as much as possible, freeing up client resources. </p>

      <h3>Efficient Synchronization</h3>

      <p>With a (network?) in place, clients and server needed a way to exchange local updates. The approach needed to be flexible for two scenarios - ongoing syncs every few seconds when clients were online, and larger syncs when a client came online after a period of time offline. The approach also had to be “bi-directional” - it had to enable sharing a client’s changes with the server, and server changes with the client.
</p>
      <p>We used the HTTP protocol to implement syncing. Using a series of HTTP request-response cycles for both sync directions allowed us to organize application logic into a series of GET and POST requests that looked very similar for each direction, and abstract the sync process above the details of working with IndexedDB or MongoDB. Clients running turtleDB make HTTP requests using the `axios` library (https://github.com/axios/axios); the server uses Express (https://expressjs.com/) as a router to handle these requests.
</p>
      <p>HTTP defined the structure of a sync session for changes to be shared, but clients and server still had to know what to share. Imagine if a client had 1000 documents, synced to a server, and created 50 new documents (so now there are 1050). It would be hugely inefficient to send those previous 1000 documents over again on the next sync cycle. It would also be inefficient to have the server recreate the client’s document history tree from scratch. These two questions posed the largest challenges for efficient syncing.</p>

      <h4>Checkpoints - Last Keys</h4>

      <p>turtleDB uses checkpoints based on database primary keys to ensure that clients and server only share new changes in a sync session. This approach takes advantage of turtleDB’s document versioning, which treats data as immutable - all data operations, even updates and deletes, create new records. This means that all operations add records in the database stores, and are associated with an incrementing primary key. This is true for the server as well, which only adds records as it receives records from clients.</p>

      <div className="img-container">
        <img className="img-style" src="../images/sync/2-last-key.png" />
      </div>

      <p>After a sync session, the highest primary key in the store can be saved as a checkpoint - the “last key”. In the next sync session, turtleDB only has to share database records with primary keys that are higher than the last key - i.e., records that have been added since the last sync session. Last keys get saved in the database as part of a timestamped sync history record. </p>

      <p>This snippet shows the server’s highest primary key being pulled from MongoDB:
</p>

      <div className="pre-container">
        <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>{lastKey}</SyntaxHighlighter>
      </div>

      <p>Storing last keys is a flexible way to make syncing more efficient.  Compared to an in-memory queue of pending updates to be shared, last keys are stored in the database and are not lost if the client browser is closed (true?), and have an O(1) space requirement regardless of the number of updates. </p>

      <p>The last key approach also works in a multi-client environment. After each sync session, each client tracks the “last key” of the server’s relevant MongoDB collection. Before that client next syncs again, other clients could have synced with the server and added more records. By storing its own checkpoint, the first client ensures that it will receive those other changes.
</p>

      <h4>Meta Documents</h4>

      <p>With a set of updates to share in a sync defined by last keys, the remaining challenge was to determine what exactly the clients and server should send each other.
      </p>

      <p>Due to our implementation of meta documents to track document histories (described previously), a key requirement was that at the end of a sync session, the client and server had to have identical meta documents with history trees that included all document revisions. This was how updates (and conflicts) were to be shared across the network.
</p>

      <p>We first decided that the server should always be responsible for updating document histories. Due to our centralized network (topology?, architecture?), the server would always have previous changes from all other clients - it only needed to incorporate changes from individual clients.
</p>

      <p>Clients could simply send over the document revisions stored in the last key range, but this would be problematic. Without a meta document, the server would have no way of knowing the relationship between revisions. Therefore, it would not be able to update its history tree.
</p>

      <p>We therefore have clients send over meta documents in an HTTP POST request, determined by the set of unique document IDs within a last key range. </p>

      <div className="pre-container">
        <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>{getMetaDocsBetweenStoreKeys}</SyntaxHighlighter>
      </div>

      <p>The history trees of these meta documents are efficiently “merged” into the server meta document using the algorithm described previously.
</p>

      <p>In the HTTP response, the server sends back the updated meta documents to the client. It also sends a list of the revision IDs that were only present in the client tree - these are the actual document revisions that the server does not have. </p>

      <p>In a second HTTP POST request, the client sends over the new document revisions. The server inserts these into the MongoDB collection and sends back its highest primary key for the client to save as a new last key checkpoint. At this point, the sync is complete, with client and server holding a shared document history.
</p>

      <h4>Bulk Operations - HTTP</h4>

      <p>An important optimization of the sync process is limiting the number of HTTP request-response cycles that are required to share all changes between a client and server. </p>

      <p>To synchronize the changes for a document, two steps are required. The meta document is sent first to merge the history tree, and then the missing revisions are sent.  This equates to two HTTP request-response cycles between the client and server. </p>

      <p>Instead, turtleDB performs these two steps in two HTTP cycles - the first sends over all relevant meta documents to be merged; the server merges all of them and sends back a list of missing revisions; a second sends over all the revisions in a second request. Along with two additional HTTP requests to compare last keys and confirm successful syncs, a full sync session requires 4 HTTP request cycles. </p>

      <p>(Optional)These requests return Promises, and are chained together within an instance of a Sync class object. Doing so allows values relevant to the sync session to be saved as properties and accessed outside of just one HTTP cycle’s scope.
</p>

      <p>This snippet shows the HTTP requests and other methods in a sync session: </p>


    <div className="pre-container">
      <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>{syncTo}</SyntaxHighlighter>
    </div>

      <h4>Bulk Operations - MongoDB</h4>

      <p>In addition to grouping meta documents and documents into single HTTP requests, we also organized the server-side sync operations to bulk requests to MongoDB as much as possible. </p>

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

      <p>(Optional) As outlined in our “Scalability” section, the largest remaining obstacle for syncing is the time taken by 3 concurrent HTTP requests. We are currently implementing a revised approach, outlined in the ‘Future Work’ section - “New Meta Documents and Sync Protocol”.
</p>


      <p>
        For reference, the following slides illustrate three different sync sessions between a client and server (still need to incorporate Chris’ comments):</p>
        

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
