import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header'
import Error from './components/Error'

import Home from './components/Pages/Home'
import Api from './components/Pages/Api'
import About from './components/Pages/About'
import Team from './components/Pages/Team'
import Github from './components/Pages/Github'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/api' component={Api} />
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
