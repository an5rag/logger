// import PeopleService from './common/peopleService';

import EmployeeDashboard from './pages/employee/dashboard';
import Manager from './pages/manager/container'
import ManagerDashboard from './pages/manager/dashboard';
import Login from './pages/login';

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
    }
]

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
