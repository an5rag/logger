import React from 'react';
import ReactDOM from 'react-dom';

const SelectList = React.createClass({
    propTypes: {
        // array of {label/name, value,..}
        selectValues: React.PropTypes.array.isRequired,
        onClick: React.PropTypes.func
    },


    handleClick(event) {

    },


    render() {
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
                                    <div className="select-list-element" key={index}>{element.string}</div>
                                ))}
                            </div>
                        </Popover>
            </span>

        )
    }
});



export {SelectList};