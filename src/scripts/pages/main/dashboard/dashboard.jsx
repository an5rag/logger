import React from 'react';
import {UISref, UIView} from 'ui-router-react';

class Dashboard extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="welcomeBox col s6 offset-s3">
                    <h1>Welcome!
                    </h1>
                    <p>
                        Welcome to your dashboard. <br/>
                        Here you'll find insightful analytics and snapshots of your performance.<br/>
                        If you have higher priviledge, you'll be presented the entire data in a <br/>
                        consumable and intuitive summary.
                    </p>
                    </div>
            </div>
        );
    }
}

export default Dashboard;