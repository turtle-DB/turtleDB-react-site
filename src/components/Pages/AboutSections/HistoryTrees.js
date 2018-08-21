import React from 'react';
import Citation from '../../Citation'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierDuneLight } from 'react-syntax-highlighter/styles/hljs'

const doublyLinkedLists = "class Revision {\n  constructor(rev) {\n    this.rev = rev;\n    this.prev = null;\n    this.next = null;\n  }\n}\nconst rev1 = new Revision('1-hash1');\nconst rev2 = new Revision('2-hash2');\nrev1.next = rev2;\nrev2.prev = rev1;\n\nconst rev3 = new Revision('3-hash3');\nrev2.next = rev3;\nrev3.prev = rev2;"
const subArray = "const revisions = [['1-hash1'], ['2-hash2a', '2-hash2b'], ['3-hash3a', '3-hash3b']];"

const HistoryTrees = () => {
  return (
    <div>
      <h2 id='history-trees'>Document History Trees</h2>
      <p>
        We decided we needed a separate abstraction to summarize each document’s history in order to
        track all its revisions. This led us to use a tree data structure and a complementary set of algorithms.
      </p>
      <p>
        We also had to make sure our implementation of the tree could identify conflicts, instead of forcing
        the developer to compare the contents of actual document versions. This requirement drove many
        design decisions.
      </p>
      <p>
        Document histories can naturally be thought of as having a tree structure where each revision
        of a document represents a node of that tree. Every time a document is edited, two things happen:
      </p>
      <ol>
        <li>
          A new revision is made and stored in the database, containing the latest contents of the document.
        </li>
        <li>
          The tree data structure is updated to include this new revision.
        </li>
      </ol>
      <p>
        For documents that never receive conflicting changes, their tree would simply be a string of
        nodes in one long line:
      </p>

      <img />
      <p>
        However, some documents might have conflicts. For example, a document could have different updates
        made to it independently by two different clients. This is represented in the tree as a ‘fork’, where
        the branch for each competing revision stems from the original point of agreement.
      </p>
      <p>
        Over time as a document is edited by multiple parties, its tree becomes more elaborate.
        The below diagram attempts to showcase this scenario but we are limited by space.
        In reality, some documents may have hundreds or thousands of edits with more than one fork.
      </p>
      <p>
        In addition to tracking document versions, we also want the tree to track deletes.
        In turtleDB, we treat deletes as a special kind of update where a node is added to the tree
        to represent a deleted ‘revision’ of a document.
      </p>

      <img/>

      <h5>Leaf Nodes</h5>
      <p>
        Throughout the rest of this paper, the last node of every branch will be referred to as a leaf node.
        This is simply a semantic distinction. Trees with no conflicts only have one leaf node;
        trees with conflicts have multiple leaf nodes that represent competing versions of a document.
      </p>
      <h4 id="revision-ids">Revision IDs</h4>

      <p>
        A unique revision ID is needed to represent each revision in the tree. Our diagrams so far have
        this as ‘revision 1’, ‘revision 2’ but in turtleDB, we actually have a process in generating these.
      </p>

      <img />

      <p>
        The first half of the revision ID is a number that is incremented for every revision. On creation,
        a document will always be “1-[hash]”, and the first update done to that document will result in
        “2-[hash]”, etc. We therefore know exactly how many times a document has been updated. The contents
        of a revision along with the revision ID of its parent node is hashed to generate a revision ID.
      </p>
      <p>
        We use the MD5 hashing algorithm but really, any hashing algorithm can work.
        Hashing plays a role in how turtleDB detects conflicts. Two clients might independently edit the
        same document. If they happen to make the exact same update to that document, their hashes will
        be the same and therefore no conflict is generated.
      </p>

      <h3 id="tree-data-structures">Tree Data Structures</h3>
      <p>
        So far, we have discussed revision trees as an abstract data structure. When designing turtleDB,
        we concluded whatever data structure we chose must satisfy these requirements:
      </p>
      <ol>
        <li>Be storable in string form; must be sendable over HTTP</li>
        <li>Store document versions incrementally, from oldest to newest</li>
        <li>Represent conflicts (forks) as intuitively as possible</li>
        <li>Imply parent-child node (version) relationships without requiring extra properties to describe those relationships</li>
        <li>Facilitate easy merging with other trees. During a sync, the client and server would
          somehow need to merge their revision trees for a document, so that document histories could be
          shared in the network, and conflicts surfaced</li>
      </ol>

      <h4>Doubly Linked Lists: Naive Solution</h4>
      <p>
        Doubly linked-lists are an option for representing trees.
      </p>

      <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>
        {doublyLinkedLists}
      </SyntaxHighlighter>
      <p>
        For turtleDB, this was not a viable option as DLL relied on memory pointers between nodes. These would be lost when
        the tree was stored in the database or stringified when sent over the network.
      </p>
      <h4>Subarrays: Naive Solution</h4>
      <p>
        The data structure should be stored in one record so it can be sent over HTTP.
        IndexedDB suffers from slower write speeds, and we did not want to add to the write load for every document update.
        This led us to experiment with an array where every sub-array represents a ‘level’ of the tree.
      </p>
      <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>
        {subArray}
      </SyntaxHighlighter>
      <p>
        The con here is traversing down through the tree and determining ancestry would be confusing. For example,
        ‘null’ would have to be inserted in sub-arrays after a node that had no children, and new branches for new
        conflicts would have to be inserted in those same index nodes further down the tree.
      </p>
      <h4>Nested Array: turtleDB's Tree Data Structure</h4>
    </div>
  )
}

export default HistoryTrees;
