import React, { Component } from 'react'
import './SpeechMenu.css'
import TestPart from '../../TestPart/TestPart'
import Spinner from './../Spinner/SpinnerNd'
import { connect } from 'react-redux'


const randomWords = require('random-words');


let testBody = []
let btn = <Spinner />

class SpeechMenu extends Component {

    state = {
        isTestOn: false,
        questions: [
            {
                word: '',
                phonetics: {
                    text: '',
                    audio: ''
                },
                definition: '',
                example: ''
            },
            {
                word: '',
                phonetics: {
                    text: '',
                    audio: ''
                },
                definition: '',
                example: ''
            },
            {
                word: '',
                phonetics: {
                    text: '',
                    audio: ''
                },
                definition: '',
                example: ''
            }
        ],
        currentPage: 0,
        points: 0
    }

    words;
    tmpArr = []

    componentDidMount = () => {

        this.words = randomWords(3)

        this.words.forEach(element => {
            this.fetchWords(element)
        });


        this.setState(({
            ...this.state,
            questions: this.tmpArr
        }))


        btn = <div className="test-intro-box" onClick={this.startTest}><p>Generate test</p></div>


    }


    startTest = () => {

        this.setState({
            ...this.state,
            isTestOn: true
        })

        this.generateTest(this.state.questions)
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

    fetchWords = (word) => {
        fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word, {

            method: "GET",
            // mode: "no-cors",
        }).then((response) => {

            return response.json()

        }).then((response) => {


            if (response[0].phonetics[0] == null || response[0].meanings[0] == null) {

                console.log("Re-finding")
                return this.fetchWords(randomWords())

            }
            this.tmpArr.push(this.fillState(response[0]))

        }).then(() => {

        }).catch((error) => {

            console.error('Error:' + error)
        })

    }

    generateTest = (questions) => {

        for (let i = 0; i < questions.length; i++) {

            if (i === 2) {

                testBody.push(
                    <p className="send" onClick={this.submitResults}>Zakończ</p>
                )
                continue
            }


            testBody.push(
                <TestPart
                    key={i}
                    word={questions[i].word}
                    phonetics={questions[i].phonetics}
                    definition={questions[i].definition}
                    example={questions[i].example}
                    nextQuestion={this.nextQuestionHandler}
                />
            )

        }
    }


    fillState = (rawData) => {

        let tmpDef = rawData.meanings[0].definitions[0].definition

        return {
            word: rawData.word,
            phonetics: {
                text: rawData.phonetics[0].text,
                audio: rawData.phonetics[0].audio
            },
            definition: tmpDef,
            example: rawData.meanings[0].definitions[0].example
        }

    }

    render() {

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