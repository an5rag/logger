import React from 'react';
import ReactDOM from 'react-dom';
import AwesomePage from './pages/example.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
class App extends React.Component {
  render () {
    return (
      <div>
        <AwesomePage />
      </div>
    );
  }
}


ReactDOM.render(<App/>, document.getElementById('app'));
