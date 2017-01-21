import React from 'react';
import ReactDOM from 'react-dom';
import {UISref, UIView} from 'ui-router-react';

const LoginBox = React.createClass({
    propTypes: {
        onSubmit: React.PropTypes.func.isRequired,
    },

    getInitialState() {
        return {
            username: '',
            password: '',
            errorVisible: false,
            error: 'Both fields are required.',
        }
    },
    handleChange(e) {
        this.setState({[e.target.name]: e.target.value}, ()=> {
            if (this.state.username == "" || this.state.password == "") {
                this.setState({error: 'Both fields are required.'});
            } else {
                this.setState({error: ''});
            }
        });

    },
    onKeyDown(event){
        const enterKeyCode = 13;
        if (event.keyCode == enterKeyCode) {
            this.handleSubmit();
        } else {
            this.setState({errorVisible: false});
        }
    },

    handleSubmit(){
        if (this.state.error) {
            this.setState({errorVisible: true});
        } else {
            this.props.onSubmit(this.state);
        }
    },
    render() {
        const error = (
            <div className="error">
                {this.state.error}
            </div>
        );


        return (
            <div className="login-box">
                {(this.state.errorVisible) ? error : null}
                <div className=" login-box-element">
                    <span className="icon-element ">
                        <i className="fa fa-user" aria-hidden="true"></i>
                    </span>
                    <input
                        onKeyDown={this.onKeyDown}
                        autoFocus={true}
                        type="text"
                        name="username"
                        placeholder="Employee ID"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                </div>
                <div className=" login-box-element">
                    <span className="icon-element ">
                        <i className="fa fa-lock" aria-hidden="true"></i>
                    </span>
                    <input
                        onChange={this.handleChange}
                        onKeyDown={this.onKeyDown}
                        className="col s12"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                    />
                </div>

                <div className="submit-button" onClick={this.handleSubmit}>Login</div>
            </div>
        )
    }
});


const LoginBoxTest = React.createClass({
    onSubmit(formData){
        console.log(formData);
    },
    render() {
        return (
            <LoginBox onSubmit={this.onSubmit}/>
        )
    }
});


export {LoginBox, LoginBoxTest};
