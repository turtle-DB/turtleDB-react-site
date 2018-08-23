import React from 'react';
import Citation from '../../Citation'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierDuneLight } from 'react-syntax-highlighter/styles/hljs'
import { Carousel } from 'react-responsive-carousel';

const doublyLinkedLists = "class Revision {\n  constructor(rev) {\n    this.rev = rev;\n    this.prev = null;\n    this.next = null;\n  }\n}\nconst rev1 = new Revision('1-hash1');\nconst rev2 = new Revision('2-hash2');\nrev1.next = rev2;\nrev2.prev = rev1;\n\nconst rev3 = new Revision('3-hash3');\nrev2.next = rev3;\nrev3.prev = rev2;"
const subArray = "const revisions = [['1-hash1'], ['2-hash2a', '2-hash2b'], ['3-hash3a', '3-hash3b']];"
const nestedArray = "const revisions = [\'1-hash1\', [[\'2-hash1\', [[\'3-hash1\', [[\'4-hash1\', []]]]]], [\'2-hash2\', [[\'3-hash2\', []]]]]];"
const readableNestedArray = "const revisions = [\r\n\'1-hash1\', [\r\n  [\'2-hash1\', [\r\n    [\'3-hash1\', [\r\n      [\'4-hash1\', []\r\n      ]\r\n    ]]\r\n  ]], \r\n  [\'2-hash2\', [\r\n    [\'3-hash2\', []\r\n    ]\r\n  ]]\r\n]];"
const collectAllLeafRevs = "function collectAllLeafRevs(node, leafRevs = []) {\r\n  if (node[2].length === 0) leafRevs.push(node[0]);\r\n\r\n  for (let i = 0; i < node[2].length; i++) {\r\n    this.collectAllLeafRevs(node[2][i], leafRevs);\r\n  }\r\n\r\n  return leafRevs;\r\n}"
const mergeRevTrees = "function mergeRevTrees(node1, node2) {\r\n  const node1Children = node1[2];\r\n  const node2Children = node2[2];\r\n\r\n  const commonNodes = this.findCommonNodes(node1Children, node2Children);\r\n\r\n  const node2ChildrenDiffs = this.getNode2ChildrenDiffs(node1Children, node2Children);\r\n  node1[2] = [...node1Children, ...node2ChildrenDiffs];\r\n\r\n  for (let i = 0; i < commonNodes.length; i++) {\r\n    let commonNodesPair = commonNodes[i];\r\n    this.mergeRevTrees(commonNodesPair[0], commonNodesPair[1]);\r\n  }\r\n\r\n  return node1;\r\n}\r\n\r\nfunction findCommonNodes(node1Children, node2Children) {\r\n  let commonNodes = [];\r\n  for (let i = 0; i < node1Children.length; i++) {\r\n    let node1Child = node1Children[i];\r\n    for (let j = 0; j < node2Children.length; j++) {\r\n      let node2Child = node2Children[j];\r\n      if (node2Child[0] === node1Child[0]) {\r\n        commonNodes.push([node1Child, node2Child]);\r\n      }\r\n    }\r\n  }\r\n\r\n  return commonNodes;\r\n}"
const metaDoc = "{\r\n  _winningRev: \'4-hash1\',\r\n  _leafRevs: [\'4-hash1\', \'3-hash2\'],\r\n  revisions = [\'1-hash1\', [\r\n                [\'2-hash1\', [\r\n                  [\'3-hash1\', [\r\n                    [\'4-hash1\', []\r\n                    ]\r\n                  ]]\r\n                ]], \r\n                [\'2-hash2\', [\r\n                  [\'3-hash2\', []\r\n                  ]\r\n                ]]\r\n              ]]\r\n}"

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

      <div className="img-container">
        <img className="img-style" src="../images/trees/single-branch-3.png" />
      </div>

      <p>
        However, some documents might have conflicts. For example, a document could have different updates
        made to it independently by two different clients. This is represented in the tree as a ‘fork’, where
        the branch for each competing revision stems from the original point of agreement.
      </p>

      <div className="img-container">
        <img className="img-style" src="../images/trees/two-branches.png" />
      </div>

      <p>
        Over time as a document is edited by multiple parties, its tree becomes more elaborate.
        The below diagram attempts to showcase this scenario but we are limited by space.
        In reality, some documents may have hundreds or thousands of edits with more than one fork.
      </p>

      <div className="img-container">
        <img className="img-style" src="../images/trees/many-branches.png" />
      </div>

      <p>
        In addition to tracking document versions, we also want the tree to track deletes.
        In turtleDB, we treat deletes as a special kind of update where a node is added to the tree
        to represent a deleted ‘revision’ of a document.
      </p>

      <div className="img-container">
        <img className="img-style" src="../images/trees/deleted-doc.png"/>
      </div>

      <h4>Leaf Nodes</h4>
      <p>
        Throughout the rest of this paper, the last node of every branch will be referred to as a leaf node.
        This is simply a semantic distinction. Trees with no conflicts only have one leaf node;
        trees with conflicts have multiple leaf nodes that represent competing versions of a document.
      </p>
      <div className="img-container">
        <img className="w-100" src="../images/trees/leaf-nodes.png"/>
      </div>


      <h3 id="revision-ids">Revision IDs</h3>

      <p>
        A unique revision ID is needed to represent each revision in the tree. Our diagrams so far have
        this as ‘revision 1’, ‘revision 2’ but in turtleDB, we actually have a process in generating these.
      </p>

      <div className="img-container">
        <img className="w-100" src="../images/trees/revision-ids.png"/>
      </div>

      <p>
        The first half of the revision ID is a number that is incremented for every revision. On creation,
        a document will always be “1-[hash]”, and the first update done to that document will result in
        “2-[hash]”, etc. We therefore know exactly how many times a document has been updated. The contents
        of a revision along with the revision ID of its parent node is hashed to generate a revision ID.
      </p>
      <p>
        We use the MD5 hashing algorithm but really, any hashing algorithm can work.
        Hashing plays a role in how turtleDB detects conflicts. As explained later in this paper, the hashes
        are also used to detect conflicts. Hashing therefore provides a positive side-effect.
        Two clients might independently edit the same document. If they happen to make the exact
        same update to that document, their hashes will
        be the same and therefore no conflict is generated.
      </p>

      <h3 id="tree-data-structures">Tree Data Structure - Nested Arrays</h3>
      <p>
        So far, we have discussed revision trees as an abstract data structure. When designing turtleDB,
        we concluded whatever data structure we chose must satisfy these requirements:
      </p>
      <ol>
        <li>Be storable in string form; must be sendable over HTTP</li>
        <li>Store document versions incrementally, from oldest to newest</li>
        <li>Represent conflicts (forks) as intuitively as possible</li>
        <li>Imply parent-child node (version) relationships without requiring extra properties to describe those relationships</li>
        <li>Facilitate easy merging with other trees. During a sync, the client and server
          somehow need to merge their revision trees for a document, so that document histories can be
          shared in the network, and conflicts surfaced</li>
      </ol>

      <h4>Doubly Linked Lists</h4>
      <p>
        Doubly linked-lists are an option for representing trees.
      </p>

      <div className="pre-container">
        <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>
          {doublyLinkedLists}
        </SyntaxHighlighter>
      </div>

      <p>
        For turtleDB, they were not a viable option as they relied on memory pointers
        between nodes that would be lost when the tree was stored in the database or
        stringified and sent over the network.
      </p>
      <h4>Subarrays</h4>
      <p>
        The data structure should be stored in one record so it can be sent over HTTP.
        IndexedDB suffers from slower write speeds, and we did not want to add to the write load for every document update.
        This led us to experiment with an array where every sub-array represents a ‘level’ of the tree.
      </p>
      <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>
        {subArray}
      </SyntaxHighlighter>
      <p>
        The con here is traversing down through the tree and determining ancestry would be confusing.
        For example, ‘null’ would have to be inserted in sub-arrays after a node that had no children,
        and new branches for new conflicts would have to be inserted in those same index nodes further
        down the tree.
      </p>
      <h4>Nested Array: turtleDB’s Tree Data Structure</h4>
      <p>
        In the end, we settled on a nested array structure where every node was placed within its
        own sub-array, nested within its parent’s sub-array:
      </p>

      <div className="img-container">
        <img className="w-100" src="../images/trees/nested-arrays.png"/>
      </div>

      <p>
        From the outside, this data structure looks confusing but it is actually easy to work with.
        A full traversal is accomplished in O(N) space and time with a simple recursive function.
      </p>
      <p>
        The other advantage of this structure is that accessing and splicing sub-sections (branches) of the
        trees can be done very easily. A node-subarray contains all of its own descendants in a subarray.
        This property is invaluable for <a href="#">merging</a>.
      </p>
      <p>
        The below shows our nested array structure in a more readable format next to a c
        onceptual diagram of its equivalent tree:
      </p>

      <div className="img-container">
        <img className="w-100" src="../images/trees/tree-diagram-1.png"/>
      </div>

      <h4>Meta Documents</h4>

      <p>
        The nested array structure we just described became the data structure for turtleDB’s revision trees.
        It could be stored as a value in IndexedDB’s key-value store, with the document ID as the key.
      </p>
      <p>
        We call this record representing one document a ‘meta document’. With the revision tree,
        it keeps track of all the changes a document has undergone. Along with the revision, the
        meta document contains a few more properties which exist primarily to help
        efficiently manage conflicts.
      </p>

      <div className="img-container">
        <img className="w-100" src="../images/trees/meta-document.png"/>
      </div>

      <p>
        The first is a reference to the ‘winning revision’ of a document, and the second is an array of
        ‘leaf revisions’ that exist at the end of branches in the revision tree.
      </p>

      <div className="pre-container">
        <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>
          {metaDoc}
        </SyntaxHighlighter>
      </div>

      <p>
        This is what an example meta document looks like. So how do we traverse the document history tree?
      </p>

      <h3 id="tree-algorithms">Tree Algorithms</h3>
      <p>
        turtleDB needs to handle:
      </p>
      <ul>
        <li>Updating the tree when a document is updated or deleted</li>
        <li>Merging trees when a client and server sync</li>
        <li>Using the tree to identify the latest revision of a document and all competing revisions </li>
      </ul>

      <h4>Updates & Deletes</h4>
      <p>
        Deleting or updating a document is simple to conceptualize. A new node is added as a child of an existing leaf node.
      </p>
      <p>
        Because our trees are stored in a database and lack memory pointers to their leaf nodes, we have to do a full traversal of the tree down to the latest version (leaf node).
        This is the recursive function we developed:
      </p>

      <div className="pre-container">
        <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>
          {collectAllLeafRevs}
        </SyntaxHighlighter>
      </div>

      <div className="img-container">
        <img className="w-100" src="../images/trees/updates-deletes.png"/>
      </div>

      <p>This process is O(N) time and space.</p>

      <h4>Merging Trees</h4>
      <p>
        Meta documents are shared between a client and server during a sync. When syncing has completed,
        both parties should have an updated meta document with the same merged tree, containing all
        document updates and creates.
      </p>
      <p>
        Tree merging always happens on the server after the client has sent over its document trees.
        Changes in the client tree are spliced into the server tree,
        and the result is sent back to the client.
      </p>

      <div className="img-container">
        <img className="w-100" src="../images/trees/merging-two-trees.png"/>
      </div>

      <p>
        For example, the server tree (left) combines the changes from the client tree (middle) and we get the resulting tree (right).
      </p>
      <p>
        The merging algorithm starts at the head node of each tree, and recursively traverses down through
        common pairs of nodes. At each node pair, the algorithm compares the children nodes to find
        discrepancies; indicating what needs to be merged into the server tree.
      </p>
      <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>
        {mergeRevTrees}
      </SyntaxHighlighter>
      <p>
        Overall, the Big O complexity of merging is determined by the intersection of the two trees;
        the number of common nodes between trees that are recursively traversed.
      </p>


      <h5>Comparing Children - O(N * M)</h5>
      <p>
        When multiple children exist on a node pair,
        the common children must be paired off for further recursion,
        while the discrepancies need to be added to the server tree.
      </p>

      <p>
        This is an O(N * M) operation, as we cannot guarantee child nodes will always be sorted.
        Conflicts should be rare in document histories as clients typically converge on one revision,
        so while this step looks slow on paper, it should not be a common occurrence.
      </p>


      <h5>Handling Discrepancies - O(1)</h5>
      <p>Child nodes in the client tree that do not exist in the server tree represent changes that need to
         be spliced in. The new child node could be the start of a long branch of updates from the client.
         Our function takes advantage of the nested array structure to access that entire
         branch held within the child node sub-array, and splice it into the server tree in one step.
      </p>
      <p>
        This is a powerful addition for an offline-first framework, as clients might make many updates before syncing.
        In that time, they may have generated hundreds of updates on individual documents.
        Merging that history in one step speeds up the sync process.
      </p>
      <p>
        This slideshow illustrates the parallel traversal of two trees, comparing children and merging in new branches:
      </p>

      <Carousel showArrows={true}>
        <div>
          <img src="../images/trees/merge-trees-0.png" />
        </div>
        <div>
          <img src="../images/trees/merge-trees-1.png" />
        </div>
        <div>
          <img src="../images/trees/merge-trees-2.png" />
        </div>
        <div>
          <img src="../images/trees/merge-trees-3.png" />
        </div>
        <div>
          <img src="../images/trees/merge-trees-4.png" />
        </div>
        <div>
          <img src="../images/trees/merge-trees-5.png" />
        </div>
        <div>
          <img src="../images/trees/merge-trees-6.png" />
        </div>
        <div>
          <img src="../images/trees/merge-trees-7.png" />
        </div>
      </Carousel>

      <p>
        <em>It is important to note when we say that branch slicing is a O(1) step, we are talking about just the
        branch slicing step itself and not the tree traversal up to the point where the server and client differ.
        </em>
      </p>

      <h4>Identifying Leaf Revisions</h4>
      <div className="img-container">
        <img className="w-100" src="../images/trees/find-leaf-versions.png"/>
      </div>

      <p>
        The purpose of having revision trees is to easily determine conflicting versions of a document.
        A potential downside to the tree structure is that a full traversal is needed to reach these
        conflicting versions. We solved this problem by introducing a separate property on the meta document
        called “_leafRevs” which contains all the most up-to-date versions of a document.
      </p>
      <p>
        Developers can therefore look up and access those leaf nodes in constant time, or O(1).
      </p>

      <div className="pre-container">
        <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>
          {metaDoc}
        </SyntaxHighlighter>
      </div>

    <p>
      While reads are O(1), the “_leafRevs” array needs to be constantly kept up to date.
      We added code within our update, delete, and merge functions to update the array
      <strong>while</strong> the tree was being traversed. This means keeping the
       tree updated takes O(N) but
      it piggybacks on other operations and is outweighed by the many O(1) reads.
    </p>

    </div>
  )
}

export default HistoryTrees;
