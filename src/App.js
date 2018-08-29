import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header'
import Error from './components/Error'

import Home from './components/Pages/Home'
import Api from './components/Pages/Api'
import Demo from './components/Pages/Demo'
import About from './components/Pages/About'
import Team from './components/Pages/Team'
import Github from './components/Pages/Github'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight, faCheck, faPen, faTimesCircle, faPlus, faExclamationTriangle, faDownload, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faNpm, faGithub } from '@fortawesome/free-brands-svg-icons';

library.add(faArrowRight, faCircle, faCheck, faPen, faTimesCircle, faPlus, faExclamationTriangle, faNpm, faDownload, faGithub, faChevronDown);


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/api' component={Api} />
            <Route exact path='/demo' component={Demo} />
            <Route exact path='/about' component={About} />
            <Route exact path='/team' component={Team} />
            <Route exact path='/github' component={Github} />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
