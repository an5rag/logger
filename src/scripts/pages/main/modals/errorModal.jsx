import React from 'react';
import {closeErrorModal} from '../../../actions';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {FormTable} from 'buildingBlocks/formTable';
import LinearProgress from 'material-ui/LinearProgress';
import _ from 'lodash';

const ErrorModal = React.createClass({

    render() {
        const actions = [
            <FlatButton
                label="Okay"
                onTouchTap={this.props.closeErrorModal}
            />
        ];

        const serverError = (
            <div>
                These are the possible reasons why this error was thrown:
                <ui>
                    <li>You are not connected to the internet.</li>
                    <li>The server is down.</li>
                    <li>The database is down.</li>
                </ui>
            </div>
        )

        const modalMaterial = (
            <div>
                <br/>
                {_.get(this.props, 'error.message','')}
                {_.get(this.props,'error.serverError')? serverError : ''}
            </div>
        );

        return (
            <Dialog
                title={ this.props.error? this.props.error.title : '' }
                actions={ actions }
                modal={ true }
                open={ this.props.error? this.props.error.open : false }
                autoScrollBodyContent={ true }
                onRequestClose={ this.props.closeErrorModal }
            >
                {modalMaterial}
            </Dialog>
        );
    }
});

function mapStateToProps(state) {
    return {
        error: state.page.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        closeErrorModal: () => {
            dispatch(closeErrorModal());
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal);
