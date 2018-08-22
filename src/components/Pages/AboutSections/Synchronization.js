import { Carousel } from 'react-responsive-carousel';

import React from 'react';
import Citation from '../../Citation'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierDuneLight } from 'react-syntax-highlighter/styles/hljs'

const syncTo = "function syncTo() {\r\n  return this.checkServerConnection(\'\/connect\')\r\n    .then(() => this.getSyncToTortoiseDoc())\r\n    .then(() => this.getHighestTurtleKey())\r\n    .then(() => this.sendRequestForLastTortoiseKey(\'\/_last_tortoise_key\'))\r\n    .then(() => this.getChangedMetaDocsForTortoise())\r\n    .then(() => this.batchSendChangedMetaDocsToTortoise(\'\/_missing_rev_ids\'))\r\n    .then(() => this.getStoreDocsForTortoise())\r\n    .then(() => this.createNewSyncToTortoiseDoc())\r\n    .then(() => this.batchSendTurtleDocsToTortoise(\'\/_insert_docs\'))\r\n    .then(() => this.updateSyncToTortoiseDoc())\r\n    .catch(err => console.log(\'Sync To Error:\', err));\r\n}"
const lastKeyApproach = "function getSyncToTortoiseDoc() {\r\n  return this.idb.command(this.idb._syncToStore, \"READ_ALL\", {})\r\n    .then(syncRecords => this.syncToTortoiseDoc = syncRecords[0])\r\n}\r\n\r\nfunction getHighestTurtleKey() {\r\n  return this.idb.command(this.idb._store, \"GET_ALL_KEYS\", {})\r\n    .then(keys => {\r\n      const lastKey = keys[keys.length - 1];\r\n      this.highestTurtleKey = lastKey ? lastKey : 0;\r\n    });\r\n}\r\n\r\nfunction sendRequestForLastTortoiseKey(path) {\r\n  return axios.post(this.targetUrl + path, this.syncToTortoiseDoc)\r\n    .then(res => this.lastTortoiseKey = res.data)\r\n}"
const getChangedMetaDocsForTortoise = "function getChangedMetaDocsForTortoise() {\r\n  if (this.lastTortoiseKey === this.highestTurtleKey) {\r\n    return Promise.reject(\"No sync needed - last key and highest key are equal\");\r\n  } else {\r\n    return this.getMetaDocsBetweenStoreKeys(this.lastTortoiseKey, this.highestTurtleKey)\r\n      .then(metaDocs => this.changedTurtleMetaDocs = metaDocs)\r\n    })\r\n  }\r\n}"
const sendMetaDocs = "function batchSendChangedMetaDocsToTortoise(path) {\r\n  if (this.changedTurtleMetaDocs.length === 0) return;\r\n  \r\n  let currentBatch = this.changedTurtleMetaDocs.splice(0, BATCH_LIMIT);\r\n\r\n  return this.sendBatchOfMetaDocs(path, currentBatch)\r\n    .then(() => this.batchSendChangedMetaDocsToTortoise(path));\r\n}\r\n\r\nfunction sendBatchOfMetaDocs(path, batch) {\r\n  return axios.post(this.targetUrl + path, { metaDocs: batch })\r\n    .then(revIdsFromTortoise => this.revIdsFromTortoise.push(...revIdsFromTortoise.data));\r\n}"
const getUniqueIDs = "function getUniqueIDs(docs) {\r\n  let ids = {};\r\n  for (let i = 0; i < docs.length; i++) {\r\n    const id = docs[i]._id_rev.split(\"::\")[0];\r\n    if (ids[id]) continue;\r\n    ids[id] = true;\r\n  }\r\n  const uniqueIDs = Object.keys(ids);\r\n  return uniqueIDs;\r\n}"
const getStoreDocsForTortoise = "function getStoreDocsForTortoise() {\r\n  const promises = this.revIdsFromTortoise.map(_id_rev => \r\n    this.idb.command(\r\n      this.idb._store, \"INDEX_READ\", \r\n      { data: { indexName: \'_id_rev\', key: _id_rev }}\r\n\t));\r\n  \r\n  return Promise.all(promises)\r\n    .then(docs => this.storeDocsForTortoise = docs)\r\n}"
const updateSyncDoc = "function createNewSyncToTortoiseDoc() {\r\n  let newHistory = { lastKey: this.highestTurtleKey, sessionID: this.sessionID };\r\n  this.newSyncToTortoiseDoc = Object.assign(\r\n    this.syncToTortoiseDoc, { history: [newHistory].concat(this.syncToTortoiseDoc.history) }\r\n  );\r\n}\r\n\r\nfunction updateSyncToTortoiseDoc() {\r\n  return this.idb.command(this.idb._syncToStore, \"UPDATE\", { data: this.newSyncToTortoiseDoc });\r\n}"
const sendStoreDocs = "function batchSendTurtleDocsToTortoise(path) {\r\n  let currentBatch = this.storeDocsForTortoise.splice(0, BATCH_LIMIT);\r\n\r\n  if (this.storeDocsForTortoise.length === 0) {\r\n    return this.sendBatchOfDocs(path, currentBatch, true)\r\n  } else {\r\n    return this.sendBatchOfDocs(path, currentBatch)\r\n      .then(() => {\r\n        return this.batchSendTurtleDocsToTortoise(path);\r\n      });\r\n  }\r\n}\r\n\r\nfunction sendBatchOfDocs(path, batch, lastBatch = false) {\r\n  let payload = { docs: batch };\r\n\r\n  if (lastBatch) {\r\n    payload.newSyncToTortoiseDoc = this.newSyncToTortoiseDoc;\r\n    payload.lastBatch = lastBatch;\r\n  }\r\n\r\n  return axios.post(this.targetUrl + path, payload);\r\n}"
const batchLimit = "const BATCH_LIMIT = 1000;"
const syncFrom = "function syncFrom() {\r\n  return this.checkServerConnection(\'\/connect\')\r\n    .then(() => this.getTurtleID())\r\n    .then(() => this.getLastTurtleKey())\r\n    .then(() => this.sendRequestForTortoiseMetaDocs(\'\/_changed_meta_docs\'))\r\n    .then(() => this.findMissingRevIds())\r\n    .then(() => this.sendRequestForTortoiseDocs(\'\/_changed_docs\'))\r\n    .then(() => this.insertUpdatedMetaDocs())\r\n    .then(() => this.insertNewDocsIntoStore())\r\n    .then(() => this.updateSyncFromTortoiseDoc())\r\n    .then(() => this.sendSuccessConfirmation(\'\/_confirm_sync\'))\r\n    .catch((err) => console.log(\'Sync From Error:\', err));\r\n}";

