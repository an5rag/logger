import React from 'react';
import Select from 'react-select';
import {Creatable} from 'react-select';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import _ from 'lodash';

const TextInput = React.createClass({
    getDefaultProps(){
        return {
            placeholder: 'Enter text',
            value: ''
        }
    },
    onChange(event){
        this.props.onChange(event.target.value);
    },
    render(){
        "use strict";
        return (
            <input type="text"
                   placeholder={this.props.placeholder}
                   value={this.props.value ? this.props.value : ''}
                   onChange={this.onChange}
            />
        )
    }
});


const NumberInput = React.createClass({
    getDefaultProps(){
        return {
            placeholder: 1234,
            value: ''
        }
    },
    onChange(event){
        this.props.onChange(event.target.value);
    },
    render(){
        return (
            <input type="number"
                   placeholder={this.props.placeholder}
                   value={this.props.value}
                   onChange={this.onChange}
            />
        )
    }
});


const SelectInput = React.createClass({
    handleChange(value){
        if(value){
          this.props.onChange(value.value);
        }
        else {
          this.props.onChange(value);
        }
    },
    render(){
        if(typeof this.props.value != "object") {

        }
        return (
            <Select
                value={this.props.value}
                options={this.props.options}
                onChange={this.handleChange}
                placeholder={this.props.placeholder}
            />
        )
    }
});

const MultiSelectInput = React.createClass({
    render(){
        return (
            <Select
                value={this.props.value}
                options={this.props.options}
                onChange={this.props.onChange}
                multi={true}
                placeholder={this.props.placeholder}
            />
        )
    }
});

const TimeInput = React.createClass({
    getDefaultProps(){
        return {
            placeholder: 'Enter Time'
        }
    },

    onChange(event, date) {
        this.props.onChange(date);
    },

    render(){
        let date = this.props.value;
        if (typeof date == "string")
            date = new Date(date);
        return (
            <TimePicker
                value={date}
                className="time-picker"
                hintText={this.props.placeholder}
                onChange={this.onChange}
                placeholder={this.props.placeholder}
            />
        )
    }
});

const DateInput = React.createClass({
    getDefaultProps(){
        return {
            placeholder: 'Enter Date'
        }
    },

    onChange(event, date) {
        this.props.onChange(date);
    },

    render(){
        let date = this.props.value;
        if (typeof date == "string")
            date = new Date(date);
        return (
            <DatePicker
                autoOk={true}
                value={date}
                className="time-picker"
                placeholder={this.props.placeholder}
                onChange={this.onChange}
            />
        )
    }
});


const FormTable = React.createClass({
    propTypes: {
        formData: React.PropTypes.array,
        cols: React.PropTypes.number,
        onSubmit: React.PropTypes.func,
        onChange: React.PropTypes.func
    },
    getDefaultProps(){
        return {
            cols: 1
        }
    },

    componentWillReceiveProps(nextProps){
      if(!_.isEqual(this.props.formData, nextProps.formData)){
        this.resetState(nextProps);
        console.log("resetting!");
        return;
      }

      // TODO: fix for similar length forms
    },

    resetState(props){
      const formData = props.formData.map((element) => {
          return {
              label: element.label,
              value: element.value
          };
      });
      this.setState({
          formData
        });
    },

    getInitialState(){
        const formData = this.props.formData.map((element) => {
            return {
                label: element.label,
                value: element.value
            };
        });
        return {
            formData
        }
    },

    onChange(index, value){
        const newFormData = this.state.formData.slice();
        newFormData[index].value = value;
        this.setState({
            formData: newFormData
        }, ()=> {
            let formData = this.state.formData;
            if (this.props.onChange) {
                let resultAsObject = {};
                for (let i = 0; i < formData.length; i++) {
                    resultAsObject[formData[i].label] = formData[i].value;
                }
                this.props.onChange(this.state.formData, resultAsObject);
            }
        });

    },

    getInputType(element, index){
        if (!element)
            return null;

        const value = this.state.formData[index] ? this.state.formData[index].value : null;
        const onChange = this.onChange.bind(this, index);

        switch (element.type) {
            case 'text':
                return (<TextInput
                    placeholder={element.placeholder}
                    value={value}
                    onChange={onChange}
                />);
            case 'number':
                return (<NumberInput
                    placeholder={element.placeholder}
                    value={value}
                    onChange={onChange}
                />);
            case 'select':
                return (<SelectInput
                    value={value}
                    onChange={onChange}
                    options={element.options}
                    placeholder={element.placeholder}
                />);
            case 'multi-select':
                return (<MultiSelectInput
                    value={value}
                    onChange={onChange}
                    options={element.options}
                    placeholder={element.placeholder}
                />);
            case 'creatable':
                return (<Creatable
                    value={this.state.formData[index].value}
                    onChange={this.onChange.bind(this, index)}
                    options={element.options}
                    multi={element.multi}
                    placeholder={element.placeholder}
                />);
            case 'time':
                return (<TimeInput
                    value={value}
                    onChange={onChange}
                    placeholder={element.placeholder}
                />);
            case 'date':
                return (<DateInput
                    value={value}
                    onChange={onChange}
                    placeholder={element.placeholder}
                />);
            default:
                return null
        }

    },
    render() {
        const cols = (12 / this.props.cols).toFixed(0);
        const colsClass = 'col s' + cols.toString();
        const elementClass = 'row ' + colsClass + " form-table-element";
        const formElements = this.props.formData.map((element, index)=> {
            return (
                <div className={elementClass} key={index}>
                    <div className="col s6 form-label">{element ? element.label : null}</div>
                    <div className="col s6 form-input">
                        {this.getInputType(element, index)}
                    </div>
                </div>
            )

        });
        return (
            <div className="row form-table">
                {formElements}
            </div>

        )
    }
});

const FormTableTest = () =>(
    <FormTable
        formData={[
            {
                label: 'Text Input',
                type: 'text',
            }, {
                label: 'Number Input',
                type: 'number'
            }, {
                label: 'Time Input',
                type: 'time',
                placeholder: 'Enter time',
            }, {
                label: 'Date Input',
                type: 'date',
                placeholder: 'Enter date'
            }, {
                label: 'Single Select Input',
                type: 'select',
                placeholder: 'Select',
                value: 'value2',
                options: [
                    {
                        value: 'value1',
                        label: 'Option 1'
                    }, {
                        value: 'value2',
                        label: 'Option 2'
                    },
                ]
            }, {
                label: 'Multi Select Input',
                type: 'multi-select',
                options: [
                    {
                        value: 'value1',
                        label: 'Option 1'
                    }, {
                        value: 'value2',
                        label: 'Option 2'
                    }, {
                        value: 'value3',
                        label: 'Option 3'
                    },
                ]
            }
        ]}
        cols={2}
    />

);

export {FormTable, FormTableTest};
