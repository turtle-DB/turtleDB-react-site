import React from 'react';
import Citation from '../../Citation'

const InBrowserStorage = () => {
  return (
    <div className="container">
      <h2 id='in-browser-storage'>In-Browser Storage</h2>
      <blockquote className="blockquote mb-0">
        <hr></hr>
        <p>“IndexedDB API is powerful, but may seem too complicated for simple cases.”
          <Citation
            url='https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API'
            creator='Mozilla Developer Network'
            creationDate='June 14, 2018'
            contributingOrganization='MDN'
            title='IndexedDB API'
          />
        </p>
        <hr></hr>
      </blockquote>
    </div>
  )
}

export default InBrowserStorage;
