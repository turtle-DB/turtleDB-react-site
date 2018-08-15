import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Toc from './Toc/Toc'

import Introduction from './AboutSections/Introduction'
import Synchronization from './AboutSections/Synchronization'

const AboutHome = () => {
  return (
    <div className="container">
      <p><em>Please select a chapter from above!</em></p>
    </div>
  )
}

export const About = () => {
  return (
    <div className="container">
      <div>
        <h2 className="text-left">Table of Contents</h2>
        <BrowserRouter>
          <div>
            <Toc />
            <Switch>
              <Route exact path='/about/' component={AboutHome} />
              <Route exact path='/about/introduction' component={Introduction} />
              <Route exact path='/about/synchronization' component={Synchronization} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default About;
