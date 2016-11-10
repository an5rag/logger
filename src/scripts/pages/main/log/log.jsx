import React from 'react';
import {TableTest} from 'buildingBlocks/table'

const Log = React.createClass({

    getInitialState(){
        let lineId = this.props.resolves.$stateParams.lineId;
        if (!lineId) {
            lineId = this.props.resolves.lines.data.length > 0 ? this.props.resolves.lines.data[0]._id : 0;
            // this.props.transition.router.stateService.go('main.log.line', {lineId: randomLineId});
        }
        return this.props.resolves.lines.data.find((line) => line._id == lineId);
    },

    render() {
        console.log(this.state);
        return (

            <div className="row">
                <div className="form-container-log col s5">
                    <div className="form">
                        <div className="form-chunk-log">

                            {this.state.constraints.map((element, i) => {
                                if(element.class=='g')
                                    return (
                                        <div className="form-element row">
                                            <div className="col s6 name">
                                                {element.name}
                                            </div>
                                            <div className="col s6 value">
                                                <input type="text"/>
                                            </div>
                                        </div>
                                    );

                            })}
                        </div>
                        <div className="title">
                            {this.state.name}
                        </div>
                        <div className="form-chunk-log">

                                {this.state.constraints.map((element, i) => {
                                    if(element.class!='g')
                                    return (
                                        <div className="form-element row">
                                            <div className="col s6 name">
                                                {element.name}
                                            </div>
                                            <div className="col s6 value">
                                                <input type="text"/>
                                            </div>
                                        </div>
                                    );

                                })}
                        </div>
                        <div className="submit-button">Add Entry</div>
                    </div>
                </div>
                <div className="table-container col s7">
                    <TableTest/>
                </div>
            </div>
        );
    }
});

export default Log;