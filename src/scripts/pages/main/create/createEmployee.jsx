import React from 'react';
import {FormTable, FormTableTest} from 'buildingBlocks/formTable';
const axios = require('axios');
import {createLine} from '../../../actions';
import {connect} from 'react-redux';


const CreateEmployee = React.createClass({

    onSubmit(){

    },
    onChange(index, value){

    },

    render() {
        return (
            <div className="form-container-create">
                <div className="form">
                    <div className="title">
                        Create Employee
                    </div>
                    <FormTable
                        onChange={this.onBasicFormChange}
                        formData={[
                            {
                                label: 'First Name',
                                type: 'text',
                            }, {
                                label: 'Last Name',
                                type: 'text',
                            }, {
                                label: 'Employee Type',
                                type: 'select',
                                placeholder: 'Choose',
                                options: [
                                    {
                                        label: 'Employee',
                                        value: 'EMPLOYEE'
                                    }, {
                                        label: 'Admin',
                                        value: 'ADMIN'
                                    },
                                ]
                            }, {
                                label: 'Username',
                                type: 'text',
                                placeholder: 'Must be unique'
                            }, {
                                label: 'Password',
                                type: 'text',
                            }
                        ]}
                        cols={1}
                    />

                </div>
                <div className="submit-button" onClick={this.onSubmit}>Create</div>
            </div>

        );
    }
});


function mapStateToProps(state) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createEmployee: (req) => {
            dispatch(createLine(req));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateEmployee);
