// import PeopleService from './common/peopleService';

import EmployeeDashboard from './pages/employee/dashboard';
import Manager from './pages/manager/container'
import ManagerDashboard from './pages/manager/dashboard';
import Login from './pages/login';
import Table from './components/reusable/table';
import FormBuilder from './components/reusable/formBuilder';
import BuildingBlocks from './components/container';

const states = [
    {
        name: 'login',
        url: '/',
        component: Login
    }, {
        name: 'employee',
        url: '/employee',
        abstract: true
    }, {
        name: 'employeeDashboard',
        url: '/dashboard',
        component: EmployeeDashboard
    }, {
        name: 'manager',
        url: '/manager',
        component: Manager
    }, {
        name: 'manager.dashboard',
        url: '/dashboard',
        component: ManagerDashboard
    },
    {
        name: 'building-blocks',
        url: '/building-blocks',
        component: BuildingBlocks
    },
    {
        name: 'building-blocks.table',
        url: '/table',
        component: Table
    },
    {
        name: 'building-blocks.form-builder',
        url: '/form-builder',
        component: FormBuilder
    }

];

// const people = {
//   name: 'people',
//   url: '/people',
//   component: People,
//   resolve: [{
//     token: 'people',
//     resolveFn: () => PeopleService.getAllPeople()
//   }]
// }
//
// const person = {
//   name: 'person',
//   url: '/people/:personId',
//   component: Person,
//   resolve: [{
//     token: 'person',
//     deps: ['$transition$'],
//     resolveFn: (trans) => PeopleService.getPerson(trans.params().personId)
//   }]
// }

export default states;
