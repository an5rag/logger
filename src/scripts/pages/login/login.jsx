import React from 'react';
import {LoginBox} from 'buildingBlocks/loginBox';
import {login} from '../../actions';
import {connect} from 'react-redux';



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

        return (
            <div>
                <div className="fullScreenBox">
                    <div className="topLinks">
                        <ul>
                            <li>Why loggr?</li>
                            <li>How does it work?</li>
                            <li>Contribute</li>
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
                        <LoginBox onSubmit={this.onSubmit}/>
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
