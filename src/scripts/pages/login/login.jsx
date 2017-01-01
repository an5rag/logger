import React from 'react';
import {LoginBox} from 'buildingBlocks/loginBox';
import CircularProgress from 'material-ui/CircularProgress';
import {login} from '../../actions';
import {connect} from 'react-redux';

import ErrorModal from '../main/modals/errorModal';


const Login = React.createClass({
    componentWillMount(){
        if (this.props.user.isLoggedIn) {
            this.props.transition.router.stateService.go('main.dashboard');
        }
    },

    onSubmit(formData){
        const username = formData.username;
        const password = formData.password;
        this.props.login(username, password);
    },

    getInitialState(){
        return ({
            error: false
        })
    },

    render() {

        if (this.props.user.isLoggedIn) {
            this.props.transition.router.stateService.go('main.dashboard');
        }

        const loginBox = (<LoginBox onSubmit={this.onSubmit}/>);
        const loading = (
            <div className="default-message">
                <CircularProgress size={40} thickness={3} color="indianred"/>
            </div>
        );

        return (
            <div>
                <ErrorModal/>
                <div className="fullScreenBox">
                    <div className="topLinks">
                        <ul>
                            <li>How does it work?</li>
                        </ul>
                    </div>
                    <div className="welcomeBox">
                        <div>
                            <img src="https://media.giphy.com/media/TDzOWxWREjqSY/giphy.gif"/>
                        </div>
                        <div className="title">
                            loggr.biz
                            <div className="subtitle">
                                LOGGR FOR BUSINESS
                            </div>
                        </div>
                        {this.props.user.isLogging? loading : loginBox}
                    </div>
                    <div className="bottomLinks">
                        © Anurag Choudhary 2016
                    </div>
                </div>
            </div>

        );
    }
});


function mapStateToProps(state) {
    return {user: state.user}
}

function mapDispatchToProps(dispatch) {
    return {
        login: function (username, password) {
            dispatch(login(username, password));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
