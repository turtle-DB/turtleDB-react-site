import React from 'react';

export const TocMobile = () => {
  return (
    <div>
      <h4>Table of Contents</h4>
      <ol className="no-list-style">
        <li><a href="#introduction">Introduction</a></li>
        <li><a href="#in-browser-storage">In-Browser Storage</a></li>
        <li><a href="#document-versioning">Document Versionining</a></li>
        <li><a href="#history-trees">History Trees</a></li>
        <li><a href="#turtleDB-architecture">turtleDB Architecture</a></li>
        <li><a href="#synchronization">Synchronization: A Two-Part Process</a></li>
        <li><a href="#conflicts">Conflicts</a></li>
        <li><a href="#scalability">Scalability</a></li>
        <li><a href="#future-work">Future Work</a></li>
        <li><a href="#team">The turtleDB Team</a></li>
      </ol>
    </div>
  );
};

export default TocMobile;
