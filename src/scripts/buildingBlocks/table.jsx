import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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

const myTable = React.createClass({
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
                    Blahhhhh
                </div>
            </div>

        )
    }
});

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const tableHeaderStyles = {
    backgroundColor: 'black',
    color:'white',
    fontFamily:"'Source Sans Pro', 'sans-serif'",
};
const tableHeaderColumnStyles = {
    fontSize: '18px'
};

const tableBodyStyles ={
    fontFamily:"'Source Sans Pro', 'sans-serif'",
    fontSize: '18px'
};
const TableTest = React.createClass({
    onRowSelect(rows){
        console.log(rows);

    },
    render(){
        return (
            <MuiThemeProvider>
                <Table
                    onRowSelection={this.onRowSelect}
                    selectable={true}
                    height="60vh"
                    fixedHeader={true}
                >
                    <TableHeader style = {tableHeaderStyles}>
                        <TableRow>
                            <TableHeaderColumn style={{fontSize: '14px'}}>ID</TableHeaderColumn>
                            <TableHeaderColumn style={{fontSize: '14px'}}>Name</TableHeaderColumn>
                            <TableHeaderColumn style={{fontSize: '14px'}}>Status</TableHeaderColumn>
                            <TableHeaderColumn style={{fontSize: '14px'}}>ID</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody style={tableBodyStyles} >

                        <TableRow>
                            <TableRowColumn>3</TableRowColumn>
                            <TableRowColumn>Stephanie Sanders</TableRowColumn>
                            <TableRowColumn>Employed</TableRowColumn>
                            <TableRowColumn>3</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>3</TableRowColumn>
                            <TableRowColumn>Stephanie Sanders</TableRowColumn>
                            <TableRowColumn>Employed</TableRowColumn>
                            <TableRowColumn>3</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>3</TableRowColumn>
                            <TableRowColumn>Stephanie Sanders</TableRowColumn>
                            <TableRowColumn>Employed</TableRowColumn>
                            <TableRowColumn>3</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>4</TableRowColumn>
                            <TableRowColumn>Steve Brown</TableRowColumn>
                            <TableRowColumn>Employed</TableRowColumn>
                        </TableRow><TableRow>
                            <TableRowColumn>3</TableRowColumn>
                            <TableRowColumn>Stephanie Sanders</TableRowColumn>
                            <TableRowColumn>Employed</TableRowColumn>
                            <TableRowColumn>3</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>3</TableRowColumn>
                            <TableRowColumn>Stephanie Sanders</TableRowColumn>
                            <TableRowColumn>Employed</TableRowColumn>
                            <TableRowColumn>3</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>3</TableRowColumn>
                            <TableRowColumn>Stephanie Sanders</TableRowColumn>
                            <TableRowColumn>Employed</TableRowColumn>
                            <TableRowColumn>3</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>4</TableRowColumn>
                            <TableRowColumn>Steve Brown</TableRowColumn>
                            <TableRowColumn>Employed</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </MuiThemeProvider>
        );
    }
});

export {Table, TableTest};
