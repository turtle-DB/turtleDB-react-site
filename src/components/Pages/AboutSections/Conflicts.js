import React from 'react';
import Citation from '../../Citation'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierDuneLight } from 'react-syntax-highlighter/styles/hljs'

const _getWinningRev = "function _getWinningRev(leafRevs) {\r\n    return leafRevs.sort((a, b) => {\r\n      let [revNumA, revHashA] = a.split(\'-\');\r\n      let [revNumB, revHashB] = b.split(\'-\');\r\n      revNumA = parseInt(revNumA, 10);\r\n      revNumB = parseInt(revNumB, 10);\r\n\r\n      if (revNumA > revNumB) {\r\n        return -1;\r\n      } else if (revNumA < revNumB) {\r\n        return 1;\r\n      } else {\r\n        if (revHashA > revHashB) {\r\n          return -1;\r\n        } else {\r\n          return 1;\r\n        }\r\n      }\r\n    })[0];\r\n  }";
const _conflicts = "if (metaDoc._leafRevs.length > 1) {\r\n  doc._conflicts = true;\r\n}";
const _storeDocument = "{\r\n  type: \"River Turtle\",\r\n  _conflictVersions: [\r\n    {type: \"Sea Turtle\", _id: \"turtle1\", _rev: \"2-007\"},\r\n    {type: \"Lake Turtle\", _id: \"turtle1\", _rev: \"3-202\"},\r\n    {type: \"Pond Turtle\", _id: \"turtle1\", _rev: \"3-7c9\"},\r\n  ],\r\n  _conflicts: true,\r\n  _id: \"turtle1\",\r\n  _winningRev: \"3-895\",\r\n}"
const _setConflictWinner = "function setConflictWinner(doc) {\r\n  const { _id, _rev } = doc;\r\n\r\n  return this._readMetaDoc(_id)\r\n    .then(metaDoc => this._deleteAllOtherLeafRevs(metaDoc, _rev))\r\n    .then(() => this.update(_id, doc, _rev))\r\n    .catch(err => console.log(\"setConflictWinner error:\", err));\r\n}"

const revtree1 = "[\r\n  \"1-1e5\"\r\n  {},\r\n  [\r\n    [\r\n      \"2-705\",\r\n      {},\r\n      []\r\n    ]\r\n  ]\r\n]";
const revtree2 = "[\r\n  \"1-1e5\"\r\n  {},\r\n  [\r\n    [\r\n      \"2-007\",\r\n      {},\r\n      []\r\n    ],\r\n    [\r\n      \"2-705\",\r\n      {},\r\n      []\r\n    ]\r\n  ]\r\n]";
const metadoc = "{\r\n  _id: \"turtle1\",\r\n  _leafRevs: [\"2-007\", \"2-705\"],\r\n  _revisions: [\"1-1e5\", {}, [...]],\r\n  _winningRev: \"2-705\"\r\n}";

