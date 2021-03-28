import React, { Component } from 'react'
import Questions from './../../components/Questions/Questions'
import { connect } from 'react-redux'
import firebase from "firebase/app"
import 'firebase/database'
import 'firebase/analytics'
import * as ActionTypes from './../../store/actions'
import { Redirect } from 'react-router-dom';
import ButtonBar from '../../components/ButtonBar/ButtonBar'

import database from './../../config'
import './Exam.css'

const randomWords = require('random-words');

class Exam extends Component {

    state = {
        exam: {
            userId: this.props.userID,
            questions: [
                {
                    id: '',
                    engWord: '',
                    plWord: '',
                    randWords: [
                        randomWords(),
                        randomWords(),
                        randomWords(),
                    ],
                    isCorrect: false,
                    marked: ''
                },
                {
                    id: '',
                    engWord: '',
                    plWord: '',
                    randWords: [
                        randomWords(),
                        randomWords(),
                        randomWords(),
                    ],
                    isCorrect: false,
                    marked: ''
                },
                {
                    id: '',
                    engWord: '',
                    plWord: '',
                    randWords: [
                        randomWords(),
                        randomWords(),
                        randomWords(),
                    ],
                    isCorrect: false,
                    marked: ''
                },
                {
                    id: '',
                    engWord: '',
                    plWord: '',
                    randWords: [
                        randomWords(),
                        randomWords(),
                        randomWords(),
                    ],
                    isCorrect: false,
                    marked: ''
                },
                {
                    id: '',
                    engWord: '',
                    plWord: '',
                    randWords: [
                        randomWords(),
                        randomWords(),
                        randomWords(),
                    ],
                    isCorrect: false,
                    marked: ''
                },
                {
                    id: '',
                    engWord: '',
                    plWord: '',
                    randWords: [
                        randomWords(),
                        randomWords(),
                        randomWords(),
                    ],
                    isCorrect: false,
                    marked: ''
                },
                {
                    id: '',
                    engWord: '',
                    plWord: '',
                    randWords: [
                        randomWords(),
                        randomWords(),
                        randomWords(),
                    ],
                    isCorrect: false,
                    marked: ''
                },
                {
                    id: '',
                    engWord: '',
                    plWord: '',
                    randWords: [
                        randomWords(),
                        randomWords(),
                        randomWords(),
                    ],
                    isCorrect: false,
                    marked: ''
                },
                {
                    id: '',
                    engWord: '',
                    plWord: '',
                    randWords: [
                        randomWords(),
                        randomWords(),
                        randomWords(),
                    ],
                    isCorrect: false,
                    marked: ''
                },
                {
                    id: '',
                    engWord: '',
                    plWord: '',
                    randWords: [
                        randomWords(),
                        randomWords(),
                        randomWords(),
                    ],
                    isCorrect: false,
                    marked: ''
                },
                {
                    id: '',
                    engWord: '',
                    plWord: '',
                    randWords: [
                        randomWords(),
                        randomWords(),
                        randomWords(),
                    ],
                    isCorrect: false,
                    marked: ''
                },
                {
                    id: '',
                    engWord: '',
                    plWord: '',
                    randWords: [
                        randomWords(),
                        randomWords(),
                        randomWords(),
                    ],
                    isCorrect: false,
                    marked: ''
                }
            ]
        },
        pageID: 0,
        points: 0,
        isSubmitted: false,
        isFetching: false,
        isAllowed: true
    }



    componentDidMount() {

        if (this.props.match.params.id == this.props.testCount - 1) {

            this.requestNewTest()
        } else {

            this.downloadExamFromFirebase();
        }
    }


    componentDidUpdate(prevProps, prevState) {

        if (prevProps !== this.props && this.props.match.params.id != this.props.testCount - 1) {
            this.downloadExamFromFirebase()
        }

        if (prevProps !== this.props && this.props.match.params.id == this.props.testCount - 1) {
            this.requestNewTest()
        }

    }
    downloadExamFromFirebase = () => {

        this.setState({
            ...this.state,
            isFetching: true,
        })


        let tmpExam
        let examID = parseInt(this.props.match.params.id) + 1

        database.ref('Exams/users/user-' + this.props.userID + '/exam-' + examID).once('value').then((snapshot) => {
            tmpExam = snapshot.val()
        }).then(() => {

            tmpExam.pageID = 0

            tmpExam.exam.questions.map((question) => {
                return (
                    question.isCorrect = false,
                    question.isFalse = false,
                    question.marked = ""
                )
            })

            this.setState({
                ...tmpExam,
                isAllowed: false,
                isFetching: false
            })
        })
    }

