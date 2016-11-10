import React from 'react';
import {UISref, UIView} from 'ui-router-react';
import {NavBar} from 'buildingBlocks/navbar'

class Main extends React.Component {
    render() {
        return (
            <div>
                <NavBar title="loggr" subtitle="ChemPlate" username="Joseph Burnham"
                        navs={[{text: 'Dashboard', destination: 'main.dashboard'},
                            {text: 'Log', destination: 'main.log'},
                            {text: 'Create', destination: 'main.create'},
                            {text: 'Jobs in Progress'}
                            ]}
                        searchBoxValues={this.props.resolves.lines.data}
                        searchBoxPlaceholder="Search"
                />
                <UIView/>
            </div>
        );
    }
}

export default Main;