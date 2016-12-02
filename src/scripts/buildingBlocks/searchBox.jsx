import React from 'react';
import ReactDOM from 'react-dom';
import Popover from 'material-ui/Popover';
import fuzzy from 'fuzzy';
import Fuse from 'fuse.js';
import {Menu, MenuItem} from 'material-ui/Menu';

import {UISref, UIView} from 'ui-router-react';

const SearchBox = React.createClass({
    propTypes: {
        searchBoxValues: React.PropTypes.array.isRequired,
        placeholder: React.PropTypes.string,
    },

    getInitialState() {
        return {
            listValues: this.props.searchBoxValues,
            searchBoxOpen: false,
            open: false,
            activeOptionIndex: 0
        }
    },

    handleChange(event) {
        const arr = this.props.searchBoxValues.map((obj) => {
            let toReturn = {};
            toReturn.label = obj.name ? obj.name : obj.label ? obj.label : null;
            toReturn.onClick = obj.onClick;
            return toReturn;
        });

        let fuse = new Fuse(arr, {keys: ["label"], include: ['onClick']});
        let results = fuse.search(event.target.value);
        results = results.map((element)=>element.item);
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

    handleRequestClose(){
        this.setState({
            open: false,
        });
    },

    handleClick(element, event){
        this.setState({
            searchBoxOpen: false,
            open: false
        });
        if (element.onClick)
            element.onClick();
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
                                    <div className="select-list-element" key={index}
                                         onClick={this.handleClick.bind(this, element)}>{element.label? element.label : element.name}</div>
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
            <SearchBox searchBoxValues={['baconing', 'narwhal', 'a mighty bear canoe']}
                       placeholder="Enter Search Stuff"/>
        )
    }
});


export {SearchBox, SearchBoxTest};