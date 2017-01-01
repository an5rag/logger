import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import RootReducer from './reducers'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {UIView} from 'ui-router-react';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger'

//const loggerMiddleware = createLogger();

import ErrorModal from './pages/main/modals/errorModal';

const store = createStore(
    RootReducer,
    applyMiddleware(
        thunkMiddleware,
        // loggerMiddleware
    )
);

const App = () => (
    <div>
        <Provider store={store}>
            <MuiThemeProvider>
                <UIView/>
            </MuiThemeProvider>
        </Provider>
    </div>
);

export default App;
