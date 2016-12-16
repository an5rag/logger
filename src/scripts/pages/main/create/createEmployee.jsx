import React from 'react';
import {FormTable} from 'buildingBlocks/formTable';
const axios = require('axios');
import {createEmployee} from '../../../actions';
import {connect} from 'react-redux';
import Snackbar from 'material-ui/Snackbar';


const CreateEmployee = React.createClass({

    getInitialState(){
        return({
            formData: {},
            snackBarOpen: false,
            snackBarMessage: ''
        });
    },

    handleSnackBar(message) {
        this.setState({
            snackBarOpen: true,
            snackBarMessage: message
        })
    },

    handleSnackBarClose() {
        this.setState({
            snackBarOpen: false,
            snackBarMessage: ''
        })
    },

    onSubmit(){
        const req = this.state.formData;
        this.props.createEmployee(req, (response, error) => {
            if(error){
                console.log(error);
                if(error.message.includes("duplicate")){
                    this.handleSnackBar("This user name already exists. Please try a different one.");
                } else {
                    this.handleSnackBar("Please fill all the required fields.");
                }
            } else {
                this.handleSnackBar("Employee created!");
            }
        });
    },

    onChange(value, formAsObject){
        this.setState({
            formData: formAsObject
        })
    },

    render() {
        return (
            <div className="form-container-create row">
                <div className="form col s10 offset-s1 m8 offset-m2">
                    <div className="title">
                        Create Employee
                    </div>
                    <FormTable
                        onChange={this.onChange}
                        formData={[
                            {
                                label: 'firstName',
                                type: 'text',
                                required: true,
                            }, {
                                label: 'lastName',
                                type: 'text',
                            }, {
                                label: 'employeeType',
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
                                label: 'username',
                                type: 'text',
                                placeholder: 'Must be unique',
                                required: true,
                            }, {
                                label: 'password',
                                type: 'text',
                                required: true
                            }
                        ]}
                        cols={1}
                    />

                </div>
                <div className="submit-button hover-green col s10 offset-s1 m8 offset-m2" onClick={this.onSubmit}>Create</div>
                    <Snackbar
                              open={this.state.snackBarOpen}
                              message={this.state.snackBarMessage}
                              autoHideDuration={4000}
                              onRequestClose={this.handleSnackBarClose}
                    />
            </div>

        );
    }
});

function mapDispatchToProps(dispatch) {
    return {
        createEmployee: (req, callback) => {
            dispatch(createEmployee(req, callback));
        }
    }
}


export default connect(null, mapDispatchToProps)(CreateEmployee);
