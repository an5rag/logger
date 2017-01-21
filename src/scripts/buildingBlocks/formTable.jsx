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
            value: '',
            name: ''
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
                   name={this.props.name}
            />
        )
    }
});


const NumberInput = React.createClass({
    getDefaultProps(){
        return {
            placeholder: 1234,
            value: '',
            name: ''
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
                   name={this.props.name}
            />
        )
    }
});


const SelectInput = React.createClass({
    handleChange(value){
        if (value) {
            this.props.onChange(value.value);
        }
        else {
            this.props.onChange(null);
        }
    },
    render(){
        if (typeof this.props.value != "object") {

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

const OptionsInput = React.createClass({
    getDefaultProps(){
        return {
            placeholder: 'Enter items separated by ; or ,',
            value: []
        }
    },
    onChange(event){
        const value = event.target.value;
        const arrayOfItems = _.split(value, /[;,]+/).map(e=>e.trim());
        if(_.last(event.target.value) == ' '){
            arrayOfItems[arrayOfItems.length - 1]+=' ';
        }
        this.props.onChange(arrayOfItems);
    },

    render(){

        let value = '';
        if(this.props.value.length >0){
            value = this.props.value.reduce((value, current) => value.concat(',' + current));
        }

        return (
            <div>
                <textarea
                    placeholder={this.props.placeholder}
                    value={value}
                    onChange={this.onChange}
                />
            </div>
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
        onChange: React.PropTypes.func,
        startCase: React.PropTypes.bool
    },

    getDefaultProps(){
        return {
            cols: 1,
            formData: [],
            startCase: false
        }
    },

    getInitialState(){
      return{
        valid: false
      }
    },

    componentWillReceiveProps(nextProps){
        if (!_.isEqual(this.props.formData, nextProps.formData)) {
            this.resetState(nextProps);
            return;
        }
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
                value: element.value,
                required: element.required
            };
        });
        return {
            formData,
            valid: false
        }
    },

    onChange(index, value){
        const newFormData = this.state.formData.slice();
        newFormData[index].value = value;
        this.setState({
            formData: newFormData
        }, ()=> {
            let formData = this.state.formData;
            if (this.props.handleValidation)
              this.handleIncompleteness();
            if (this.props.onChange) {
                let resultAsObject = {};
                for (let i = 0; i < formData.length; i++) {
                    resultAsObject[formData[i].label] = formData[i].value;
                }
                this.props.onChange(this.state.formData, resultAsObject);
            }
        });

    },

    handleIncompleteness(){
        let isValid = true;
        this.state.formData.map((element) => {
            if (element.required && element.value == undefined || element.required && element.value == '' || element.required && element.value == null)
                isValid = false;
        });
        this.setState({
            valid: isValid
        }, () => {
            if (this.props.handleValidation)
                this.props.handleValidation(this.state.valid);
        })
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
                    name={element.label}
                />);
            case 'number':
                return (<NumberInput
                    placeholder={element.placeholder}
                    value={value}
                    onChange={onChange}
                    name={element.label}
                />);
            case 'options-input':
                return (<OptionsInput
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
                    value={value}
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

    componentDidMount(){
        this.handleIncompleteness();
    },

    render() {
        const formElements = this.props.formData.map((element, index)=> {
            let label = element ? (this.props.startCase? _.startCase(element.label) : element.label) : null;
            if (element.required) {
                label += ' *';
            }
            return (
                <tr key={index}>
                    <td className="form-label">{label}</td>
                    <td className="">
                        {this.getInputType(element, index)}
                    </td>
                </tr>
            )
        });

        return (
            <div className="form-table">
                <table>
                    <tbody>
                    {formElements}
                    </tbody>
                </table>
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
                required: true
            }, {
                label: 'Number Input',
                type: 'number'
            }, {
                label: 'Time Input',
                type: 'time',
                placeholder: 'Enter time',
            }, {
                label: 'Options Input',
                type: 'options-input',
                placeholder: 'Enter options',
                value: ['what', 'is'],
                suggestions: ['you', 'are', 'a', 'hoe']
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
