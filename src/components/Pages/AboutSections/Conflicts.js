import React from 'react';
import Citation from '../../Citation'
import { Carousel } from 'react-responsive-carousel';

import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierDuneLight } from 'react-syntax-highlighter/styles/hljs'

const _getWinningRev = "function _getWinningRev(leafRevs) {\r\n    return leafRevs.sort((a, b) => {\r\n      let [revNumA, revHashA] = a.split(\'-\');\r\n      let [revNumB, revHashB] = b.split(\'-\');\r\n      revNumA = parseInt(revNumA, 10);\r\n      revNumB = parseInt(revNumB, 10);\r\n\r\n      if (revNumA > revNumB) {\r\n        return -1;\r\n      } else if (revNumA < revNumB) {\r\n        return 1;\r\n      } else {\r\n        if (revHashA > revHashB) {\r\n          return -1;\r\n        } else {\r\n          return 1;\r\n        }\r\n      }\r\n    })[0];\r\n  }";
const _conflicts = "if (metaDoc._leafRevs.length > 1) {\r\n  doc._conflicts = true;\r\n}";
const _storeDocument = "{\r\n  type: \"River Turtle\",\r\n  _conflictVersions: [\r\n    {type: \"Sea Turtle\", _id: \"turtle1\", _rev: \"2-007\"},\r\n    {type: \"Lake Turtle\", _id: \"turtle1\", _rev: \"3-202\"},\r\n    {type: \"Pond Turtle\", _id: \"turtle1\", _rev: \"3-7c9\"},\r\n  ],\r\n  _conflicts: true,\r\n  _id: \"turtle1\",\r\n  _winningRev: \"3-895\",\r\n}"
const _setConflictWinner = "function setConflictWinner(doc) {\r\n  const { _id, _rev } = doc;\r\n\r\n  return this._readMetaDoc(_id)\r\n    .then(metaDoc => this._deleteAllOtherLeafRevs(metaDoc, _rev))\r\n    .then(() => this.update(_id, doc, _rev))\r\n    .catch(err => console.log(\"setConflictWinner error:\", err));\r\n}";

const _conflictVersions = "if (metaDoc._leafRevs.length > 1) {\r\n  doc._conflicts = true;\r\n  doc._conflictVersions = [];\r\n\r\n  let conflictRevs = metaDoc._leafRevs.filter(rev => rev !== doc._rev);\r\n  let promises = conflictRevs.map(rev => {\r\n    return this._readRevFromIndex(metaDoc._id, rev)\r\n      .then(version => {\r\n        [version._id, version._rev] = version._id_rev.split(\'::\');\r\n        delete version._id_rev;\r\n        doc._conflictVersions.push(version);\r\n      });\r\n    });\r\n\r\n\/\/...";

