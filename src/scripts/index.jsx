import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import injectTapEventPlugin from 'react-tap-event-plugin';
// import router configuration
import './router.config.jsx';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


ReactDOM.render(
  <App />,
  document.getElementById('app')
);
