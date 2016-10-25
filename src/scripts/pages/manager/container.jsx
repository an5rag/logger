import React from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import {red400, grey50} from 'material-ui/styles/colors';
import {UISref, UIView} from 'ui-router-react';

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
                            Logout
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

                <div className="input-field col s2 search">

                </div>

            </div>
        )
    }
});


class Manager extends React.Component {
    render() {
        const manager = {
            userId: 'jsmith',
            firstName: 'John',
            lastName: 'Smith'
        }
        return (
            <div>
                <AppBar title="logger" employee={manager}></AppBar>
                <UIView/>
            </div>
        );
    }
}

export default Manager;
