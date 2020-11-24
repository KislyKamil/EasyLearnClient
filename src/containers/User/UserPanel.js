import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserSettings from './../../components/UserSettings/UserSettings'
import Stats from './../../components/Stats/Stats'
import './UserPanel.css'

class UserPanel extends Component {

    state = {
        login: "",
        password: "",
        passwordAgain: "",
        email: "",
        view: "details"
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

    onSubmitHandler = () => {

        if (this.state.password !== this.state.passwordAgain) {

            alert("Hasla musza byc takie same")
            return
        }

        alert("test")
    }

    onClickHandler = (type) => {

        this.setState({
            ...this.state,
            view: type
        })
    }

    currentView = () => {
        if (this.state.view === "stats") {
            this.userPanelPart = (
                <Stats />
            )
        }
        if (this.state.view === "details") {
            this.userPanelPart = (
                <UserSettings
                    login={this.state.login}
                    password={this.state.password}
                    passwordAgain={this.state.passwordAgain}
                    email={this.email}
                    change={this.onChangeHandler}
                    submit={this.onSubmitHandler}
                />
            )
        }
    }
    render() {

        this.currentView()

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
                    <button className="draw-border" onClick={() => this.onClickHandler("stats")}>Statystyki</button>
                    <button className="draw-border" onClick={() => this.onClickHandler("details")}>Szczególy</button>
                </div>

                {this.userPanelPart}

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