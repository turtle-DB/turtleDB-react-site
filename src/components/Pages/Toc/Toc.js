import React from 'react';

export const Toc = () => {
  return (
    <ol>
      <li>
        <a href="#introduction">Introduction</a>
        <ul>
          <li>Why Promises?</li>
          <li>Concurrency vs Parallelism in Javascript</li>
        </ul>
      </li>
      <li>
        <a href="#synchronization">Synchronization: A Two-Part Process</a>
        <ul>
          <li>syncTo()</li>
          <li>syncFrom()</li>
        </ul>
      </li>
      <li>
        <a>Conflict Resolution</a>
        <ul>
          <li>Merging Revision Trees</li>
        </ul>
      </li>
      <li>
        <a>Optimizations</a>
        <ul>
          <li>Batching</li>
          <li>Compaction</li>
        </ul>
      </li>
      <li>
        <a>Future Improvements</a>
        <ul>
          <li>Service Workers</li>
          <li>Authentication</li>
        </ul>
      </li>
    </ol>
  );
};

export default Toc;