const Conflicts = () => {
  return (
    <div>
      {/* <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>{}</SyntaxHighlighter> */}
      <h2 id='conflicts'>Conflicts</h2>
      <p>We have already touched on how important our revision tree is in enabling us to manage multiple revisions of a document and store potentially conflicting versions. Now we can take a closer look at how conflicts are both generated and resolved in our framework.</p>

      <h3 id="winning-revisions">Generating Conflicts</h3>

      <p>Conflicts created by two clients making different changes to the same document are surfaced in the sync process. At one point, each client had the same common revision, and then made different updates, resulting in revision IDs with different hashes.</p>

      <p>After one client syncs to the server, the server will have revisions that are different than what the second client has.</p>

      <p>More specifically, Tthe revision trees for the document on the client and servereach client would contain different data:</p>

      <img className="" src="../images/conflicts/1-server-client-trees.png" />









      <p>
        Conflicts are created when two or more clients make different changes to the same
        document all sync to the server. At one point, each client had the same common revision,
        and then made different updates, resulting in revision IDs with different hashes.
      </p>
      <p>
        After one client syncs to the server, the server will have revisions that are different
        than what the second client has.
      </p>
      <p>
        More specifically, the revision trees for the document on the client and server would
        contain different data:
      </p>

      <img />

      <p>
        Conflicts are revealed by the tree merging operation we outlined in the earlier section of
        <a href="#">turtleDB’s revision tree structure</a>.
      </p>
      <p>
        The server first receives the tree containing the change from the client who syncs first then receives a sync
        request with independent changes made by the second client. The trees are traversed concurrently by going
        down common revisions (nodes) held in each tree. For pair of nodes, it compares the two sets of child revisions by revision ID
        and either saves off pairs of common revisions for the next recursive traversals, or merges any
        new revisions into the server tree.
      </p>
      <p>
        When any new revisions are found, the server simply incorporates the client’s revision sub-array
        as a sibling node like this:
      </p>

      <img />

      <p>
        We can visualize this operation as creating a branch in the revision tree:
      </p>

      <img />

      <p>
        The client that last synced gets back the merged tree which now has multiple valid leaf
        revisions it could return to the user. This is what we mean when we say a document contains
        a conflict and is also where the concept of a winning revision comes in.
      </p>

      <h3 id="winning-revisions">Winning Revisions</h3>
      <p>
        The client tracks competing leaf revisions in the meta document property `_leafRevs`:
      </p>

      <img />

      <p>
        In order to provide a consistent API, turtleDB’s read method only ever returns one revision
        to the developer even when there are competing revisions. It does this by setting one revision
        as the ‘winning’ revision either by default or by developer input.
      </p>
      <p>
        The winning revision is held in the `_winningRev` property of the meta document, as seen here:
      </p>

      <img />

      <p>
        This ensures that read requests can be handled in almost O(1) time using the index on the revision store.
      </p>
      <p>
        turtleDB compares the revision IDs held in the `_leafRevs` array, which is kept up to date as the tree is updated.
        This means that winning revisions are also calculated in O(1) time.
      </p>
      <p>
        By default, we pick a winning revision using a deterministic algorithm:
      </p>
      <ol>
        <li>
          Longest Branch - Each leaf revision ID includes a number, indicating the number of updates on that branch.
          The revision ID with the highest number (the most updates) becomes the winning revision.
        </li>
        <li>
          Lexicographically - In the case that two or more branches have the same number of revisions, the hashes of those leaf revisions are compared lexicographically
        </li>
      </ol>
      <p>
        In code, our algorithm looks like:
      </p>
      <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>
        {_getWinningRev}
      </SyntaxHighlighter>
      <p>
        The longest branch approach is the best default strategy turtleDB can use to support a wide range of applications without knowing their internal logic. It equates
        to using “proof of work”, i.e. going with the revision that received the most updates.
      </p>
      <h4>Indicating Conflicts</h4>
      <p>
        turtleDB surfaces conflicts for developers automcatically. When a document is read that has more than one leaf revision, turtleDB adds a `_conflicts` property.
      </p>
      <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>
        {_conflicts}
      </SyntaxHighlighter>
      <p>
        This makes it easy for turtleDB users to check for conflicts. turtleDB goes further by automatically returning all conflicting revisions as well.
        These are placed within a property, `_conflictVersions` on the returned document.
      </p>

      <img />

      <p>
        In practice, a returned document looks like:
      </p>
      <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>
        {_storeDocument}
      </SyntaxHighlighter>

      <h3 id="conflict-resolution">Conflict Resolution</h3>
      <p>
        Developers may want to choose their own winning revision for a document rather than accept the revision selected
        automatically by turtleDB’s deterministic algorithm.
      </p>
      <p>
        turtleDB could allow the developer to update the `_winningRev` property, but this would
        cause problems during sync. Given two different winning revisions, the server would have
        to pick just one. This would require the use of the deterministic algorithm all over again
        on all leaf nodes.
      </p>
      <p>
        Instead, all competing revisions other than the selected winner need to be marked as deleted.
        This deletion is propagated across the network after syncing:
      </p>

      <img />

      <p>
        However, this approach has a risk. If two clients each pick different winners all branches
        would be marked as deleted and the document could not be worked on any further.
      </p>

      <img />

      <p>
        turtleDB adds one more step to the developer API to select a winner. An empty update
        is added to the winning revision, forcing it to persist:
      </p>

      <img />

      <p>
        This approach of deleting all of leaf revisions and adding an update to the winning revision is handled in our API
        called `setConflictWinner`:
      </p>
      <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>
        {_setConflictWinner}
      </SyntaxHighlighter>
    </div>
  )
}

export default Conflicts;
