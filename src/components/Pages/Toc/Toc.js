import React from 'react';

export const Toc = () => {
  return (
    <div className="container">
      <h4 className="toc-header">Table of Contents</h4>
      <ol className="no-list-style">
        <li><a href="#introduction">Introduction</a>
          <ul>
            <li><a href="#what-is-offline-first">What is Offline-First?</a></li>
            <li><a href="#offline-first-architecture">Offline-First Architecture</a></li>
            <li><a href="#introducing-turtledb">Introducing turtleDB</a></li>
          </ul>
        </li>
        <li><a href="#in-browser-storage">In-Browser Storage</a>
          <ul>
            <li><a href="#storage-options">Storage Options</a></li>
            <li><a href="#idb">IndexedDB</a></li>
            <li><a href="#turtledb-promise-api">turtleDB's Promise API</a></li>
          </ul>
        </li>
        <li><a href="#document-versioning">Document Versionining</a>
          <ul>
            <li><a href="#last-write-wins">Last Write Wins</a></li>
            <li><a href="#keep-conflicting-revisions">Keep Conflicting Revisions</a></li>
            <li><a href="#document-history">Document History</a></li>
          </ul>
        </li>
        <li><a href="#history-trees">Document History Trees</a>
          <ul>
            <li><a href="#revision-ids">Revision IDs</a></li>
            <li><a href="#tree-data-structures">Tree Data Structures</a></li>
          </ul>
        </li>
        <li><a href="#turtleDB-architecture">turtleDB Architecture</a>
          <ul>
            <li><a href="#turtledb-stores">turtleDB Stores</a></li>
          </ul>
        </li>
        <li><a href="#synchronization">Synchronization</a>
          <ul>
            <li><a href="#sync-to">syncTo()</a></li>
            <li><a href="#sync-from">syncFrom()</a></li>
            <li><a href="#batching">Batching</a></li>
            <li><a href="#sync-walkthrough">Sync Walkthrough</a></li>
          </ul>
        </li>
        <li><a href="#conflicts">Conflicts</a>
          <ul>
            <li><a href="#generating-conflicts">Generating Conflicts</a></li>
            <li><a href="#surfacing-conflicts">Surfacing Conflicts</a></li>
            <li><a href="#winning-revisions">Winning Revisions</a></li>
            <li><a href="#indicating-conflicts">Indicating Conflicts</a></li>
            <li><a href="#conflict-resolution">Conflict Resolution</a></li>
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
        <li><a href="#future-work">Future Work</a>
        </li>
        <li><a href="#references">References</a></li>
      </ol>
    </div>
  );
};

export default Toc;
