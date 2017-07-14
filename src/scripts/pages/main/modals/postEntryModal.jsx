import React from 'react';
import { openPostEntryModal, closePostEntryModal, submitPostEntryForm, updateEntryFormPost, updateEntryFormInitial, updateEntryFormGlobal } from '../../../actions';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { FormTable, FormTableTest } from 'buildingBlocks/formTable';
import LinearProgress from 'material-ui/LinearProgress';

const PostEntryModal = React.createClass({

    render() {
        const isAdmin = this.props.user.userType == 'ADMIN';
        const isInProgress = this.props.entries.currentEntry && this.props.entries.currentEntry.inProgress;

        const actions = [
            <FlatButton
                label="Update"
                onTouchTap={isAdmin && !isInProgress ? this.props.submitPostEntryFormSubmitAll : this.props.submitPostEntryForm}
                disabled={!isAdmin && !isInProgress}
            />,
            <FlatButton
                label="Update and Clock out"
                onTouchTap={this.props.submitPostEntryFormAndClockOut}
                disabled={!isInProgress}
            />,
            <FlatButton
                label="Cancel"
                onTouchTap={this.props.closePostEntryModal}
            />,
        ];

        const line = this.props.lines.currentLine;
        const entry = this.props.entries.currentEntry;

        const globalConstraints = [];
        const initialConstraints = [];
        const postConstraints = [];

        if (line) {
            for (let i = 0; i < line.constraints.length; i++) {
                const constraint = line.constraints[i];
                const toPush = {
                    label: constraint.name,
                    type: constraint.type,
                };
                if (constraint.type == 'select' && constraint.categories) {
                    toPush.options = constraint.categories.map((e, i) => {
                        return {
                            label: e,
                            value: e
                        }
                    })
                }
                if (entry && entry[constraint.name] != undefined) {
                    toPush.value = entry[constraint.name];
                }
                switch (constraint.class) {
                    case 'p': postConstraints.push(toPush); break;
                    case 'g': globalConstraints.push(toPush); break;
                    case 'i': initialConstraints.push(toPush); break;
                }
            }
        }

        const globalEntryForm = (
            <div className="form">
                <FormTable
                    formData={globalConstraints}
                    onChange={this.props.updateEntryFormGlobal}
                />
            </div>
        );

        const initialEntryForm = (
            <div className="form">
                <FormTable
                    formData={initialConstraints}
                    onChange={this.props.updateEntryFormInitial}
                />
            </div>
        );

        const postEntryForm = (
            <div className="form">
                <FormTable
                    formData={postConstraints}
                    onChange={this.props.updateEntryFormPost}
                />
            </div>
        );

        const entryClockedOut = (
            <div className="modal-message red-text" style={{ margin: "24px 0 24px 0" }}>
                This entry has already been clocked out.
            </div>
        );

        const updatingEntryAsAdmin = (
            <div className="modal-message red-text" style={{ margin: "24px 0 24px 0" }}>
                You're editing this entry as an administrator.
            </div>
        )

        let modalForm;
        modalForm = (
            <div>
                {isAdmin && !isInProgress ? globalEntryForm : null}
                {isAdmin && !isInProgress ? initialEntryForm : null}
                {isAdmin || isInProgress ? postEntryForm : null}
            </div>
        );

        const postEntryMaterial = (
            <div style={{ padding: "24px" }}>
                {!isInProgress ? entryClockedOut : null}
                {isAdmin && !isInProgress ? updatingEntryAsAdmin : null}
                {modalForm}
                <br />
                {
                    Object.keys(this.props.entries.currentEntry ? this.props.entries.currentEntry : {}).map((key, index) => {
                        const element = this.props.entries.currentEntry[key];
                        if (key != "_id" && key != "__v" && key != "lineId")
                            return (
                                <div key={index}>
                                    <b>{key}</b>: <span>{String(element)}</span>
                                </div>
                            )
                    })
                }
            </div>
        );

        const loading = (
            <div className="default-message">
                <LinearProgress mode="indeterminate" color="indianred" />
            </div>
        );

        return (
            <Dialog
                title="Post Entry"
                actions={actions}
                modal={true}
                open={this.props.modals.postEntryModal ? this.props.modals.postEntryModal.open : false}
                autoScrollBodyContent={true}
                onRequestClose={this.props.closePostEntryModal}
            >
                {this.props.page.modalLoading ? loading : postEntryMaterial}
            </Dialog>
        );
    }
});

function mapStateToProps(state) {
    return {
        user: state.user,
        lines: state.lines,
        page: state.page,
        entries: state.entries,
        modals: state.modals
    }
}

function mapDispatchToProps(dispatch) {
    return {
        openPostEntryModal: () => {
            dispatch(openPostEntryModal());
        },
        closePostEntryModal: () => {
            dispatch(closePostEntryModal());
        },
        submitPostEntryFormSubmitAll: () => {
            "use strict";
            dispatch(submitPostEntryForm(false, true))
        },
        submitPostEntryForm: (submitAll) => {
            "use strict";
            dispatch(submitPostEntryForm(false, false))
        },
        submitPostEntryFormAndClockOut: () => {
            "use strict";
            dispatch(submitPostEntryForm(true))
        },
        updateEntryFormGlobal: (formAsArray, formAsObject) => {
            dispatch(updateEntryFormGlobal(formAsObject));
        },
        updateEntryFormInitial: (formAsArray, formAsObject) => {
            dispatch(updateEntryFormInitial(formAsObject));
        },
        updateEntryFormPost: (formAsArray, formAsObject) => {
            dispatch(updateEntryFormPost(formAsObject));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostEntryModal);
