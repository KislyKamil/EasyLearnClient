import React, { Component } from 'react'
import RegisterForm from '../../components/UI/Auth/RegisterForm'
import Spinner from '../../components/UI/Spinner/Spinner'


class Register extends Component {


    state = {

        login: "",
        password: "",
        email: "",
        isLoading: false

    };



    onLoginChange = e => {
        this.setState({
            login: e.target.value
        });
    };

    onPasswordChange = e => {
        this.setState({
            password: e.target.value
        });
    };

    onEmailChange = e => {
        this.setState({
            email: e.target.value
        });

    };
    // const registerData = new FormData();

    handleSubmit = (event) => {


        event.preventDefault();

        this.setState({
            isLoading: true
        })

        fetch('http://localhost:8080/api/registerUser', {

            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                login: this.state.login,
                password: this.state.password,
                email: this.state.email,
            })


        }).then((response) => {

            console.log(response.status);

            this.setState({
                isLoading: false
            })
        })

    }



    render() {
        let body='';

        if (this.state.isLoading) {
            body = <Spinner />
        } else {
            body = <RegisterForm submit={this.handleSubmit} login={this.onLoginChange} password={this.onPasswordChange} email={this.onEmailChange} />
        }


        return (
            body 
        )
    }
}

export default Register;