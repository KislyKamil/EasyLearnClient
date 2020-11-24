import React, { Component } from 'react'
import './SpeechMenu.css'
import TestPart from '../../TestPart/TestPart'
import Spinner from './../Spinner/SpinnerNd'
import TestBox from './../../TestPart/TestBox'
import { connect } from 'react-redux'

import database from './../../../config'

const randomWords = require('random-words');


let testBody = []
let btn = <Spinner />
class SpeechMenu extends Component {

    state = {
        isTestOn: false,
        questions: [
            {
                word: '',
                pronun: ''
            },
            {
                word: '',
                pronun: ''
            },
            {
                word: '',
                pronun: ''
            },
            {
                word: '',
                pronun: ''
            },
            {
                word: '',
                pronun: ''
            },
            {
                word: '',
                pronun: ''
            },
            {
                word: '',
                pronun: ''
            }
        ],
        currentPage: 0,
        points: 0
    }


    componentDidMount = () => {


        let tmpQuestions
        database.ref('SpeechTests/questions').once('value').then((snapshot) => {
            tmpQuestions = snapshot.val()
        }).then(() => {
            this.setState({
                ...this.state,
                questions: tmpQuestions
            })

            this.generateTest(tmpQuestions);
        })

        btn = <div className="test-intro-box" onClick={this.startTest}><p>Generate test</p></div>


    }


    startTest = () => {

        this.setState({
            ...this.state,
            isTestOn: true
        })
    }

    nextQuestionHandler = () => {
        let tmp = this.state

        tmp.currentPage++
        tmp.points++
        
        document.getElementById("ts").innerText = " "

        this.setState({
            ...this.state,
            currentPage: tmp.currentPage,
            points: tmp.points
        })
    }

    submitResults = () => {
        btn = <Spinner />

        fetch('http://localhost:8080/api/SpeechTestResult', {

            method: "POST",
            headers: {
                'Authorization': "Bearer " + this.props.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                userId: this.props.userID,
                points: this.state.points
            })
        }).then(() => {

            document.getElementById("ts").innerText = " "
            btn = (
                <div className="test-intro-box" onClick={this.startTest}><p>Generate test</p></div>
            )

            this.setState({
                ...this.state,
                isTestOn: false,
                currentPage: 0
            })


        })

    }

    generateTest = (questions) => {

        for (let i = 0; i < 7; i++) {


            if (i === 6) {
                testBody.push(
                    <p className="send" onClick={this.submitResults}>Zakończ</p>
                )
                continue
            }

            if (Math.round(Math.random()) === 0) {
                testBody.push(
                    <TestPart key={i} words={questions[Math.round(Math.random() * 6)]} nextQuestion={this.nextQuestionHandler} />
                )

                continue
            }

            testBody.push(
                <TestBox key={i} randoms={this.getRands()} nextQuestion={this.nextQuestionHandler} />
            )

        }
    }

    getRands = () => {

        let rands = [
            randomWords(),
            randomWords()
        ]

        return rands
    }


    render() {

        console.log(testBody)
        let body = this.state.isTestOn ? testBody[this.state.currentPage] : btn

        return (
            <div className='sp-menu-box'>
                {body}
            </div>
        )
    }


}

const mapStateToProps = state => {
    return {
        token: state.user.token,
        userID: state.user.id
    }
}

export default connect(mapStateToProps)(SpeechMenu)