const Conflicts = () => {
  return (
    <div>
      <h2 id='conflicts'>Conflicts</h2>
      <p>With a working sync protocol, all clients were now receiving each other’s changes - both as document versions, and updated history trees created by the server.
</p>

      <p>In a previous section, tracking document histories in revision trees was introduced as a way to track conflicting changes by different clients. The remaining challenge was to ensure that turtleDB could identify these conflicts for developers, and allow them to be resolved.
</p>

      <h3 id="surfacing-conflicts">Generating Conflicts</h3>

      <p>Briefly, we can reiterate how conflicts are generated and located in a document history tree. </p>

      <p>Conflicts are created when two clients make different changes to the same document. At one point, each client had the same common revision, and then made different updates, resulting in revision IDs with different hashes.
</p>

      <p>When a server merges two history trees  (using the tree merging operation we outlined in a previous section), it creates two branches, treating the two revisions as siblings. </p>

      <div className="img-container">
        <img className="img-style" src="../images/conflicts/1-server-client-trees.png" />
      </div>

      <p>After syncing:</p>

      <div className="img-container">
        <img className="img-style" src="../images/conflicts/2-merged-tree.png" />
      </div>

      <p>We can also visualize the operation with this diagram:
</p>

      <div className="img-container">
        <img className="img-style" src="../images/conflicts/3-tree-diagram.png" />
      </div>

      <h3 id="winning-revisions">Identifying Conflicts</h3>

      <p>This operation meant that clients could access conflicts in the updated meta documents returned to them in a sync session. The next question was how they could identify those conflicts for the developer. </p>

      <h4>Leaf Revisions Array</h4>

      <p>Conflicts are defined as history trees that have more than one ‘leaf node’, i.e, active revisions. One option would be for clients to check for multiple leaf nodes every time the meta document was accessed, for example in a typical read query. The recursive traversal to do this would obviously become an expensive operation for documents with large histories.
</p>

      <p>Instead, we added an optimization by tracking the revision IDs of leaf nodes in a “_leafRevs” array on the meta document. At the end of a tree merging operation on the server, the server updates this array.</p>

      <div className="img-container">
        <img className="img-style" src="../images/conflicts/4-leaf-revs.png" />
      </div>

      <p>The result was that clients could check for conflicts in O(1) time, by looking at the length of the “_leafRevs” array. </p>

      <h4>Developer API</h4>

      <p>This implementation made it much more efficient to indicate conflicts to the developer. </p>

      <p>First, we added a “_conflicts” boolean to meta documents, updated by turtleDB based on the length of the “_leafRevs” array. Developers can easily check for conflicts in returned documents. </p>

      <p>We then added functionality to the read query to automatically return all conflicting revisions as well. These are placed within a property, ‘_conflictVersions’, on the returned document. Returning them in this format allows developers to ignore them if they choose.</p>

      <p>This is the relevant section of the read() method:</p>

      <div className="img-container">
        <img className="img-style" src="../images/conflicts/6-conflict-versions.png" />
      </div>

      <p>The  returned document would look like this in practice:</p>

      <div className="pre-container">
        <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>{_storeDocument}</SyntaxHighlighter>
      </div>

      <h3>Resolving Conflicts</h3>

      <p>The only remaining requirement was to allow these conflicts to be resolved. This introduced a few challenges that can be outlined briefly.</p>

      <h4>Default Winners</h4>

      <p>First, we decided that turtleDB needed to be able to arbitrarily ‘pick’ a winner if the developer had not. From a feature perspective, this would enable apps to continue functioning by always showing one version of a document. This default winner also needed to be picked efficiently, as it would occur for all document conflicts that had not been reviewed by the developer’s code.</p>

      <p>Leveraging our approach to document history, turtleDB takes the leaf node from the longer branch, as the longer branch indicates more ‘work’. We were able to do this very efficiently: leaf nodes have their revision IDs stored in the “_leafRevs” array, and their branch length is indicated by the version number within the revision ID (i.e., the ‘3’ in revision ID “3-xyz”). For two nodes with the same number, their strings were sorted lexicographically to determine an arbitrary winner.</p>

      <p>This is the relevant function:</p>

      <div className="pre-container">
        <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>{_getWinningRev}</SyntaxHighlighter>
      </div>

      <p>To prevent this comparison from being run repeatedly, the ID of the winning revision is held in another meta document property, ‘winningRev’. </p>

      <div className="img-container">
        <img className="img-style" src="../images/conflicts/5-winning-rev.png" />
      </div>

      <p>This means that all read queries on a client are not affected by whether conflicts have been resolved or not. Update queries only have to briefly update the “_winningRev” property if necessary.</p>

      <h4>Developer API - Picking a Winner</h4>

      <p>Finally, turtleDB needed to enable developers to pick conflict winners, in a way that could be communicated across the network within the existing sync protocol.</p>

      <p>Given the document history trees, the simplest approach would be to add a ‘delete’ node on the end of every leaf node not picked as the winner. These deletes would be propagated across the network by syncing.</p>

      <Carousel showArrows={true}>
        <div>
          <img src="../images/conflicts/7-1-slideshow1.png" />
        </div>
        <div>
          <img src="../images/conflicts/8-2-slideshow1.png" />
        </div>
        <div>
          <img src="../images/conflicts/9-3-slideshow1.png" />
        </div>
      </Carousel>

      <p>However, this approach introduced a risk. If two clients picked two different winners, all leaf nodes would be marked as deleted, and the document would not be worked on any longer. </p>

      <Carousel showArrows={true}>
        <div>
          <img src="../images/conflicts/10-1-slideshow2.png" />
        </div>
        <div>
          <img src="../images/conflicts/11-2-slideshow2.png" />
        </div>
        <div>
          <img src="../images/conflicts/12-3-slideshow2.png" />
        </div>
        <div>
          <img src="../images/conflicts/13-4-slideshow2.png" />
        </div>
      </Carousel>

      <p>We therefore added one more step to conflict resolution. An empty update is added to the winning revision, which forces it to persist in case there is a “conflicting” delete:</p>

      <Carousel showArrows={true}>
        <div>
          <img src="../images/conflicts/14-1-slideshow3.png" />
        </div>
        <div>
          <img src="../images/conflicts/15-2-slideshow3.png" />
        </div>
        <div>
          <img src="../images/conflicts/16-3-slideshow3.png" />
        </div>
        <div>
          <img src="../images/conflicts/17-4-slideshow3.png" />
        </div>
      </Carousel>

      <p>This approach of deleting all of leaf revisions and adding an update to the winning revision, is handled in our API method called `setConflictWinner`:
</p>

      <div className="pre-container">
        <SyntaxHighlighter language="javascript" style={atelierDuneLight} showLineNumbers>{_setConflictWinner}</SyntaxHighlighter>
      </div>

      <h4>Conclusion</h4>

      <p>Once we introduced document history trees, conflicts were easily defined and identified. We built on the tree merging operation to maintain a list of document leaf nodes that was stored in meta document objects. This list enabled efficient conflict identification, access to conflicting versions, and picking of default conflict winners. </p>

      <p>Once this list was in place, the developer API methods came together easily. The only other challenge was handling conflicting deletes of leaf nodes by clients trying to resolve conflicts.</p>

         

    </div>
  )
}

export default Conflicts;
