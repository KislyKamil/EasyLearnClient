import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserSettings from './../../components/UserSettings/UserSettings'
import Stats from './../../components/Stats/Stats'
import * as ActionTypes from './../../store/actions'
import database from '../../config'

import './UserPanel.css'

class UserPanel extends Component {

    state = {
        login: "",
        password: "",
        passwordAgain: "",
        email: "",
        view: "details",

        results: {
            test: 0,
            speech: 0,
            text: 0
        }
    }

    charData = [['Testy', 'Wynik']];
    componentDidMount = () => {
        document.getElementsByClassName("sideMenu")[0].style.display = "none"


        let obj;
        database.ref('/Stats/' + this.props.userId).once('value').then((snapshot) => {
            obj = snapshot.val()
        }).then(() => {
            obj.interval.map((ele, id) => {
                this.charData.push([id, parseFloat(ele)])
            })
        }).then(() => {

        });


        this.getInitStats()
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

        this.submitChange();

    }

    getInitStats = () => {
        fetch('http://localhost:8080/api/Details/' + this.props.userId, {

            method: "GET",
            headers: {
                'Authorization': "Bearer " + this.props.token,
                'Content-Type': 'application/json'
            },
        }).then((response) => {

            return response.json();

        }).then((data) => {

            let tmp = { test: data.testAll, speech: data.speechAll, text: data.textAll }

            this.setState({
                ...this.state,
                results: tmp
            })
        })
    }

    submitChange = () => {
        fetch('http://localhost:8080/api/EditUser', {

            method: "POST",
            headers: {
                'Authorization': "Bearer " + this.props.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                id: this.props.userId,
                username: this.state.login,
                password: this.state.password,
                email: this.state.email
            })
        }).then((response) => {

            return response.json();

        }).then((data) => {

            console.log(data)
            this.props.storeUser({ username: data.username, token: data.token, userId: this.props.userId, testAmount: this.props.testAmount })
        })
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
                <Stats stats={this.state.results} userId={this.props.userId} data={this.charData} />
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

                        </div>

                        <div className="grid-child-followers">

                        </div>

                    </div>
                    <button className="draw-border" onClick={() => this.onClickHandler("stats")}>Statystyki</button>
                    <button className="draw-border" onClick={() => this.onClickHandler("details")}>Szczegóły</button>
                </div>

                {this.userPanelPart}

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.user.username,
        userId: state.user.id,
        token: state.user.token,
        testAmount: state.user.testCount
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeUser: (data) => dispatch({ type: ActionTypes.STORE_USER, id: data.userId, username: data.username, token: data.token, testCount: data.testAmount }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel)