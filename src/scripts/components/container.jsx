import React from 'react';
import {UISref, UIView} from 'ui-router-react';

const AppBar = React.createClass({
    propTypes: {
        title: React.PropTypes.string,
    },
    render() {
        const props = this.props;
        return (
            <div className="row appBar z-depth-1">
                <UISref to="login">
                    <div className="col s12 title">
                        <div>
                            {props.title}
                        </div>
                    </div>
                </UISref>

            </div>
        )
    }
});


class BuildingBlocks extends React.Component {
    render() {
        return (
            <div>
                <AppBar title="logger building blocks"></AppBar>
                <div className="row">
                    <div className="col s10 offset-s1 card">
                        <UIView/>
                    </div>
                </div>
            </div>
        );
    }
}

export default BuildingBlocks;
