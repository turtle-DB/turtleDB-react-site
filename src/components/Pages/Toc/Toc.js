import React from 'react';

export const Toc = () => {
  return (
    <div className="container">
      <h4 className="toc-header">Table of Contents</h4>
      <ol className="no-list-style">
        <li><a href="#introduction">Introduction</a>
          <ul>
            <li><a href="#what-is-offline-first">What is Offline-First?</a></li>
            <li><a href="#offline-first-challenges">Offline-First Challenges</a></li>
            <li><a href="#design-goals">turtleDB Design</a></li>
          </ul>
        </li>
        <li><a href="#in-browser-storage">In-Browser Storage</a>
          <ul>
            <li><a href="#storage-options">Storage Options</a></li>
            <li><a href="#idb">IndexedDB</a></li>
            <li><a href="#idb-and-promises">IDB and Promises</a></li>
            <li><a href="#turtledb-developer-api">turtleDB Developer API</a></li>
          </ul>
        </li>
        <li><a href="#document-versioning">Document Versioning</a>
          <ul>
            <li><a href="#last-write-wins">Last Write Wins</a></li>
            <li><a href="#keep-conflicting-revisions">Keep Conflicting Revisions</a></li>
            <li><a href="#document-history">Document History</a></li>
          </ul>
        </li>
        <li><a href="#history-trees">Document History Trees</a>
          <ul>
            <li><a href="#documents-and-revisions">Documents and Revisions</a></li>
            <li><a href="#tree-data-structures">Tree Data Structures</a></li>
            <li><a href="#nested-arrays">Nested Arrays</a></li>
            <li><a href="#tree-algorithms">Tree Algorithms</a></li>
            <li><a href="#idb-schema-implementation">IDB Schema Implementation</a></li>
          </ul>
        </li>
        <li><a href="#synchronization">Synchronization</a>
          <ul>
            <li><a href="#architecture">Architecture</a></li>
            <li><a href="#synchronization-challenges">Synchronization Challenges</a></li>
          </ul>
        </li>
        <li><a href="#conflicts">Conflicts</a>
          <ul>
            <li><a href="#generating-conflicts">Generating Conflicts</a></li>
            <li><a href="#identifying-conflicts">Identifying Conflicts</a></li>
            <li><a href="#resolving-conflicts">Resolving Conflicts</a></li>
          </ul>
        </li>
        <li><a href="#scalability">Scalability</a>
          <ul>
            <li><a href="#idb-limits">IndexedDB Limits</a></li>
            <li><a href="#compaction">Compaction</a></li>
            <li><a href="#idb-performance">IndexedDB Performance</a></li>
            <li><a href="#sync-efficiency">Sync Efficiency</a></li>
          </ul>
        </li>
        <li><a href="#future-work">Future Work</a></li>
        <li><a href="#team">The turtleDB Team</a></li>
      </ol>
    </div>
  );
};

export default Toc;
