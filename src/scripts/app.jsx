import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {UISrefActive, UISref, UIView} from 'ui-router-react';

const App = () => (
    <div>
        <MuiThemeProvider>
            <UIView/>
        </MuiThemeProvider>
    </div>
);

export default App;
