import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const FormBuilder = React.createClass({
    propTypes: {
        formData: React.PropTypes.object,
        onSubmit: React.PropTypes.func,
        onUpdate: React.PropTypes.func
    },
    render() {
        return (
            <MuiThemeProvider>
                <div className="row formBuilder">
                    <div className="input-field col s6">
                        <input defaultValue="459 lb" id="first_name2" type="text"></input>
                        <label className="active">Weight</label>
                    </div>
                    <div className="input-field col s6">
                        <input defaultValue="#4567238" id="first_name2" type="text"></input>
                        <label className="active">Order no</label>
                    </div>

                    <div className="input-field col s6">
                        <input defaultValue="D" id="first_name2" type="text"></input>
                        <label className="active">Type</label>
                    </div>
                    <div className="input-field col s6">
                        <input defaultValue="230.4" id="first_name2" type="text"></input>
                        <label className="active">Velocity</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="first_name2" defaultValue="300 V" type="text"></input>
                        <label className="active">Voltage</label>
                    </div>
                </div>
            </MuiThemeProvider>

        )
    }
});

export default FormBuilder;
