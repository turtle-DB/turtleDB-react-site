import React from 'react';
import StickyBox from "react-sticky-box";

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Toc from './Toc/Toc'
import TocMobile from './Toc/TocMobile'

import Introduction from './AboutSections/Introduction'
import InBrowserStorage from './AboutSections/InBrowserStorage'
import DocumentVersioning from './AboutSections/DocumentVersioning'
import HistoryTrees from './AboutSections/HistoryTrees'
import TurtleDBArchitecture from './AboutSections/TurtleDBArchitecture'
import Synchronization from './AboutSections/Synchronization'
import Conflicts from './AboutSections/Conflicts'
import Scalability from './AboutSections/Scalability'
import FutureWork from './AboutSections/FutureWork'
import References from './AboutSections/References'

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
      <div className="row">
        <div className="d-none d-md-block col-md-3">
          <StickyBox bottom={false} offset={25}>
            <h2 className="text-left">Table of Contents</h2>
            <Toc />
          </StickyBox>
        </div>
        <div className="col-xs-12 d-md-none">
          <TocMobile />
        </div>
        <div className="col-sm-12 col-md-9">
          <Introduction/>
          <InBrowserStorage/>
          <DocumentVersioning/>
          <HistoryTrees/>
          <TurtleDBArchitecture/>
          <Synchronization/>
          <Conflicts/>
          <Scalability/>
          <FutureWork/>
          <References/>
        </div>
      </div>
    </div>
  );
};

export default About;
