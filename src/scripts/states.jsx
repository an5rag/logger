import Dashboard from './pages/main/dashboard/dashboard';
import Log from './pages/main/log/log'
import Main from './pages/main/main';
import Login from './pages/login/login';
import Create from './pages/main/create/create';

//building blocks
import {NavBarTest} from './buildingBlocks/navbar';
import {LoginBoxTest} from './buildingBlocks/loginBox';
import {TableTest} from './buildingBlocks/table';
import {SearchBoxTest} from './buildingBlocks/searchBox';
import {FormTableTest} from './buildingBlocks/formTable';
import BuildingBlocks from './buildingBlocks/building-blocks';


const states = [
    {
        name: 'login',
        url: '',
        component: Login
    }, {
        name: 'main',
        url: '',
        component: Main,
        abstract: true,
    }, {
        name: 'main.dashboard',
        url: '/dashboard',
        component: Dashboard
    }, {
        name: 'main.log',
        url: '/log',
        component: Log,
    }, {
        name: 'main.log.line',
        url: '/:lineId',
        component: Log,
    }, {
        name: 'main.create',
        url: '/create',
        component: Create
    }, {
        name: 'building-blocks',
        url: '/building-blocks',
        component: BuildingBlocks
    },
    {
        name: 'building-blocks.table',
        url: '/table',
        component: TableTest
    },
    {
        name: 'building-blocks.searchbox',
        url: '/searchbox',
        component: SearchBoxTest
    },
    {
        name: 'building-blocks.formtable',
        url: '/form-builder',
        component: FormTableTest
    }, {
        name: 'building-blocks.navbar',
        url: '/navbar',
        component: NavBarTest
    }, {
        name: 'building-blocks.loginbox',
        url: '/loginbox',
        component: LoginBoxTest
    }
];

export default states;
