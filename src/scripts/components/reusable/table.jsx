import React from 'react';

const tableHeader = "Awesome Table 1.0";

const tableData = [];

const onRowClick = function (row) {
    console.log("Clicked row info: ", row);
};
const onRowDelete = function (rows) {
    console.log("Deleted rows info: ", rows);
};


const onRowEdit = function (row) {
    console.log("Edited row info: ", row);
};

const options = {
    editable: true
};

const Table = React.createClass({
    propTypes: {
        tableHeader: React.PropTypes.string,
        tableData: React.PropTypes.array,
        onRowClick: React.PropTypes.func,
        editable: React.PropTypes.bool,
        onRowEdit: React.PropTypes.func,
        onRowsDelete: React.PropTypes.func
    },
    render() {
        return (
            <div className="bb-table">
                <div className="bb-table-header">
                </div>
            </div>

        )
    }
});

export default Table;
