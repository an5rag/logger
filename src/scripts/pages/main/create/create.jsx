import React from 'react';
import {FormTable, FormTableTest} from 'buildingBlocks/formTable';
const axios = require('axios');
import {createLine} from '../../../actions';
import {connect} from 'react-redux';


const Create = React.createClass({

    getInitialState(){
        return {
            constraints: 1,
            basicFormData: {},
            constraintsFormData: []
        }
    },

    onAddConstraint(){
        const curr = this.state.constraints;
        const constraintsFormData = this.state.constraintsFormData.slice();
        constraintsFormData.push({});
        this.setState({
            constraints: curr + 1,
            constraintsFormData
        })

    },

    onSubmit(){
        const basicForm = this.state.basicFormData;
        const req = {
            name: basicForm[0].value,
            description: basicForm[1].value
        };
        req.constraints = this.state.constraintsFormData.map((formData)=> {
            const toReturn = {
                name: formData[0].value,
                class: formData[1].value,
                type: formData[2].value,
                isDisplayed: formData[4].value
            };
            if (toReturn.type == 'select' && formData[3].value) {
                const categories = formData[3].value.map((text) => {
                    return text.value;
                });
                toReturn.categories = categories;
            }
            return toReturn;
        });
        req.creator = this.props.user.username;
        console.log(req);

        req.token = this.props.user.token;

        this.props.createLine(req);
        this.props.transition.router.stateService.go('main.log');
    },
    onChange(index, value){
        const constraintsFormData = this.state.constraintsFormData.slice();
        constraintsFormData[index] = value;
        this.setState({
            constraintsFormData
        });
    },
    onBasicFormChange(value){
        this.setState({
            basicFormData: value
        });
    },

    render() {

        const constraints = [];
        for (let i = 0; i < this.state.constraints; i++) {
            constraints.push(
                <div key={i}>
                    <div className="subtitle">
                        Constraint {i + 1}
                    </div>
                    <FormTable
                        onChange={this.onChange.bind(this, i)}
                        formData={[
                            {
                                label: 'Name',
                                type: 'text'
                            }, {
                                label: 'Class',
                                type: 'select',
                                placeholder: 'Select',
                                multi: false,
                                options: [
                                    {
                                        value: 'i',
                                        label: 'Initial'
                                    }, {
                                        value: 'g',
                                        label: 'Global'
                                    }, {
                                        value: 'p',
                                        label: 'Post'
                                    }
                                ]
                            }, {
                                label: 'Type',
                                type: 'select',
                                placeholder: 'Select',
                                multi: false,
                                options: [
                                    {
                                        value: 'select',
                                        label: 'Category'
                                    }, {
                                        value: 'text',
                                        label: 'Text'
                                    }, {
                                        value: 'number',
                                        label: 'Number'
                                    }, {
                                        value: 'time',
                                        label: 'Time'
                                    }, {
                                        value: 'date',
                                        label: 'Date'
                                    }
                                ]
                            }, {
                                label: 'Categories',
                                type: 'creatable',
                                placeholder: 'if type is category',
                                multi: true
                            }, {
                                label: 'Displayed in Table',
                                type: 'select',
                                multi: false,
                                options: [
                                    {
                                        value: true,
                                        label: 'Yes'
                                    }, {
                                        value: false,
                                        label: 'No'
                                    }
                                ]
                            }
                        ]}
                        cols={1}
                    />

                </div>
            )
        }

        return (
            <div className="form-container-create">
                <div className="form">
                    <div className="title">
                        Create Line
                    </div>
                    <div className="subtitle">
                        Basics
                    </div>
                    <FormTable
                        onChange={this.onBasicFormChange}
                        formData={[
                            {
                                label: 'Name',
                                type: 'text',
                            }, {
                                label: 'Description',
                                type: 'text'
                            }
                        ]}
                        cols={1}
                    />
                    {constraints}
                    <div className="col s12 add-box" onClick={this.onAddConstraint}>
                                <span className="add">
                                    <i className="fa fa-plus-square-o" aria-hidden="true"></i>
                                    Add Another
                                </span>
                    </div>

                </div>
                <div className="submit-button" onClick={this.onSubmit}>Create</div>
            </div>

        );
    }
});


function mapStateToProps(state) {
    return {
        user: state.user,
        lines: state.lines
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createLine: (req) => {
            dispatch(createLine(req));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Create);
