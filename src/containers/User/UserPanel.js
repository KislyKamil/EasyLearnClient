import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserSettings from './../../components/UserSettings/UserSettings'
import './UserPanel.css'



class UserPanel extends Component {

    state = {
        login: "",
        password: "",
        passwordAgain: "",
        email: ""
    }

    componentDidMount = () => {
        document.getElementsByClassName("sideMenu")[0].style.display = "none"
    }

    onChangeHandler = (event) => {

        this.setState({

            ...this.state,
            [event.target.id]: event.target.value

        })

    }

    onFocusHandler = (event) => {

        this.setState({

            ...this.state,
            [event.target.id]: ""

        })
    }
    render() {


        return (
            <div className="container-user">

                <div className="card-user">
                    <img src="https://lh3.googleusercontent.com/oUUiPB9sq3ACq4bUaRmo8pgvC4FUpRRrQKcGIBSOsafawZfRpF1vruFeYt6uCfL6wGDQyvOi6Ez9Bpf1Fb7APKjIyVsft7FLGR6QqdRFTiceNQBm1In9aZyrXp33cZi9pUNqjHASdA=s170-no" alt="Person" className="card-user__image" />
                    <p className="card-user__name">{this.props.username}</p>
                    <div className="grid-container">

                        <div className="grid-child-posts">
                            15lvl
                            </div>

                        <div className="grid-child-followers">
                            22 points
                            </div>

                    </div>
                    <button className="draw-border" >Statystyki</button>
                    <button className="draw-border" >Szczególy</button>
                </div>

                <UserSettings
                    login={this.state.login}
                    password={this.state.password}
                    passwordAgain={this.state.passwordAgain}
                    email={this.email}
                    change={this.onChangeHandler}
                    focus={this.onFocusHandler}
                />

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.user.username,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps)(UserPanel)