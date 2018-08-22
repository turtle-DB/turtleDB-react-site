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
        Storage constraints in turtleDB come from two sources. The first is the total available space that the '
        browser ‘allots’ to IndexedDB. The second is the impact of document versioning in turtleDB;
        extra space is consumed by keeping all revisions.
      </p>
      <p>
        Ultimately, we calculated that the nature of applications built with turtleDB have a significant
        impact on storage. Given the same number of unique documents, write-heavy applications will consume
        much more space over time.
      </p>
      <p>
        Every browser implements in-browser storage limitations differently. Generally, the space used by IDB falls under the
        ‘temporary storage’ category, meaning its storage space may be vulnerable  to being evicted.
        This can happen when a client’s computer is running low on disk space and files have to be
        removed via Least Recently Used (LRU) policy.
      </p>
      <p>
        Using Chrome documentation as an example, here is how temporary space allotment is calculated:
      </p>

      <img />

      <p>
        IDB is allotted up to roughly 33% of a computer’s free disk space. This means for every 15GB, 5 GB
        is usable by Chrome. The maximum space one origin can use is 20% of that. This means for 15GB of
        free hard drive space, an origin can at most take up 1GB.
      </p>

      <img />

      <p>
        However, it is important to note here that this is an approximate calculation - Chrome’s approach
        to managing temporary storage is not well understood and up-to-date documentation can be hard to
        come by.
      </p>
      <p>
        Since IDB is geared towards working with JSON documents, we benchmarked turtleDB using example data like:
      </p>
      <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>
        {sampleDoc}
      </SyntaxHighlighter>
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
        sub-array to the reversion tree. This means each update adds approximately 60 bytes to
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
    </div>
  )
}

export default Scalability;