    requestNewTest = () => {

        this.setState({
            ...this.state,
            isFetching: true,
            isAllowed: true,
            pageID: 0
        })

        fetch('http://localhost:8080/api/Exam/New', {

            method: "POST",
            headers: {
                'Authorization': "Bearer " + this.props.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                userID: this.props.userID,
                testID: this.props.match.params.id

            })
        }).then((response) => {


            return response.json();

        }).then((data) => {

            let tmp = this.state.exam
            tmp.questions.map((question, index) => {

                return (
                    question.id = data.exam.questions[index].id,
                    question.engWord = data.exam.questions[index].engWord,
                    question.plWord = data.exam.questions[index].plWord,
                    question.marked = "",
                    question.isCorrect = false

                )

            })

            this.setState({
                ...this.state,
                exam: tmp,
                isFetching: false

            })
        })
    }

    nextPage = () => {

        let tempState = this.state.pageID;

        if (tempState >= 0 && tempState < 11) {

            this.setState({
                ...this.state,
                pageID: tempState + 1,

            })
        }
    }

    prevPage = () => {

        let tempState = this.state.pageID;

        if (tempState > 0) {

            this.setState({
                ...this.state,
                pageID: tempState - 1,

            })
        }
    }

    sendResultHandler = () => {
        let toNextTests = ""
        let questions = this.state

        if (this.state.isAllowed) {

            this.state.exam.questions.map((question) => {
                if (!question.isCorrect) {
                    toNextTests += question.engWord + ","
                }
                return toNextTests
            })
            sendResult(toNextTests, this.props.token, this.props.userID, this.props.testCount, this.state.points, this.props.upadateTestsAmount, this.props.localStore)

            this.setState({
                ...this.state,
                isSubmitted: true
            })

            questions.isAllowed = false
            console.log("Submitted")

            saveExam(this.props.userID, questions, this.props.testCount)
            this.props.ifExamEnded()
        } else {
            alert("Nie mozna wyslac ponownie testu")
        }
    }

    chooseAnswerHandler = (id, event) => {

        let temp = this.state.exam.questions[id]
        let tempState = { ...this.state }
        if (temp.marked == null || temp.marked === "") {

            tempState.exam.questions[id].marked = event.target.innerHTML

            if (event.target.innerHTML === temp.engWord) {


                tempState.exam.questions[id].isCorrect = true
                tempState.points++


                this.setState({
                    ...tempState
                })

            } else {
                this.setState({
                    ...tempState
                })
            }

        }
    }

    goToPage = (event) => {
        const page = parseInt(event.target.id)
        this.setState({
            ...this.state,
            pageID: page
        })
    }

    render() {

        console.log(this.state.pageID)
        if (this.state.isSubmitted) {
            return (<Redirect to="/Board" />)
        }

        let body = []
        let test;

        this.state.exam.questions.map((word, index) => {
            return body.push(
                <Questions
                    key={word.id}
                    word={word.engWord}
                    question={word.plWord}
                    id={index}
                    next={this.nextPage}
                    prev={this.prevPage}
                    answer={(e) => this.chooseAnswerHandler(index, e)}
                    submit={this.sendResultHandler}
                    arr={word.randWords}
                    isCorrect={word.isCorrect}
                    isFalse={word.isFalse}
                    marked={word.marked}
                />
            )
        })

        let activeQuestion = body[this.state.pageID];

        if (this.state.isFetching) {
            test = (
                <div className='spinner-holder'>
                    <div className="loader"></div>
                </div>
            )
        } else {

            test = (
                <div>
                    < div className="Test-box" >
                        {activeQuestion}

                    </div >

                    <ButtonBar handler={this.goToPage} page={this.state.pageID} />
                </div>


            )
        }

        return (
            test
        )
    }

}

const mapStateToProps = state => {
    return {
        testCount: state.user.testCount,
        token: state.user.token,
        userID: state.user.id
    }
}
const mapDispatchToProps = dispatch => {
    return {
        upadateTestsAmount: () => dispatch({ type: ActionTypes.UPADTE_TESTS }),
        localStore: () => dispatch({ type: ActionTypes.SAVE_STORAGE }),
        ifExamEnded: () => dispatch({ type: ActionTypes.EXAM_OFF })
    }
}


const sendResult = (toNextTests, token, userId, testCount, points, upadateTestsAmount, localStore, state) => {

    fetch('http://localhost:8080/api/Exam/Submit', {

        method: "POST",
        headers: {
            'Authorization': "Bearer " + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({

            userId: userId,
            testCount: testCount,
            points: points,
            wrongAnswers: toNextTests
        })
    }).then(() => {

        upadateTestsAmount();
        localStore();

    })

}

const saveExam = (userID, questions, testAmount) => {
    firebase.database().ref('Exams/users/user-' + userID + '/exam-' + testAmount).set({
        ...questions,
    });

}

export default connect(mapStateToProps, mapDispatchToProps)(Exam)