import React from 'react';
import {UISref, UIView} from 'ui-router-react';
import {connect} from 'react-redux';
import {FormTable} from 'buildingBlocks/formTable';
import {fetchCsv} from '../../../actions';
import moment from 'moment';

const Dashboard = React.createClass({
    getInitialState(){
        return {};
    },

    onChange(form, formAsObject){
        this.setState(formAsObject);
    },

    onSubmit(){
        this.props.fetchCsv(this.state);
    },

    render() {
        const form = (
            <div className="form-container-create row">
                <div className="form col s10 offset-s1 m8 offset-m2">
                    <div className="title">
                        Export to .csv
                    </div>
                    <FormTable
                        onChange={this.onChange}
                        startCase={true}
                        formData={[
                            {
                                label: 'startDate',
                                type: 'date',
                                placeholder: 'Defaults to the beginning of time'
                            }, {
                                label: 'endDate',
                                type: 'date',
                                placeholder: 'Defaults to today\'s date'
                            }
                        ]}
                        cols={1}
                    />

                </div>
                <div className="submit-button col s8 offset-s2 m6 offset-m3" onClick={this.onSubmit}>Export to CSV</div>
            </div>
        )
        return (
            <div className="row">
                <div className="welcomeBox col s6 offset-s3">
                    <div className="dashboard-title">Hello, {this.props.user.name}!
                    </div>
                    <div className="dashboard-text">
                        Welcome to your dashboard. <br/>
                        Today is {moment().format('dddd[,] MMMM Do YYYY[.]')}
                    </div>
                    </div>
                    {form}
            </div>
        );
    }
});


function mapStateToProps(state) {
    return {
        user: state.user,
        currentLine: state.lines.currentLine,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchCsv: (req) => {
            dispatch(fetchCsv(req));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
