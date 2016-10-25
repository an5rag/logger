import React from 'react';
import {UISref} from 'ui-router-react';

class ManagerDashboard extends React.Component {
  render () {
    return (
      <div className="fullScreenBox">
          <div className="welcomeBox">
              <UISref to="manager.lines">
                  <div className="waves-effect waves-black mainButton">Add/View Lines</div>
              </UISref>
              <UISref to="manager.employees">
                  <div className="waves-effect waves-black mainButton">Add/View Employees</div>
              </UISref>
          </div>
      </div>
    );
  }
}


export default ManagerDashboard;
