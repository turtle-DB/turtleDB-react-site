import { Carousel } from 'react-responsive-carousel';

import React from 'react';
import Citation from '../../Citation'

const Synchronization = () => {
  return (
    <div>
      <h2 id='synchronization'>Synchronization</h2>
      <p>Synchronization is what makes turtleDB more than just a promise-based wrapper for IDB.
        We wanted to be the first to provide this functionality with MongoDB. Being the first to do something
        definitely has its appeal but more importantly, we managed to solve a core issue of distributed
        databases: <strong>consistency</strong>.
      </p>

      <p>
        Synchronizing nodes is a feature all collaborative applications must be able to offer.
      </p>
      <h3 id="sync-walkthrough">Example Sync Walkthrough</h3>
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
