import React from 'react';
import ReactDOM from 'react-dom';
import {SearchBox} from './searchBox';
import {UISref, UIView} from 'ui-router-react';

const NavBar = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        subtitle: React.PropTypes.string,
        username: React.PropTypes.string,
        searchBoxValues: React.PropTypes.array,
        searchBoxPlaceholder: React.PropTypes.string,
        navs: React.PropTypes.array
    },

    getInitialState() {
        return {
            searchBoxOpen: false
        }
    },


    render() {
        const username = this.props.username ? (
            <span className="username side-links">{this.props.username}</span>) : null;
        const searchBox = this.props.searchBoxValues ? (
            <SearchBox searchBoxValues={this.props.searchBoxValues}
                       placeholder={this.props.searchBoxPlaceholder}/>) : null;
        return (
            <div className="navbar">
                <div className="row navbar-top center-align">
                    <div className="col s12 m6 l5 title">
                        <span>{this.props.title}</span>
                        <span className="subtitle"> | {this.props.subtitle}</span>
                    </div>
                    <div className="col l2 hide-on-med-and-down">
                    </div>
                    <div className="col s12 m6 l5">
                        {searchBox}
                        {username}
                    </div>
                </div>
                <div className="row navbar-bottom">
                    {
                        this.props.navs.map((nav, index) => {
                            const classes = 'navbar-buttons col center-align' + (nav.active ? ' active' : null);
                            return (
                                <UISref to={nav.destination} key={index}>
                                    <span className={classes}>{nav.text}</span>
                                </UISref>
                            )
                        })
                    }
                </div>
            </div>

        )
    }
});


const NavBarTest = React.createClass({
    render() {
        return (
            <NavBar title="loggr" subtitle="ChemPlate" username="Anurag"
                    navs={[{text: 'Dashboard', destination: 'main.dashboard', active: true}]}
                    searchBoxValues={['something', 'is', 'seriously', 'wrong']}
                    searchBoxPlaceholder="Search"
            />
        )
    }
});


export {NavBar, NavBarTest};