const Synchronization = () => {
  return (
    <div>
      <h2 id='synchronization'>Synchronization</h2>
      <p>
        Synchronization is what makes turtleDB more than just a promise-based wrapper for IDB; it enables
        offline-first web applications to be collaborative.
      </p>
      <p>
        turtleDB has a centralized topology - there can be multiple clients, but each client connects to a
        central server which runs `tortoiseDB` and uses MongoDB as its data store.
      </p>
      <p>
        Synchronizing nodes is a feature all collaborative applications must be able to offer.
        This means periodically, clients must send changes in their local database to the server. After the client has sent its changes, the server sends back all changes it has received from other clients.
        Ultimately, this is how turtleDB maintains consistency with a distributed database architecture.
      </p>
      <p>
        This diagram illustrates the centralized approach to synchronizing clients and server:
      </p>

      <img />

      <p>
        Syncing always happens in two steps. Clients send their changes to the server and the server sends back changes from other clients.
        Clients and server share many common tasks which depend on the direction that changes are being sent.
      </p>
      <p>
        However, clients and server do have some unique responsibilities in turtleDB. Clients are always responsible for
        initiating sync and sending requests. Meanwhile, the server is in charge of merging revision trees. This is because in a centralized design,
        the server should always have the latest state.
      </p>
      <p>
        For both sync directions, the client and server go through several steps, sending each other a set of changes that they think the other party
        has not received. These steps include:
      </p>
      <ul>
        <li>Sending relevant meta documents to identify and merge document histories</li>
        <li>Sending the actual revisions</li>
        <li>Updating their local sync histories</li>
      </ul>
      <p>
        For both sync directions, turtleDB uses a series of HTTP requests to organize this process into discrete, sequential
        steps with a set of routes and associated methods.
      </p>
      <p>
        For simplicity, we will only outline the steps taken for client -> server sync. From the perspective of the client, we call this the ‘sync to’
        as it is syncing to the server. The process for server -> client is a mirror image of client -> server.
      </p>
      <h3 id="sync-to">syncTo()</h3>
      <p>
        Let's being with the first half of the sync process: `syncTo()`. As each stage of this process is
        asynchronous, we control the flow of events with an extended promise chain that looks like this:
      </p>

      <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>
        {syncTo}
      </SyntaxHighlighter>

      <h5>Check Server Connection</h5>
      <p>
        The first step is to check whether a connection to the server can be established.
        If the  HTTP GET request does not return a “200 OK” status code, an error is thrown
        and the sync process is aborted.
      </p>

      <h4>Get Range of Updated Documents</h4>
      <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>
        {lastKeyApproach}
      </SyntaxHighlighter>

      <p>
        The client and server then compare their sync histories. These histories contain a ‘last key’
        value that references the highest primary key ofthe client revision store that was covered in
        the last sync; we can think of this as a checkpoint.
      </p>

      <img />

      <p>
        Using an HTTP request, the client checks that the server agrees on the last checkpoint. If so,
        the current sync will only include document changes from that checkpoint up to the current highest
        primary key (since keys in the document store are auto-incrementing).
      </p>

      <p>
        This addresses a potential problem with syncing - that it can be extremely inefficient if not done properly.
        Imagine if a client had 1000 documents, synced to a server, and created 50 new documents (so now there are 1050).
        It would be hugely inefficient to send those previous 1000 documents over again on the next sync cycle.
        We only care about newly created or updated documents.The last key checkpoint ensures that  this sync cycle only concerns itself with documents between 1000 and 1050.
      </p>
      <h4>Send Meta Documents</h4>
      <p>
        Once we have a key range of revisions, we could just send over those revisions to the server. However, it would be very possible that all of those 50 new revisions belong to one document.
        Instead, the client  first sends over the meta documents tracking those new revisions to the server . The client does this by taking the full list of revisions between the specified keys,
        and generating an array of unique document ids.
      </p>
      <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>
        {getUniqueIDs}
      </SyntaxHighlighter>

      <p>
        It then uses those ids to fetch the relevant meta documents from the store.
      </p>
      <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>
        {getChangedMetaDocsForTortoise}
      </SyntaxHighlighter>

      <p>
        turtleDB then delivers these meta documents to the server via an HTTP POST request.
      </p>
      <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>
        {sendMetaDocs}
      </SyntaxHighlighter>
      <p>
        The server merges the client document trees with its own and responds with a list of revision ids it does not have in its local <strong>store.</strong>
      </p>
      <p>
        <em>For storage optimization, turtleDB allows developers to decide whether all missing revisions are
        exchanged, or only leaf revisions necessary to ongoing collaboration. This setting determines
        what the server requests from the client after merging document trees.</em>
      </p>
      <h4>Send Revisions and Last Key</h4>
      <p>
        Once the client receives a response from the server, it retrieves the exact revisions the server asks for from its store using the ‘_id_rev’ index.
      </p>
      <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>
        {getStoreDocsForTortoise}
      </SyntaxHighlighter>
      <p>
        It also generates a new sync history object with the highest key value this sync session encapsulated.
      </p>
      <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>
        {updateSyncDoc}
      </SyntaxHighlighter>
      <p>
        The collection of requested revision documents and the new sync history object are delivered to the server via an HTTP POST request.
      </p>
      <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>
        {sendStoreDocs}
      </SyntaxHighlighter>
      <p>
      The server inserts all the meta documents, revision documents, and the new sync history into its database. The client also inserts
      the sync history and at this point, the client -> server sync is completed.
      </p>
      <h3 id="batching">Batching</h3>
      <p>turtleDB provides developers the ability to set batch sizes for the meta document and revision document collections as they are transported over the network to the server.</p>
      <p>Developers may not have the ability to alter maximum payload limits on their database servers so this is a way to cap the size of payloads travelling between the two points.</p>
      <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>
        {batchLimit}
      </SyntaxHighlighter>
      <p>This line can be found in turtleDB's syncTo.js file and can be altered accordingly.</p>
      <h3 id="sync-from">syncFrom()</h3>
      <p>
        After the client has synced with the server and sent changes, the second half of the sync process initiates where the server sends changes to the client, called `syncFrom`.
      </p>
      <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>
        {syncFrom}
      </SyntaxHighlighter>
      <p>
        After this has completed, a full sync has occurred and the two databases will possess an up-to-date view of the state of the data.
      </p>
      <h3 id="sync-walkthrough">Example Sync Walkthrough</h3>
      <p>
        The best way to demonstrate how turtleDB syncs is to run through a example. Have
        a click through the slides. We broke it down so that our HTTP request-response cycles
        look like a dialogue between the client and server (which it actually is!).
      </p>
      <Carousel showArrows={true}>
        <div>
          <img src="../images/sync/1.png" />
        </div>
        <div>
          <img src="../images/sync/2.png" />
        </div>
        <div>
          <img src="../images/sync/3.png" />
        </div>
        <div>
          <img src="../images/sync/4.png" />
        </div>
        <div>
          <img src="../images/sync/5.png" />
        </div>
        <div>
          <img src="../images/sync/6.png" />
        </div>
        <div>
          <img src="../images/sync/7.png" />
        </div>
        <div>
          <img src="../images/sync/8.png" />
        </div>
        <div>
          <img src="../images/sync/9.png" />
        </div>
        <div>
          <img src="../images/sync/10.png" />
        </div>
        <div>
          <img src="../images/sync/11.png" />
        </div>
        <div>
          <img src="../images/sync/12.png" />
        </div>
        <div>
          <img src="../images/sync/13.png" />
        </div>
        <div>
          <img src="../images/sync/14.png" />
        </div>
        <div>
          <img src="../images/sync/15.png" />
        </div>
        <div>
          <img src="../images/sync/16.png" />
        </div>
        <div>
          <img src="../images/sync/17.png" />
        </div>
        <div>
          <img src="../images/sync/18.png" />
        </div>
        <div>
          <img src="../images/sync/19.png" />
        </div>
        <div>
          <img src="../images/sync/20.png" />
        </div>
        <div>
          <img src="../images/sync/21.png" />
        </div>
        <div>
          <img src="../images/sync/22.png" />
        </div>
      </Carousel>
    </div>
  )
}

export default Synchronization;
