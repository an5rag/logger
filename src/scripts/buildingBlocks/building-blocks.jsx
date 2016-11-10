import React from 'react';
import {UISref, UIView} from 'ui-router-react';
import {NavBar} from './navbar'


class BuildingBlocks extends React.Component {
    render() {
        return (
            <div>
                <NavBar
                    title="loggr"
                    subtitle="Building-blocks"
                    navs={
                        [{
                            text: 'NavBar',
                            destination: 'building-blocks.navbar'
                        }, {
                            text: 'searchBox',
                            destination: 'building-blocks.searchbox'
                        }, {
                            text: 'FormBuilder',
                            destination: 'building-blocks.formbuilder'
                        },{
                            text: 'table',
                            destination: 'building-blocks.table'
                        }]
                    }
                />
                <UIView/>
            </div>
        );
    }
}

export default BuildingBlocks;
