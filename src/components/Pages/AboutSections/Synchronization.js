import { Carousel } from 'react-responsive-carousel';

import React from 'react';
import Citation from '../../Citation'

const Synchronization = () => {
  return (
    <div className="container">
      <h2 id='synchronization'>Synchronization</h2>
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
      <h3 id="example-sync-process">How A Sync Looks</h3>
      <p>
        The best way to demonstrate how turtleDB syncs is to run through a example. Have
        a click through the slides. We broke it down so that our HTTP request-response cycles
        look like a dialogue between the client and server (which it actually is!).
      </p>

        <Carousel showArrows={true}>
          <div>
            <img src="../images/sync/1.png" />
          </div>
          <div>
            <img src="../images/sync/2.png" />
          </div>
          <div>
            <img src="../images/sync/3.png" />
          </div>
          <div>
            <img src="../images/sync/4.png" />
          </div>
          <div>
            <img src="../images/sync/5.png" />
          </div>
          <div>
            <img src="../images/sync/6.png" />
          </div>
          <div>
            <img src="../images/sync/7.png" />
          </div>
          <div>
            <img src="../images/sync/8.png" />
          </div>
          <div>
            <img src="../images/sync/9.png" />
          </div>
          <div>
            <img src="../images/sync/10.png" />
          </div>
          <div>
            <img src="../images/sync/11.png" />
          </div>
          <div>
            <img src="../images/sync/12.png" />
          </div>
          <div>
            <img src="../images/sync/13.png" />
          </div>
          <div>
            <img src="../images/sync/14.png" />
          </div>
          <div>
            <img src="../images/sync/15.png" />
          </div>
          <div>
            <img src="../images/sync/16.png" />
          </div>
          <div>
            <img src="../images/sync/17.png" />
          </div>
          <div>
            <img src="../images/sync/18.png" />
          </div>
          <div>
            <img src="../images/sync/19.png" />
          </div>
          <div>
            <img src="../images/sync/20.png" />
          </div>
          <div>
            <img src="../images/sync/21.png" />
          </div>
          <div>
            <img src="../images/sync/22.png" />
          </div>
        </Carousel>
    </div>
  )
}

export default Synchronization;
