import React from 'react';
import {UISref} from 'ui-router-react';

class Login extends React.Component {
    render() {
        return (
            <div>
                <div className="fullScreenBox">
                    <div className="topLinks">
                        <ul>
                            <li>Why loggr?</li>
                            <li>Pricing</li>
                            <li>Author</li>
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

                        <UISref to="employeeDashboard">
                            <div className="waves-effect waves-black mainButton">Login</div>
                        </UISref>
                        <UISref to="manager.dashboard">
                            <div className="waves-effect waves-black mainButton">Get Started</div>
                        </UISref>
                    </div>
                    <div className="bottomLinks">
                        © Anurag Choudhary 2016
                    </div>
                </div>
                <div className="fullScreenBox">
                    <div className="welcomeBox">
                        <div className="title">
                            Why loggr?
                        </div>

                        <p>
                            Because yes.
                        </p>
                    </div>
                </div>
            </div>

        );
    }
}

export default Login;
