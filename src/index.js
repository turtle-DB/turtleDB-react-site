import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css'
import "./assets/styles/index.css"
import "./assets/styles/bass.css"
import './assets/styles/github.css'
import './assets/styles/split.css'
import './assets/styles/docs.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './assets/styles/style.css'
import './assets/styles/api.css'
import './assets/styles/turtleStyles.css'
import './assets/styles/demo.css'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
