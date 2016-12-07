import React from 'react';
import {openPostEntryModal, closePostEntryModal} from '../../../actions';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/FlatButton';
import {FormTable, FormTableTest} from 'buildingBlocks/formTable';
import LinearProgress from 'material-ui/LinearProgress';

const PostEntryModal = React.createClass({

    render() {
        const actions = [
            <RaisedButton
                label="Update"
                secondary={true}
                onTouchTap={this.props.closePostEntryModal}
            />,
          <RaisedButton
                label="Update and Clock out"
                primary={true}
                onTouchTap={this.props.closePostEntryModal}
                disabled={this.props.entries.currentEntry ? !this.props.entries.currentEntry.inProgress : null}
            />,
        ];

        const line = this.props.lines.currentLine;

        const post = [];

        if(line){
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
                if (element.class == 'p') {
                    post.push(toPush)
                }

            }
        }


        const postEntryForm = (
            <FormTable
                formData={post}
            />
        );

        const postEntryMaterial = (
            <div>
                {postEntryForm}
                <br/>
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
        return (
            <Dialog
                title="Post Entry"
                actions={actions}
                modal={true}
                open={this.props.modals.postEntryModal ? this.props.modals.postEntryModal.open : false}
                autoScrollBodyContent={true}
                onRequestClose={this.props.closePostEntryModal}
            >
                {postEntryMaterial}
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
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostEntryModal);
