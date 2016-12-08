import React from 'react';
import {UISref, UIView} from 'ui-router-react';

class Dashboard extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="welcomeBox col s6 offset-s3">
                    <h1>Hello!
                    </h1>
                    <p>
                        Welcome to your dashboard. <br/>
                        Here you'll soon find quick consumable summary of all lines.<br/>
                        If you have higher privileges, you'll soon be presented ways to export<br/>
                        your data into formats a Spreadsheet software could use.
                    </p>
                    </div>
            </div>
        );
    }
}

export default Dashboard;