import React from 'react';
import {openPostEntryModal, closePostEntryModal, submitPostEntryForm, updateEntryFormPost} from '../../../actions';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {FormTable, FormTableTest} from 'buildingBlocks/formTable';
import LinearProgress from 'material-ui/LinearProgress';

const PostEntryModal = React.createClass({

    render() {
        const actions = [
            <FlatButton
                label="Update"
                onTouchTap={this.props.submitPostEntryForm}
                disabled={this.props.entries.currentEntry ? !this.props.entries.currentEntry.inProgress : null}
            />,
          <FlatButton
                label="Update and Clock out"
                onTouchTap={this.props.submitPostEntryFormAndClockOut}
                disabled={this.props.entries.currentEntry ? !this.props.entries.currentEntry.inProgress : null}
            />,
            <FlatButton
                label="Cancel"
                onTouchTap={this.props.closePostEntryModal}
            />,
        ];

        const line = this.props.lines.currentLine;
        const entry = this.props.entries.currentEntry;

        const post = [];

        if(line){
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
                if(entry && entry[constraint.name] != undefined){
                    toPush.value = entry[constraint.name];
                }

                if (constraint.class == 'p') {
                    post.push(toPush)
                }


            }
        }


        const postEntryForm = (
            <FormTable
                formData={post}
                onChange={this.props.updateEntryFormPost}
            />
        );

        const entryClockedOut = (
            <div className="modal-message red-text">
                <br/>
                This entry has already been clocked out.
            </div>
        );

        let modalForm;
        if(this.props.entries.currentEntry && this.props.entries.currentEntry.inProgress){
            modalForm = postEntryForm
        } else {
            modalForm = entryClockedOut
        }

        const postEntryMaterial = (
            <div>
                {modalForm}
                <br/>
                {
                    Object.keys(this.props.entries.currentEntry ? this.props.entries.currentEntry : {} ).map((key, index)=>{
                        const element = this.props.entries.currentEntry[key];
                        return(
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
                {this.props.page.modalLoading? loading: postEntryMaterial}
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
        submitPostEntryForm: () => {
            "use strict";
            dispatch(submitPostEntryForm())
        },
        submitPostEntryFormAndClockOut: () => {
            "use strict";
            dispatch(submitPostEntryForm(true))
        },
        updateEntryFormPost: (formAsArray, formAsObject) => {
            dispatch(updateEntryFormPost(formAsObject));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostEntryModal);
