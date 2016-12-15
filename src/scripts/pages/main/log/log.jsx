import React from 'react';
import {Table} from 'buildingBlocks/table'
import {FormTable, FormTableTest} from 'buildingBlocks/formTable';
import {connect} from 'react-redux';
import {
    updateEntryFormGlobal,
    updateEntryFormInitial,
    updateEntryFormInitialAndFetch,
    submitEntryForm,
    fetchEntries,
    fetchCurrentEntry,
    setEntryFormValid,
} from '../../../actions';

const Log = React.createClass({

    getInitialState(){
        return {
            globalValid: false,
            initialValid: false
        }
    },

    handleGlobalValid(valid){
        this.setState({
            globalValid: valid
        });
        this.props.setEntryFormValid(valid && this.state.initialValid);
    },


    handleInitialValid(valid){
        this.setState({
            initialValid: valid
        });
        this.props.setEntryFormValid(valid && this.state.globalValid);
    },

    render() {
        if (this.props.user.isLoggedIn == undefined) {
            this.props.transition.router.stateService.go('login');
        }

        const line = this.props.lines.currentLine;

        if (!line) {
            return (
                <div className="default-message">
                    Select a line from the search bar to begin.
                </div>
            )
        }


        let global = [];
        let initial = [];

        for (let i = 0; i < line.constraints.length; i++) {
            const element = line.constraints[i];
            const toPush = {
                label: element.name,
                type: element.type,
                required: true
            };
            if (element.type == 'select' && element.categories) {
                toPush.options = element.categories.map((e, i) => {
                    return {
                        label: e,
                        value: e
                    }
                })
            }
            if (element.class == 'g') {
                global.push(toPush)
            }
            if (element.class == 'i') {
                initial.push(toPush);
            }

        }

        const submitButtonClasses = this.props.valid ? 'submit-button' : 'submit-button disabled';
        const message = this.props.valid ? null : (
            <div className="error-message">All fields marked with * are required.</div>);
        return (

            <div className="row">
                <div className="form-container-log col s12 l5">
                    <div className="form">
                        <FormTable
                            formData={global}
                            key={line.name}
                            onChange={this.props.updateEntryFormGlobal}
                            handleValidation={this.handleGlobalValid}

                        />
                        <div className="title">
                            {line.name}
                        </div>
                        <FormTable
                            formData={initial}
                            onChange={this.props.updateEntryFormInitialAndFetch}
                            handleValidation={this.handleInitialValid}
                        />

                    </div>
                    {message}
                    <div className={submitButtonClasses}
                         onClick={this.props.valid ? this.props.submitEntryForm : null}>Add Entry
                    </div>
                </div>
                <div className="table-container col s12 l7">
                    <div className="table-controls">
                        <span className="control left clickable" onClick={this.props.fetchEntries}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                            Refresh
                        </span>
                        <span className="control right">
                            Showing {this.props.entries.allEntries ? this.props.entries.allEntries.clientCount : 0} of {this.props.entries.allEntries ? this.props.entries.allEntries.serverCount : 0}
                        </span>
                    </div>
                    <Table
                        isLoading={this.props.page.entriesLoading}
                        tableHeaders={this.props.entries.allEntries ? this.props.entries.allEntries.tableColumns : null}
                        tableRows={this.props.entries.allEntries ? this.props.entries.allEntries.tableRows : null}
                        onRowClick={this.props.fetchCurrentEntry}
                    />
                </div>
            </div>
        );
    }
});

function mapStateToProps(state) {
    return {
        user: state.user,
        lines: state.lines,
        entries: state.entries,
        page: state.page,
        valid: state.entryForm.valid
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateEntryFormGlobal: (formAsArray, formAsObject) => {
            dispatch(updateEntryFormGlobal(formAsObject));
        },
        updateEntryFormInitialAndFetch: (formAsArray, formAsObject) => {
            dispatch(updateEntryFormInitialAndFetch(formAsObject));
        },
        updateEntryFormInitial: (formAsArray, formAsObject) => {
            dispatch(updateEntryFormInitialAndFetch(formAsObject));
        },
        submitEntryForm: () => {
            dispatch(submitEntryForm());
        },
        fetchEntries: () => {
            dispatch(fetchEntries());
        },
        fetchCurrentEntry: (id) => {
            dispatch(fetchCurrentEntry(id));
        },
        setEntryFormValid: (valid) => {
            dispatch(setEntryFormValid(valid));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Log);
