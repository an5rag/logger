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
    fetchCurrentEntry
} from '../../../actions';

const JobsInProgress = React.createClass({

    render() {
        if (this.props.user.isLoggedIn == undefined) {
            this.props.transition.router.stateService.go('login');
        }

        let rows = [];
        const allEntries = this.props.entries.allEntries? this.props.entries.allEntries.tableRows: [];
        for(let i = 0; i<allEntries.length; i++){
            const currentRow = allEntries[i];
            if(currentRow.data[1])
                rows.push(currentRow);
        }

        return (
            <div className="row">
                <div className="table-container col s10 offset-s1">
                    <div className="table-controls">
                        <span className="control" onClick={this.props.fetchEntries}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                            Refresh
                            </span>
                    </div>
                    <Table
                        isLoading={this.props.page.entriesLoading}
                        tableHeaders={this.props.entries.allEntries? this.props.entries.allEntries.tableColumns : null}
                        tableRows={rows}
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
        entries: state.entries,
        page: state.page,
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
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(JobsInProgress);
