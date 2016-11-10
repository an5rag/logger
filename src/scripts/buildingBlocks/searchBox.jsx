import React from 'react';
import ReactDOM from 'react-dom';
import Popover from 'material-ui/Popover';
import fuzzy from 'fuzzy';

import {UISref, UIView} from 'ui-router-react';

const SearchBox = React.createClass({
    propTypes: {
        // array of {label/name, value,..}
        searchBoxValues: React.PropTypes.array.isRequired,
        placeholder: React.PropTypes.string,
    },

    getInitialState() {
        return {
            listValues: this.props.searchBoxValues,
            searchBoxOpen: false,
            open: false,
        }
    },

    handleChange(event) {
        const arr = this.props.searchBoxValues.map((obj) => {
            return obj.name? obj.name : obj.label? obj.label : null;
        });

        const results = fuzzy.filter(event.target.value, arr).map((element)=>element.string);
        console.log(event.target.value);
        console.log(this.props.searchBoxValues);
        console.log(results);
        this.setState({
            listValues: results,
            open: true,
            anchorEl: event.currentTarget,
        });
    },

    searchFocus(){
        this.setState({
            searchBoxOpen: !this.state.searchBoxOpen
        });
        ReactDOM.findDOMNode(this.refs.searchInput).focus();
    },

    searchBlur(){
        this.setState({
            searchBoxOpen: false,
            open: false
        });
    },
    handleRequestClose: () => {
        this.setState({
            open: false,
        });
    },


    render() {
        const searchBoxClasses = 'search-box' + ( this.state.searchBoxOpen ? ' full-width' : '');
        return (
            <span className="search-box">
                            <i
                                onClick={this.searchFocus}
                                className="fa fa-search search-icon"
                                aria-hidden="true"/>
                            <input
                                ref="searchInput"
                                type="text"
                                className={searchBoxClasses}
                                onBlur={this.searchBlur}
                                placeholder={this.props.placeholder}
                                onChange={this.handleChange}
                            />
                        <Popover
                            open={this.state.open}
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            onRequestClose={this.handleRequestClose}
                        >
                            <div className="select-list">
                                {this.state.listValues.map((element, index) => (
                                    <div className="select-list-element" key={index}>{element}</div>
                                ))}
                            </div>
                        </Popover>
            </span>

        )
    }
});


const SearchBoxTest = React.createClass({
    render() {
        return (
            <SearchBox searchBoxValues={['baconing', 'narwhal', 'a mighty bear canoe']} placeholder="Enter Search Stuff"/>
        )
    }
});


export {SearchBox, SearchBoxTest};