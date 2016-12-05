import React from 'react';
import {Table} from 'buildingBlocks/table'
import {FormTable, FormTableTest} from 'buildingBlocks/formTable';
import {connect} from 'react-redux';
import {updateEntryFormGlobal, updateEntryFormInitial, submitEntryForm, fetchEntries, fetchCurrentEntry} from '../../../actions';

const Log = React.createClass({

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


        const global = [];
        const initial = [];

        for (let i = 0; i < line.constraints.length; i++) {
            const element = line.constraints[i];
            const toPush = {
                label: element.name,
                type: element.type,
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


        return (

            <div className="row">
                <div className="form-container-log col s5">
                    <div className="form">
                        <FormTable
                            formData={global}
                            onChange={this.props.updateEntryFormGlobal}
                        />
                        <div className="title">
                            {line.name}
                        </div>
                        <FormTable
                            formData={initial}
                            onChange={this.props.updateEntryFormInitial}
                        />

                    </div>
                    <div className="submit-button" onClick={this.props.submitEntryForm}>Add Entry</div>
                </div>
                <div className="table-container col s7">
                    <div className="table-controls">
                        <span className="control" onClick={this.props.fetchEntries}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                            Refresh
                            </span>
                    </div>
                    <Table
                        isLoading={this.props.page.entriesLoading}
                        tableHeaders={this.props.entries.allEntries.tableColumns}
                        tableRows={this.props.entries.allEntries.tableRows}
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
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateEntryFormGlobal: (formAsArray, formAsObject) => {
            dispatch(updateEntryFormGlobal(formAsObject));
        },
        updateEntryFormInitial: (formAsArray, formAsObject) => {
            dispatch(updateEntryFormInitial(formAsObject));
        },
        submitEntryForm: () => {
            dispatch(submitEntryForm());
        },
        fetchEntries: () => {
            dispatch(fetchEntries());
        },
        fetchCurrentEntry: (id) => {
            dispatch(fetchCurrentEntry(id));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Log);