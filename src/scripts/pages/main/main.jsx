import React from 'react';
import {UISref, UIView} from 'ui-router-react';
import {NavBar} from 'buildingBlocks/navbar';
import {fetchLines, changeLine, openPostEntryModal, closePostEntryModal} from '../../actions';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {FormTable, FormTableTest} from 'buildingBlocks/formTable';
import LinearProgress from 'material-ui/LinearProgress';

//modals
import PostEntryModal from './modals/postEntryModal';
import ErrorModal from './modals/errorModal';


const Main = React.createClass({

    componentWillMount(){
        this.props.fetchLines();
    },

    render() {
        if (this.props.user.isLoggedIn == undefined) {
            this.props.transition.router.stateService.go('login');
        }

        let allLines;
        let self = this;
        if (this.props.lines.allLines) {
            allLines = this.props.lines.allLines.map((line) => {
                return Object.assign({}, line, {
                    onClick: function () {
                        self.props.changeLine(line);
                    },
                });
            });
        }

        // User Name Detail
        const currentLine = this.props.lines.currentLine;
        const username = this.props.user.name;
        const userDetail = currentLine ? username + ' | ' + currentLine.name : username;

        // Page Loading Progress
        let view;
        if (this.props.page.isLoading) {
            view = (
                <div className="default-message">
                    <CircularProgress size={80} thickness={5} color="indianred"/>
                </div>
            )
        } else {
            view = (<UIView/>);
        }

        const navs = [
            {text: 'Dashboard', destination: 'main.dashboard'},
            {text: 'Log', destination: 'main.log'},
            {count: this.props.entries.entriesInProgress?this.props.entries.entriesInProgress.serverCount:0, text: 'Jobs in Progress', destination: 'main.jobsInProgress'}
        ];

        if (this.props.user.userType == 'ADMIN'){
            navs.push({text: 'Create and Manage', destination: 'main.manage.options'});
        }

        return (
            <div>
                <NavBar title="loggr" subtitle="ChemPlate" username={userDetail}
                        navs={navs}
                        searchBoxValues={ allLines }
                        searchBoxPlaceholder="Search"
                />
                <PostEntryModal/>
                <ErrorModal/>
                {view}
            </div>
        );
    }
});

function mapStateToProps(state) {
    return {
        user: state.user,
        lines: state.lines,
        page: state.page,
        entries: state.entries,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchLines: () => {
            dispatch(fetchLines());
        },
        changeLine: (line) => {
            dispatch(changeLine(line));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);
