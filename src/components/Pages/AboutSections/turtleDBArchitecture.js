import React from 'react';
import Citation from '../../Citation'

const TurtleDBArchitecture = () => {
  return (
    <div>
      <h2 id='turtleDB-architecture'>turtleDB Architecture</h2>
      <p>
        So far we have discussed:
      </p>
      <ul>
        <li>
          Offline-first apps and our vision for a developer framework
        </li>
        <li>
          The nature of IndexedDB and our Promise-based API
        </li>
        <li>
          Document histories, our tree data structure, and meta documents
        </li>
      </ul>
      <p>
        By bringing these concepts together, we can explain how turtleDB was built to be a user-friendly framework.
        This section features many screenshots taken directly from the “Application” tab of the Chrome browser console.
      </p>
      <h3 id="turtledb-stores">turtleDB Stores</h3>
      <p>
        We can create multiple databases in IDB, and each database can contain multiple “stores”. A store is
        just a key-value collection that can store JavaScript objects; think table for SQL databases.
      </p>
      <p>
        turtleDB holds all stores within one database. This helps keep the browser environment clean if the
        developer was working with other IDB databases.
      </p>
      <p>
        Within turtleDB, we created five stores by default.
      </p>

      <img />

      <h5>store</h5>
      <p>
        The <strong>store</strong> is where all the actual document revisions are kept. Each record is a JSON-like document; key-value
        pairs representing the data and an added unique identifier called “_id_rev”. This is a concatenation of the
        document ID and the revision ID, separated by a “::”. This ensures a unique ID for every revision.
        The store also maintains an index on id_rev, making read queries for specific revisions O(1).
      </p>

      <img />

      <p>
        <strong>Updating</strong> - When a document is updated, a new revision is created and added to the store.
        All the data is included and its “_id_rev” is updated as well. A new revision ID is generated
        along with an incremented version number (the “2-..” seen here):
      </p>

      <img />

      <p>
        <strong>Deleting</strong> - When a document is deleted, no records are actually removed from the store. In fact,
        turtleDB treats deletes as a special kind of update. The original document will have all its
        properties stripped and a “_deleted: true” added to it.
      </p>

      <img />
      <p>
        Any document with a `_deleted: true` property cannot be updated anymore. Note that as revisions are added to the store,
        they always increment the primary key of the store (seen in the Key column).
      </p>
      <h5>metaStore</h5>
      <p>
        In the last section, we discussed how the actual documents are stored in the store. The <strong>metaStore</strong> holds all the
        information associated with each of these documents. Each entry represents a unique document
        where the Key path for this store is the document ID.
      </p>
      <p>
        The store used `_id_rev` where the `_id` portion stayed consistent regardless of how many times a document was updated.
        The store could have 50 documents representing the case where 1 document was updated 49 times.
        This would be represented by 1 entry in the <strong>metaStore</strong>.
      </p>
      <img />

      <p>
        This screenshot shows what an expanded document actually looks like. The history tree is contained in a property called “_revisions”.
        This means a meta document can reference multiple records in the store. The meta document also has the “_winningRev” and “_leafRevs” properties to ensure fast read queries.
      </p>
      <h5>syncToStore</h5>
      <p>
        The syncToStore contains a history of all the times a turtleDB has pushed its data to a the server.
      </p>

      <img />

      <p>
        Entires in the <strong>syncToStore</strong> only have two properties: the `_id` of turtleDB that initialized the sync process, and a `history` array. Elements in the `history` array have a `lastKey`
        property which is the last primary key in the store that was given to tortoiseDB on the previous sync (this is defaulted to 0 if a turtleDB has not performed a sync yet).
      </p>
      <p>
        The above snapshot shows the case that a turtleDB has synced to a tortoiseDB twice. An optimization we made involves keeping track of the primary key of the <strong>store</strong> that was
        given to the server (tortoiseDB) on the last sync. That way, we do not need to traverse the entirety of the <strong>store</strong> documents on each sync.
      </p>
      <p>
        It is important to note that the <strong>syncToStore</strong> will ever only hold one document per server it has synced with. For simplicity’s sake, we’re just showing the case of only having
        one server to sync with.
      </p>

      <h5>syncFromStore</h5>
      <p>
        Similarly, the syncFromStore’s entire purpose is to store the history of all the times turtleDB has received data from a server (tortoiseDB). When additional collaborators
        are involved, it is often the case that one client has not received everyone else’s updates. syncFromStore’s job is to remember which of those docs the client is missing.
        The same optimization we made in syncToStore is applied here as well. The `lastKey` that was sent by tortoiseDB during the previous sync is stored. It knows to only send
        documents that are newer than the `lastKey`.
      </p>

      <img />

      <p>
        Note that the format of the `lastKey` sent back from tortoiseDB is in a format than that of the syncToStore. This is because on the turtleDB side, we’re working with IDB,
        which generates an auto-incrementing primary key by default in the store. However, in these examples, we are retrieving data directly from MongoDB which uses an entirely
        different method for generating PK’s.
      </p>

      <h5>turtleDBMeta</h5>

      <img />

      <p>
        The <strong>turtleDBMeta</strong> store's sole purpose is to identify each instance of turtleDB. We originally thought it may be a little overkill to do this and that setting
        the `id` as a property on each turtleDB would be sufficient. However, this would mean each turtleDB’s `id` would get reset upon a page refresh.
        Taking advantage of IDB’s same-origin principle, we set the identification of each turtleDB inside <strong>turtleDBMeta</strong>. This way,
        the turtleDB associated with each origin would be set in stone unless the entire database is dropped for that origin.
      </p>
    </div>
  )
}

export default TurtleDBArchitecture;
