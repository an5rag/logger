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
                        <input defaultValue="Alvin" id="first_name2" type="text"></input>
                        <label className="active">Weight</label>
                    </div>
                    <div className="input-field col s6">
                        <input defaultValue="Alvin" id="first_name2" type="text"></input>
                        <label className="active">Order no</label>
                    </div>
                    <div className="input-field col s6">
                        <input defaultValue="Alvin" id="first_name2" type="text"></input>
                        <label className="active">Weight</label>
                    </div>
                    <div className="input-field col s6">
                        <input defaultValue="Alvin" id="first_name2" type="text"></input>
                        <label className="active">Order no</label>
                    </div>
                    <div className="input-field col s6">
                        <input defaultValue="Alvin" id="first_name2" type="text"></input>
                        <label className="active">Weight</label>
                    </div>
                    <div className="input-field col s6">
                        <input defaultValue="Alvin" id="first_name2" type="text"></input>
                        <label className="active">Order no</label>
                    </div>
                    <div className="input-field col s6">
                        <input defaultValue="Alvin" id="first_name2" type="text"></input>
                        <label className="active">Velocity</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="first_name2" type="text"></input>
                        <label className="active">Voltage</label>
                    </div>
                    <div className="input-field col s6">
                        <input defaultValue="Alvin" id="first_name2" type="text"></input>
                        <label className="active">First Name</label>
                    </div>
                    <div className="input-field col s6">
                        <input defaultValue="Alvin" id="first_name2" type="text"></input>
                        <label className="active">First Name</label>
                    </div>
                </div>
            </MuiThemeProvider>

        )
    }
});

export default FormBuilder;
