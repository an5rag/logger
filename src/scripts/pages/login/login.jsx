import React from 'react';
import {LoginBox} from 'buildingBlocks/loginBox';
import {UISref} from 'ui-router-react';
const axios = require('axios');

const Login = React.createClass({

    onSubmit(formData){
        const props = this.props;
        const self = this;
        axios.post('http://localhost:4000/api/user/login', {username: formData.username, password: formData.password})
            .then(function (response) {
                props.transition.router.stateService.go('main.dashboard');
            }, function (error) {
                alert("Invalid username or password");
            });
    },

    getInitialState(){
        return ({
            error: false
        })
    },

    render() {
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

export default Login;
