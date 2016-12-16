import React from 'react';
import {FormTable} from 'buildingBlocks/formTable';
import {SearchBox} from 'buildingBlocks/searchBox';
import {connect} from 'react-redux';
import _ from 'lodash';
import {updateLine, deleteLine} from '../../../actions';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


const UpdateLine = React.createClass({

    getInitialState(){
        let basicFormData = {};
        let constraintsFormData = [{}];

        const currentLine = this.props.currentLine;
        if(currentLine){
            basicFormData = {
                name: currentLine.name,
                description: currentLine.description
            }
            constraintsFormData = currentLine.constraints
        }

        return {
            constraints: constraintsFormData.length,
            basicFormData,
            constraintsFormData,
            deleteAlert: false
        }
    },

    componentWillReceiveProps(nextProps){
        if (!_.isEqual(this.props.currentLine, nextProps.currentLine)) {
            const currentLine = nextProps.currentLine;
            let basicFormData = {};
            let constraintsFormData = [{}];
            if(currentLine){
                basicFormData = {
                    name: currentLine.name,
                    description: currentLine.description
                }
                constraintsFormData = currentLine.constraints
            }

            this.setState({
                constraints: constraintsFormData.length,
                basicFormData,
                constraintsFormData
            });
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

    onUpdate(){
        const basicForm = this.state.basicFormData;
        const req = {
            ...basicForm,
            constraints: this.state.constraintsFormData
        };
        console.log(req);

        this.props.updateLine(req);
        this.props.transition.router.stateService.go('main.log');
    },

    onDelete(){
        this.props.deleteLine();
    },

    onChange(index, value, formAsObject){
        const constraintsFormData = this.state.constraintsFormData.slice();
        constraintsFormData[index] = formAsObject;
        this.setState({
            constraintsFormData
        });
    },

    onBasicFormChange(value, formAsObject){
        this.setState({
            basicFormData: formAsObject
        });
    },

    deleteAlertOpen(){
        this.setState({deleteAlert: true});
    },

    deleteAlertClose(){
        this.setState({deleteAlert: false});
    },

    render() {
        if (!this.props.currentLine) {
            return (
                <div className="default-message">
                    Select a line from the search bar to update.
                </div>
            )
        }

        const constraints = [];
        for (let i = 0; i < this.state.constraints; i++) {
            let constraintName = `Constraint ${i+1}`;
            if(this.state.constraintsFormData[i]['name'])
                constraintName = this.state.constraintsFormData[i]['name'];

            const c = this.state.constraintsFormData[i];
            constraints.push(
                <div key={i}>
                    <div className="subtitle">
                        {constraintName}
                    </div>
                    <FormTable
                        onChange={this.onChange.bind(this, i)}
                        startCase={true}
                        formData={[
                            {
                                label: 'name',
                                type: 'text',
                                required: true,
                                value: c['name']
                            }, {
                                label: 'class',
                                value: c['class'],
                                type: 'select',
                                placeholder: 'Select',
                                multi: false,
                                required: true,
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
                                label: 'type',
                                value: c['type'],
                                type: 'select',
                                placeholder: 'Select',
                                multi: false,
                                required: true,
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
                                label: 'categories',
                                value: c['categories'] ? c['categories'] : [],
                                type: 'options-input',
                                placeholder: 'if type is category',
                                multi: true
                            }, {
                                label: 'isDisplayed',
                                value: c['isDisplayed'],
                                type: 'select',
                                multi: false,
                                value:true,
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
        };

        const deleteAlertActions = [
          <FlatButton
            label="Delete Line"
            onTouchTap={this.onDelete}
          />,
          <FlatButton
            label="Cancel"
            onTouchTap={this.deleteAlertClose}
          />,
        ];

        return (
            <div className="form-container-create row">
                <div className="form col s10 offset-s1 m8 offset-m2">
                    <div className="title">
                        Update Line
                    </div>
                    <div className="subtitle">
                        Basics
                    </div>
                    <FormTable
                        onChange={this.onBasicFormChange}
                        formData={[
                            {
                                label: 'name',
                                type: 'text',
                                value: this.state.basicFormData.name
                            }, {
                                label: 'description',
                                type: 'text',
                                value: this.state.basicFormData.description
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
                <div className="col s10 offset-s1 m8 offset-m2">
                    <div className="submit-button hover-green col s5 offset-s1" onClick={this.onUpdate}>Update</div>
                    <div className="submit-button hover-red col s5" onClick={this.deleteAlertOpen}>Delete</div>
                </div>
                <Dialog
                          actions={deleteAlertActions}
                          open={this.state.deleteAlert}
                          onRequestClose={this.deleteAlertClose}
                >
                          Delete Line and all its associated Entries? (this change is permanent)
                </Dialog>
            </div>

        );
    }
});


function mapStateToProps(state) {
    return {
        user: state.user,
        currentLine: state.lines.currentLine
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateLine: (req) => {
            dispatch(updateLine(req));
        },
        deleteLine: (req) => {
            dispatch(deleteLine(req));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UpdateLine);
