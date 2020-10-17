import React, { Component } from 'react'
import LoginForm from '../../components/UI/Auth/LoginForm'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as ActionTypes from './../../store/actions'

import { connect } from 'react-redux'

class Login extends Component {

    state = {

        login: "",
        password: "",
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

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            isLoading: true
        })

        fetch('http://localhost:8080/api/loginUser', {

            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                login: this.state.login,
                password: this.state.password,
            })
        }).then((response) => {

            this.setState({
                isLoading: false
            });

            return response.json();

        }).then((data) => {
            // console.log(data)

            if (data.msg === null) {
                this.props.authUser();

                this.props.storeUser(data);
            }
        })
    }


    render() {

        let body = '';

        if (this.state.isLoading) {
            body = <Spinner />
        } else {
            body = <LoginForm submit={this.handleSubmit} login={this.onLoginChange} password={this.onPasswordChange} />
        }

        return (
            body
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authUser: () => dispatch({ type: ActionTypes.AUTH }),
        storeUser: (data) => dispatch({ type: ActionTypes.STORE_USER, id: data.id, username: data.username, token: data.token })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)