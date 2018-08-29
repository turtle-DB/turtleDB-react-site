import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Toc from './Toc/Toc'
import TocMobile from './Toc/TocMobile'

import Introduction from './AboutSections/Introduction'
import InBrowserStorage from './AboutSections/InBrowserStorage'
import DocumentVersioning from './AboutSections/DocumentVersioning'
import HistoryTrees from './AboutSections/HistoryTrees'
import TurtleDBArchitecture from './AboutSections/turtleDBArchitecture'
import Synchronization from './AboutSections/Synchronization'
import Conflicts from './AboutSections/Conflicts'
import Scalability from './AboutSections/Scalability'
import FutureWork from './AboutSections/FutureWork'
import Team from './AboutSections/Team'

export const About = () => {
  return (
    <div className="about">
      <div className="row main-container">
        <div className="toc d-none d-md-inline-block col-md-3">
          <Toc />
        </div>
        <div className="col-xs-12 d-md-none padding">
          <TocMobile />
        </div>
        <div className="col-sm-12 col-md-9 padding max-width turtle-padding">
          <Introduction />
          <InBrowserStorage />
          <DocumentVersioning />
          <HistoryTrees />
          <TurtleDBArchitecture />
          <Synchronization />
          <Conflicts />
          <Scalability />
          <FutureWork />
          <Team />
        </div>
      </div>
    </div>
  );
};

export default About;
