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

const Main = React.createClass({

    componentWillMount(){
        this.props.fetchLines();
    },

    render() {

        // modals
        const postEntryActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.props.closePostEntryModal}
            />,
            <FlatButton
                label="Clock out Entry"
                primary={true}
                onTouchTap={this.props.closePostEntryModal}
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
                {
                    Object.keys(this.props.entries.currentEntry?this.props.entries.currentEntry : {} ).map((key, index)=>{
                        return(
                            <div key={index}>
                                <b>{key}</b> : <span>{this.props.entries.currentEntry[key]}</span>
                            </div>
                        )

                    })
                }
                <br/>
                <br/>
                {postEntryForm}
            </div>
        );
        const postEntryModal = (
            <Dialog
                title="Post Entry"
                actions={postEntryActions}
                modal={true}
                open={this.props.modals.postEntryModal ? this.props.modals.postEntryModal.open : false}
            >
                {postEntryMaterial}
            </Dialog>
        );

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
                    <CircularProgress size={80} thickness={5} />
                </div>
            )
        } else {
            view = (<UIView/>);
        }

        return (
            <div>
                <NavBar title="loggr" subtitle="ChemPlate" username={userDetail}
                        navs={[{text: 'Dashboard', destination: 'main.dashboard'},
                            {text: 'Log', destination: 'main.log'},
                            {text: 'Create', destination: 'main.create'},
                            {count: '3', text: 'Jobs in Progress', destination: 'main.log'}
                        ]}
                        searchBoxValues={ allLines }
                        searchBoxPlaceholder="Search"
                />
                {postEntryModal}
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
        modals: state.modals
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchLines: () => {
            dispatch(fetchLines());
        },
        changeLine: (line) => {
            dispatch(changeLine(line));
        },
        openPostEntryModal: () => {
            dispatch(openPostEntryModal());
        },
        closePostEntryModal: () => {
            dispatch(closePostEntryModal());
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);
