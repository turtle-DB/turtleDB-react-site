import React from 'react';
import { Link } from 'react-router-dom'

export const Toc = () => {
  return (
    <div className="row">
      <div className="col-6">
        <ol>
          <li>
            <Link to='/about/introduction'>
              <a href="#introduction">Introduction</a>
            </Link>
            <ul>
              <li>Why Promises?</li>
              <li>Concurrency vs Parallelism in Javascript</li>
            </ul>
          </li>
          <li>
            <Link to='/about/synchronization'>
              <a>Synchronization: A Two-Part Process</a>
            </Link>
            <ul>
              <li>syncTo()</li>
              <li>syncFrom()</li>
            </ul>
          </li>
          <li>
            <Link to='/about/conflict-resolution'>
              <a>Conflict Resolution</a>
            </Link>
            <ul>
              <li>Merging Revision Trees</li>
            </ul>
          </li>
        </ol>
      </div>

      <div className="col-6">
        <ol start="4">
          <li>
            <Link to='/about/optimizations'>
              <a>Optimizations</a>
            </Link>
            <ul>
              <li>Batching</li>
              <li>Compaction</li>
            </ul>
          </li>
          <li>
            <Link to='/about/future-improvements'>
              <a>Future Improvements</a>
            </Link>
            <ul>
              <li>Service Workers</li>
              <li>Authentication</li>
            </ul>
          </li>
        </ol>
      </div>
      <hr></hr>
    </div>
  );
};

export default Toc;
