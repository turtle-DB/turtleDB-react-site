import React from 'react';
import StickyBox from "react-sticky-box";

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
      <div className="row">
        <div className="col-xs-12 col-md-3">
          <StickyBox bottom={false} offset={25}>
            <h2 className="text-left">Table of Contents</h2>
            <Toc />
          </StickyBox>
        </div>
        <div className="col-xs-12 col-md-9">
          <Introduction></Introduction>
          <Synchronization></Synchronization>
        </div>
      </div>
    </div>
  );
};

export default About;
