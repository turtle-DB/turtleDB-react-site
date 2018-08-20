import React from 'react';

export const Toc = () => {
  return (
    <div className="container">
      <h4 className="text-center">Table of Contents</h4>
      <ol>
        <li><a href="#introduction">Introduction</a>
          <ul>
            <li><a href="#what-is-offline-first">What is Offline-First?</a></li>
            <li><a href="#offline-first-architecture">Offline-First Architecture</a></li>
            <li><a href="#introducing-turtledb">Introducing turtleDB</a></li>
          </ul>
        </li>
        <li><a href="#in-browser-storage">In-Browser Storage</a>
          <ul>
            <li><a href="#idb">IndexedDB</a></li>
            <li><a href="#turtledb-promise-api">turtleDB's Promise API</a></li>
          </ul>
        </li>
        <li><a href="#document-versioning">Document Versionining</a>
          <ul>
            <li><a>How turtleDB Manages Versions</a></li>
            <li><a>Documents and Meta Documents</a></li>
            <li><a>Promises</a></li>
          </ul>
        </li>
        <li><a href="#history-trees">History Trees</a>
          <ul>
            <li><a>Tree Data Structures</a></li>
            <li><a>Algorithmic Analysis</a></li>
          </ul>
        </li>
        <li><a href="#turtleDB-architecture">turtleDB Architecture</a>
          <ul>
            <li><a>Design</a></li>
            <li><a>API</a></li>
            <li><a>Stores: Components involved in Synchronization</a></li>
          </ul>
        </li>
        <li><a href="#synchronization">Synchronization: A Two-Part Process</a>
          <ul>
            <li><a>Overview</a></li>
            <li><a>syncTo()</a></li>
            <li><a>syncFrom()</a></li>
            <li><a>Optimizations</a></li>
          </ul>
        </li>
        <li><a href="#conflicts">Conflicts</a>
          <ul>
            <li><a>What is a Conflict?</a></li>
            <li><a>Tree Merging</a></li>
          </ul>
        </li>
        <li><a href="#scalability">Scalability</a>
          <ul>
            <li>...</li>
            <li>...</li>
          </ul>
        </li>
        <li><a href="#future-work">Future Work</a>
          <ul>
            <li>Service Workers</li>
            <li>Websockets</li>
          </ul>
        </li>
        <li><a href="#references">References</a></li>
      </ol>
    </div>
  );
};

export default Toc;
