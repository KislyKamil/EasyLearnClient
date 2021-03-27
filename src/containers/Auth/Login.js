import React, { Component } from 'react'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as ActionTypes from './../../store/actions'
import Modal from './../../components/UI/Modal/Modal'
import { NavLink } from 'react-router-dom'

import Button from './../../components/UI/Button/Button'
import SubmitButton from './../../components/UI/Button/SubmitButton'

import { connect } from 'react-redux'



class Login extends Component {

    state = {

        isLogged: true,
        login: "",
        password: "",
        isLoading: false,
        isModal: false
    };


    onLoginChange = e => {
        this.setState({
            ...this.state,
            login: e.target.value
        });

    };

    onPasswordChange = e => {

        this.setState({
            ...this.state,
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

            return response.json();

        }).then((data) => {


            if (data.msg === null) {
                this.props.authUser();


                this.props.storeUser(data);
                this.props.localStore();

                this.setState({
                    isLoading: false,
                    isModal: true
                });
                return;
            }


            this.setState({
                isLoading: false,
            });
            alert("Niepoprawne dane logowania")

        })
    }

    componentDidMount() {

        console.log("Mount")
    }


    closeModalHandler = () => {

        this.setState({
            ...this.state,
            isModal: false
        })
    }

    render() {
        let modal = ""

        if (this.state.isModal) {
            modal = <Modal handleModal={this.closeModalHandler} />
        }

        let body

        this.props.examOff();

        let buttons = (
            <div>
                <SubmitButton text='Zaloguj' />

                <NavLink to='/Signup' exact>
                    <Button text='Załóż konto' />
                </NavLink>
            </div>
        )

        if (this.state.isLoading) {
            body = <Spinner />
        } else {
            body =
                <div className="body">
                    <div className="container-md">
                        <div className="form">
                            <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="input-group mb-2" >
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="addon-wrapping">Nazwa użytkownika</span>
                                            </div>
                                            <input type="text" className="form-control" placeholder="Nazwa użytkownika"
                                                aria-label="Username" aria-describedby="addon-wrapping"
                                                value={this.state.login}
                                                onChange={this.onLoginChange}
                                            />
                                        </div>
                                        <div className="input-group mb-2" >
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="addon-wrapping">Hasło</span>
                                            </div>
                                            <input type="password" className="form-control"
                                                placeholder="password" aria-label="Username" aria-describedby="addon-wrapping"
                                                value={this.state.password}
                                                onChange={this.onPasswordChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {buttons}
                            </form>
                        </div>
                        {modal}
                    </div>
                </div>
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
        storeUser: (data) => dispatch({ type: ActionTypes.STORE_USER, id: data.id, username: data.username, token: data.token, testCount: data.testAmount, email: data.email }),
        localStore: () => dispatch({ type: ActionTypes.SAVE_STORAGE }),
        examOff: () => dispatch({ type: ActionTypes.EXAM_OFF })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)