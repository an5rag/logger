import UIRouterReact from 'ui-router-react';
import {visualizer} from 'ui-router-visualizer';

import states from './states';

// Create new instance of UIRouterReact
const router = new UIRouterReact();

// Loop through imported states and register them
states.forEach(state => router.stateRegistry.register(state));

// Start the router
router.start();

// Setup the state visualizer - comment out for production!
visualizer(router);
