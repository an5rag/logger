import React from 'react';
import {Table} from 'buildingBlocks/table'
import {FormTable, FormTableTest} from 'buildingBlocks/formTable';
import {connect} from 'react-redux';
import {
    updateEntryFormGlobal,
    updateEntryFormInitial,
    updateEntryFormInitialAndFetch,
    submitEntryForm,
    fetchEntriesInProgress,
    fetchCurrentEntry
} from '../../../actions';

const JobsInProgress = React.createClass({

    render() {
        if (this.props.user.isLoggedIn == undefined) {
            this.props.transition.router.stateService.go('login');
        }

        let rows = this.props.entries.entriesInProgress? this.props.entries.entriesInProgress.tableRows: [];

        return (
            <div className="row">
                <div className="table-container col s10 offset-s1">
                    <div className="table-controls">
                        <span className="control left clickable" onClick={this.props.fetchEntriesInProgress}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                            Refresh
                        </span>
                        <span className="control right">
                            Showing {this.props.entries.entriesInProgress ? this.props.entries.entriesInProgress.clientCount : 0} of {this.props.entries.entriesInProgress ? this.props.entries.entriesInProgress.serverCount : 0}
                        </span>
                    </div>
                    <Table
                        isLoading={this.props.page.entriesLoading}
                        tableHeaders={this.props.entries.entriesInProgress? this.props.entries.entriesInProgress.tableColumns : null}
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
        fetchEntriesInProgress: () => {
            dispatch(fetchEntriesInProgress());
        },
        fetchCurrentEntry: (id) => {
            dispatch(fetchCurrentEntry(id));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(JobsInProgress);
