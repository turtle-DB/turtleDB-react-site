import React from 'react';
import Citation from '../../Citation'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierDuneLight } from 'react-syntax-highlighter/styles/hljs'

const sampleDoc = "const sampleDoc = {\r\n   \"name\": \"Peter Parker\",\r\n   \"age\": 28,\r\n   \"gender\": \"male\",\r\n   \"profession\": \"Spiderman\",\r\n   \"email\": \"peterparker@avengers.com\",\r\n   \"phone\": \"+1 (847) 523-2700\"\r\n }"
const Scalability = () => {
  return (
    <div>
      <h2 id='scalability'>Scalability</h2>
      <p>
        Developers looking into turtleDB may find themselves wondering about storage limitations on the client side.
        They definitely exist and are something to be aware of.
      </p>
      <p>
        Storage constraints in turtleDB come from two sources. The first is the total available space that the
        browser ‘allots’ to IndexedDB. The second is the impact of document versioning in turtleDB;
        extra space is consumed by keeping all revisions.
      </p>
      <p>
        Ultimately, we calculated that the nature of applications built with turtleDB have a significant
        impact on storage. Given the same number of unique documents, write-heavy applications will consume
        much more space over time.
      </p>
      <h3 id="idb-limits">IndexedDB Limits</h3>
      <p>
        Every browser implements in-browser storage limitations differently. Generally, the space used by IDB falls under the
        ‘temporary storage’ category, meaning its storage space may be vulnerable  to being evicted.
        This can happen when a client’s computer is running low on disk space and files have to be
        removed via Least Recently Used (LRU) policy.
      </p>
      <p>Directly quoting the Chrome documentation for IDB space calculations:<Citation
        url='https://developer.chrome.com/apps/offline_storage'
        creator='Google'
        title='Managing HTML5 Offline Storage'
      /></p>

      <blockquote className="blockquote">
        <p>Temporary storage is shared among all web apps running in the browser. It is also shared across all offline APIs, such as App Cache, IndexedDB, and File System. However, it does not include web storage APIs like Local Storage and Session Storage, which still has a limit of 5 MB per origin. The shared pool can be up to 1/3 of the of available disk space. Storage already used by apps is included in the calculation of the shared pool; that is to say, the calculation is based on (available storage space + storage being used by apps) * .333 . Each app can have up to 20% of the shared pool.</p>
      </blockquote>

      <p>
        IDB is allotted up to roughly 33% of a computer’s free disk space. This means for every 15GB, 5 GB
        is usable by Chrome. The maximum space one origin can use is 20% of that. This means for 15GB of
        free hard drive space, an origin can at most take up 1GB.
      </p>

      <div className="img-container">
        <img className="img-style" src="../images/scalability/1-idb-limits.png" />
      </div>

      <p>
        However, it is important to note that this is an approximate calculation - Chrome’s approach
        to managing temporary storage is not well understood and up-to-date documentation can be hard to
        come by.
      </p>
      <p>
        Since IDB is geared towards working with JSON documents, we benchmarked turtleDB using example data like:
      </p>

      <div className="pre-container">
        <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>
          {sampleDoc}
        </SyntaxHighlighter>
      </div>

      <p>
        For a small doc of 180 bytes, the total space actually used by turtleDB to store it is 460 bytes.
        This is due to the extra properties added to the doc; including document id, revision hash id,
        and updating the IDB index.
      </p>
      <p>
        The accompanying meta document with its revision tree would consume an additional 410 bytes.
        In total, the 180 byte JSON doc would need 460 + 410 = 870 bytes.
      </p>
      <p>
        If we were just creating documents this size, with no further updates,
        how many could fit into 1 GB? Approximately 1.2 million documents.
      </p>
      <p>
        Realistically, updates will be made to data. With turtleDB’s document versioning,
        that means new versions are created, and more space is required. How much additional
        data does one update add?
      </p>
      <p>
        turtleDB does not create a new meta document for updates. It only needs to add another
        sub-array to the revision tree. This means each update adds approximately 60 bytes to
        the meta document. So we can say that an update would create an additional 520 bytes of space.
      </p>
      <p>
        Creating a new document takes 870 bytes, while updating an existing document only takes 520 bytes.
        However, one document might have many updates.
      </p>
      <p>
        This means that documents with many updates will take up more space. Storing 300,000 documents with
        turtleDB takes up ~250MB. However, if on average every document receives 5 updates, the space
        requirement goes up to 1GB.
      </p>
      <p>
        The point here is that developers should be aware that document histories take storage.
        Applications where documents receive hundreds of updates will run out of space more quickly.
      </p>

      <div className="img-container">
        <img className="img-style" src="../images/scalability/2-create-update-chart.png" />
      </div>

      <p>But what happens when IndexedDB reaches its  storage limit? Referring Chrome documentation again:<Citation
        url='https://developer.chrome.com/apps/offline_storage'
        creator='Google'
        title='Managing HTML5 Offline Storage'
      /></p>

      <blockquote className="blockquote">
        <p>Once the storage quota for the entire pool is exceeded, the entire data stored for the least recently used host gets deleted. The browser, however, will not expunge the data in LocalStorage and SessionStorage. For data stored in other offline APIs, the browser deletes the data in whole and not in part so that app data doesn't get corrupted in unexpected ways.</p>
      </blockquote>
      <p>
        In other words, if turtleDB is being actively used, it is unlikely to be cleared under LRU policies. But if it is not, the IDB database could be deleted in its entirety. This is just a reality of the current state of in-browser storage technology. The only solution here for users to vertically scale up their hard drive.
      </p>
      <p>
        Knowing this limitation, we implemented optional compaction, giving developers more control over how
        much document history to keep around.
      </p>
      <h3 id="compaction">Compaction</h3>
      <p>
        Updates generate multiple versions of a document that are stored. If a developer is not making use of the document
        history functionality to access previous versions, and would like to save space, they can opt to use
        compaction.
      </p>
      <p>
        Compaction is a partial solution for turtleDB developers.  turtleDB finds all non-leaf versions of documents
        in the store and permanently removes them from the IDB database.
      </p>

      <div className="img-container">
        <img className="img-style" src="../images/scalability/3-compaction.png" />
      </div>

      <p>
        While we remove store versions, the meta document and its document history tree remain untouched, so sync and merge functionality will be unaffected.
        This could clear up a significant amount of space depending on how many updates have been made to the documents in the database.
      </p>

      <h3 id="idb-performance">IndexedDB Performance</h3>
      <p>
        While IndexedDB has a storage constraint that affects data-intensive applications, its performance may actually be the primary bottleneck.
      </p>
      <p>
        IndexedDB features fast read queries but suffers from slow write speeds. This is compounded by
        turtleDB’s document versioning design - any update operation requires both updating the meta document,
        and inserting a new revision into the store. IndexedDB updates are faster than inserts, but still add
        to the total query time. This table shows that working with a lot of data can become a problem in for turtleDB:
      </p>

      <div className="img-container">
        <img className="img-style" src="../images/scalability/4-idb-performance.png" />
      </div>

      <p>
        <em>The times shown in the above table are hardware dependent. As such, IDB’s performance metrics are all approximations. </em>
      </p>
      <p>
        As the table shows, a new user joining a large application (several hundred thousand records) for the first
        time would have to wait a few minutes to receive all the documents from the server.
      </p>
      <p>
        An application where users primarily read data and updates are not frequent, will have no problems beyond the initial database transfer.
        In contrast, an application with a high write ratio may frustrate users. For example, a developer that wants to filter data and apply a
        bulk update would expect to wait a few seconds for this operation to complete.
      </p>
      <p>
        However, the good news is that while these operations are happening, the DOM does not get blocked
        and users can continue to interact with the page.
      </p>

      <h3 id="sync-efficiency">Sync Efficiency</h3>
      <p>
        After reorganizing our database structure, refactoring version tree operations, and implementing
        MongoDB bulk queries, we realized that the largest bottleneck in our synchronization process is
        the HTTP request-response cycle.
      </p>
      <p>
        To benchmark our sync process, we set up an instance of tortoiseDB running on a DigitalOcean droplet
        with a local MongoDB database. This droplet had a modest 1 GB of memory, so is largely representative
        of the environments that tortoiseDB could be running in.
      </p>

      <div className="img-container">
        <img className="img-style" src="../images/scalability/5-DO-droplet.png" />
      </div>

      <p>
        We located our droplet on the west coast and sent requests from a turtleDB on the east coast.
        This was done to simulate applications that might not have close client-server proximity.
      </p>
      <p>
        Using a baseline of sending 100 new documents from client to server, performed multiple
        times and averaged out, we can see how long each part of the entire sync process takes:
      </p>

      <div className="img-container">
        <img className="img-style" src="../images/scalability/6-sync-timeline.png" />
      </div>

      <div className="img-container">
        <img className="img-style" src="../images/scalability/7-sync-time-table.png" />
      </div>

      <p>
        What immediately stood out was the HTTP request-response times accounted for approximately
        70% of total sync time. There are 4 HTTP requests made during <span className="inline-code">syncTo</span> and 4 during <span className="inline-code">syncFrom</span> - approximately 150ms in travel time per request-response cycle.
      </p>
      <p>
        Given our optimizations for tree merging and MongoDB bulk queries, server-side operations were
        performed quickly. Operations were somewhat slower when working with IDB on the client side,
        but still dwarfed in comparison to the HTTP time.
      </p>
      <p>
        This testing indicated that the minimum sync time would always be at least two seconds; which would
        only increase with larger HTTP payloads. This may be acceptable for some applications, but it goes to show that turtleDB is not suitable for ones requiring real-time sync.
      </p>
      <p>
        With up to 1000 documents being sent from client to server, the total server processing time only
        increased slightly - from 70ms for 100 documents to around 180ms for 1000 documents.
        This was largely due to optimizations we made to our tree merging code and the speed of
        MongoDB, ensuring it would never be a significant bottleneck in those high document volume situations.
      </p>
      <p>
        We realized while we experimented with bigger and bigger payload sizes that some developers may
        not have full control over their remote server. This means they cannot control HTTP payload
        limits set by the server. To make it easier for developers to work around this issue,
        we implemented the previously covered <a href="#">batching</a> in both the turtleDB and tortoiseDB libraries.
      </p>
      <p>
        Batching enables developers to arbitrarily set limits on the number of documents to send when synchronizing
        (1000 by default), thereby controlling the size of HTTP payloads. If one whole set of documents
        cannot fit into one payload, it can be split up into multiple requests.
      </p>
      <p>
        One downside is that this potentially increases the number of HTTP requests required during a sync,
        slowing down the entire process. A potential solution we are currently working on is to provide the
        option of using websockets instead of HTTP. Bypassing the 8 request-response cycles should speed up
        the sync process significantly.
      </p>
      <p>
        As it stands with our current model, users need to be aware that a full sync can take around 2
        seconds, potentially longer with multiple clients all accessing the same remote database. We
        hope to continue chipping away at that performance benchmark in future versions of turtleDB.
      </p>
    </div>
  )
}

export default Scalability;
