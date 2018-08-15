import React from 'react';
import Citation from '../../Citation'

const Synchronization = () => {
  return (
    <div className="container">
      <h2 id='synchronization'>Introduction</h2>
      <p>Our proposal is to build a library that provides front-end applications an
        API to an in-browser, NoSQL document database. This library will be able to store data locally
        on the client, and coordinate automatic synchronization with a remote database.
        The primary use case for this is to build offline first and distributed web applications.
        <Citation
          url='https://www.html5rocks.com/en/tutorials/webrtc/infrastructure/'
          creator='Sam Dutton'
          creationDate='November 4, 2013'
          contributingOrganization='HTML5Rocks.com'
          title='WebRTC in the Real World: STUN, TURN and Signaling'
        />
      </p>
      <h3 id="components-involved-in-sync">Components Involved in Sync</h3>
      <p>
        blah blah
      </p>
    </div>
  )
}

export default Synchronization;
