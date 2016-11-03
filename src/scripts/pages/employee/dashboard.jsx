import React from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import {red400, grey50} from 'material-ui/styles/colors';
import {UISref} from 'ui-router-react';
import FormBuilder from 'components/reusable/formBuilder';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';

const AppBar = React.createClass({
    propTypes: {
        title: React.PropTypes.string,
        employee: React.PropTypes.object,
        line: React.PropTypes.object,
        lines: React.PropTypes.array,
        employees: React.PropTypes.array,
        lineChange: React.PropTypes.func,
        employeeChange: React.PropTypes.func
    },
    render() {
        const props = this.props;
        const fullName = props.employee.firstName + ' ' + props.employee.lastName;
        return (
            <div className="row appBar z-depth-1">
                <div className="col s4 valign-wrapper">
                    <span className="hide-on-large-only">
                        {props.employee.firstName}
                    </span>
                    <span className="hide-on-med-and-down">
                        {fullName}
                    </span>

                    <a className="waves-effect waves-light appBarButton btn-flat">
                        <span className="hide-on-small-only">
                            Change
                        </span>
                        <span className="hide-on-med-and-up">
                            <i className="material-icons">person</i>
                        </span>
                    </a>
                </div>

                <UISref to="login">
                    <div className="col s4 title">
                        <div>
                            {props.title}
                        </div>
                    </div>
                </UISref>

                <div className="input-field col s2 lineSelect">
                    <select defaultValue="3">
                        <option value="1">Line 1</option>
                        <option value="2">Line 2</option>
                        <option value="3">Line 3</option>
                        <option value="4">Line 4</option>
                        <option value="5">Line 5</option>
                        <option value="6">Line 6</option>
                    </select>
                </div>
                <div className="col s2">
                    <MuiThemeProvider>
                        <Badge style={{
                            top: -7
                        }} badgeContent={10} secondary={true} badgeStyle={{
                            top: 22,
                            right: 12,
                            fontSize: 10,
                            backgroundColor: red400
                        }}>
                            <IconButton tooltip="Incomplete Entries">
                                <FontIcon className="material-icons" style={{
                                    fontSize: 50
                                }} color={grey50}>access_time</FontIcon>
                            </IconButton>
                        </Badge>
                    </MuiThemeProvider>
                </div>

            </div>
        )
    }
});

const EntryForm = React.createClass({
    propTypes: {
        line: React.PropTypes.object
    },

    render() {
        return (
            <div className="z-depth-1 entryForm row">
                <div className="col s8">
                    <FormBuilder/>
                </div>
                <div className="col s4 valign-wrapper entryFormRightColumn">
                    <div className="valign">
                        <a className="waves-effect waves-light entryFormButton btn-flat teal">
                            <span>
                                Add New Entry
                            </span>
                        </a>

                    </div>
                </div>
            </div>
        )
    }
})

const Entries = React.createClass({
    propTypes: {
        fields: React.PropTypes.array,
        entries: React.PropTypes.array
    },

    render() {
        return (
            <div className="row">
                <div className="z-depth-1 entryTable col">
                    <MuiThemeProvider>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn>Employee ID</TableHeaderColumn>
                                    <TableHeaderColumn>Name</TableHeaderColumn>
                                    <TableHeaderColumn>Order no.</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableRowColumn>1</TableRowColumn>
                                    <TableRowColumn>John Smith</TableRowColumn>
                                    <TableRowColumn>#4567238</TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn>2</TableRowColumn>
                                    <TableRowColumn>Randal White</TableRowColumn>
                                    <TableRowColumn>#4562342</TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn>3</TableRowColumn>
                                    <TableRowColumn>Stephanie Sanders</TableRowColumn>
                                    <TableRowColumn>#9876238</TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn>4</TableRowColumn>
                                    <TableRowColumn>Steve Brown</TableRowColumn>
                                    <TableRowColumn>#21324</TableRowColumn>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </MuiThemeProvider>
                    <div className="row">
                        <div className="col s6 offset-s3">
                            <ul className="pagination" style={{
                                textAlign: "center"
                            }}>
                                <li className="disabled">
                                    <a href="#!">
                                        <i className="material-icons">chevron_left</i>
                                    </a>
                                </li>
                                <li className="active">
                                    <a href="#!">1</a>
                                </li>
                                <li className="waves-effect">
                                    <a href="#!">2</a>
                                </li>
                                <li className="waves-effect">
                                    <a href="#!">3</a>
                                </li>
                                <li className="waves-effect">
                                    <a href="#!">4</a>
                                </li>
                                <li className="waves-effect">
                                    <a href="#!">5</a>
                                </li>
                                <li className="waves-effect">
                                    <a href="#!">
                                        <i className="material-icons">chevron_right</i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col s3"></div>
                    </div>

                </div>
            </div>
        )
    }
});

class EmployeeDashboard extends React.Component {
    render() {
        const employee = {
            userId: 'achdhry3',
            firstName: 'Anurag',
            lastName: 'Choudhary'
        };
        return (
            <div>
                <AppBar title="logger" employee={employee}/>
                <EntryForm/>
                <Entries/>
            </div>
        );
    }
}

export default EmployeeDashboard;
