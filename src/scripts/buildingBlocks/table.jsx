import React from 'react';
import moment from 'moment';
import CircularProgress from 'material-ui/CircularProgress';


const Table = React.createClass({
    propTypes: {
        tableHeaders: React.PropTypes.array,
        tableRows: React.PropTypes.array,
        onRowClick: React.PropTypes.func,
    },

    getDefaultProps(){
        return {
            tableRows: [],
            tableHeaders: []
        }
    },

    handleRowClick(rowId, event){
        this.props.onRowClick(rowId);
    },

    render() {
        let headers = [];
        if (this.props.tableHeaders && this.props.tableHeaders.map) {
            headers = this.props.tableHeaders.map((header, index) => {
                return (
                    <th key={index}>
                        {header}
                    </th>
                );
            });
        }

        const cols = headers.length;
        const self = this;

        let rows = [];
        if (this.props.tableRows && this.props.tableRows.map) {
            rows = this.props.tableRows.map((row, index) => {
                const rowElements = row.data.map((element, index) => {
                    if (moment(element, moment.ISO_8601, true).isValid())
                        element = moment(element).fromNow();
                    if (typeof element == "object")
                        element = "Object";
                    return (
                        <td key={index} onClick={self.handleRowClick.bind(this, row.id)}>
                            {String(element)}
                        </td>
                    );
                });
                return (
                    <tr key={index}>
                        {rowElements}
                    </tr>
                )

            });
        }

        if (rows.length == 0) {
            rows = (
                <tr>
                    <td colSpan={cols}>
                        There is nothing to show here.
                    </td>
                </tr>
            )
        }

        let view;

        if (this.props.isLoading) {
            view = (
                <div className="default-message">
                    <CircularProgress size={80} thickness={5}/>
                </div>
            )
        } else {
            view = (
                    <table className="bb-table">
                        <thead>
                        <tr>
                            {headers}
                        </tr>
                        </thead>
                        <tbody>
                        {rows}
                        </tbody>
                    </table>
            );
        }

        return view;
    }

});

const TableTest = React.createClass({
    onRowSelect(rows){
        console.log(rows);

    },
    render(){
        const headers = ['H1', 'H2', 'H3'];
        const rows = [
            {
                data: [
                    'r1h1',
                    'r1h2',
                    'r1h3'
                ]
            },
            {
                data: [
                    'r2h1',
                    'r2h2',
                    'r2h3'
                ]
            },
            {
                data: [
                    'r3h1',
                    'r3h2',
                    'r3h3',
                ]
            }
        ];
        return (
            <Table
                tableRows={rows}
                tableHeaders={headers}
            />
        );
    }
});

export {Table, TableTest};
