import React from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Toggle from 'material-ui/Toggle';
import {UISref, UIView} from 'ui-router-react';
const styles = {
    block: {
        maxWidth: 250,
    },
    toggle: {
        marginBottom: 16,
    },
    thumbOff: {
        backgroundColor: '#ffcccc',
    },
    trackOff: {
        backgroundColor: '#ff9d9d',
    },
    thumbSwitched: {
        backgroundColor: 'red',
    },
    trackSwitched: {
        backgroundColor: '#ff9d9d',
    },
    labelStyle: {
        color: 'red',
    },
};
class Create extends React.Component {
    render() {
        return (
            <div className="form-container-create">
                <div className="form">
                    <div className="title">
                        Create Line
                    </div>
                    <div className="form-chunk">
                        <div className="form-element row">
                            <div className="col s6 name">
                                Name
                            </div>
                            <div className="col s6 value">
                                <input type="text"/>
                            </div>
                        </div>
                        <div className="form-element row">
                            <div className="col s6 name">
                                Description
                            </div>

                            <div className="col s6 value">
                                <input type="text"/>
                            </div>
                        </div>
                        <div className="form-element row">
                            <div className="col s6 name">
                                Constraint Name
                            </div>

                            <div className="col s6 value">
                                <input type="text"/>
                            </div>
                            <div className="col s6 name">
                                Constraint Type
                            </div>

                            <div className="col s6 value">
                                <Toggle
                                    style={styles.toggle}
                                />
                            </div>



                            <div className="col s12 add-box">
                                <span className="add">
                                    <i className="fa fa-plus-square-o" aria-hidden="true"></i>
                                    Add Another
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="submit-button">Submit</div>
                </div>
            </div>

        );
    }
}

export default Create;