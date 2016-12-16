import React from 'react';
import {UISref} from 'ui-router-react';

const Options = React.createClass({

    render() {
        return (
            <div className="row">
                <br/>
                <br/>
                <br/>
                <div className="col s10 offset-s1 m8 offset-m2">
                    <UISref to={'main.manage.createLine'}>
                        <div className="submit-button col s6 offset-s3">Create Line</div>
                    </UISref>
                    <UISref to={'main.manage.updateLine'}>
                        <div className="submit-button col s6 offset-s3">Update Line</div>
                    </UISref>
                    <UISref to={'main.manage.createEmployee'}>
                        <div className="submit-button col s6 offset-s3">Create Employee</div>
                    </UISref>
                </div>
            </div>
        );
    }
});

export default Options;
