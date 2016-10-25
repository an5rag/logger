import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// import fetch polyfill
// import 'whatwg-fetch';

// import router configuration
import './router.config.jsx';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
