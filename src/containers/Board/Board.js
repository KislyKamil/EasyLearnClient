import React, { Component } from 'react';
import Card from '../../components/UI/Card/Card'
import * as ActionTypes from '../../store/actions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';

import './Board.css'

import cardImg from '../../components/UI/assets/images/test.jpg'
import cardImg2 from '../../components/UI/assets/images/test1.jpg'
import cardImg3 from '../../components/UI/assets/images/write.jpg'

class Board extends Component {

    state = {
        shouldRedirectToSpeech: false,
        shouldRedirectToText: false
    }

    redirectToTest = (param) => {

        if (param === "exam") {
            return this.props.enableTest()
        }
        if (param === "speechTest") {
            this.setState({
                ...this.state,
                shouldRedirectToSpeech: true
            })
        }
        if (param === "textTest") {
            this.setState({
                ...this.state,
                shouldRedirectToText: true
            })

        }
    }


    render() {


        this.props.examOff();

        if (this.props.isEnabled && !this.props.isExamOn) {
            document.getElementsByClassName("sideMenu")[0].style.display = "block"
            return (
                <div className="temp">
                    <p>Wybierz test z menu po lewej stronie</p>
                </div>
            );

        } else if (this.state.shouldRedirectToSpeech) {

            return <Redirect to="/SpeechTest" />

        } else if (this.state.shouldRedirectToText) {

            return <Redirect to="/TextTest" />

        } else {

            return (

                <div className='board'>
                    <Card clickHandler={() => this.redirectToTest("exam")}>
                        <img src={cardImg} alt="test" width="100%" height="" />
                        <p>Rozwijązuj krótkie testy oparte na twojej akutalnej wiedzy, każdy nastepny test bedzie generowany na podstawie twoich poprzednich odpowiedzi</p>
                        <div className='overlay'>
                            <p>Kliknij aby rozpoczac</p>
                        </div>
                    </Card>
                    <Card clickHandler={() => this.redirectToTest("speechTest")}>
                        <img src={cardImg2} alt="test" width="100%" height="" />
                        <p>Nauka wymowy</p>
                        <div className='overlay'>
                            <p>Kliknij aby rozpoczac</p>
                        </div>
                    </Card>
                    <Card clickHandler={() => this.redirectToTest("textTest")}>
                        <img src={cardImg3} alt="test" width="100%" height="" />
                        <p>Praca z tekstem</p>
                        <div className='overlay'>
                            <p>Kliknij aby rozpoczac</p>
                        </div>
                    </Card>
                </div>

            )
        }
    }
}

const mapStateToProps = state => {
    return {
        isEnabled: state.isEnabled,
        isExamOn: state.isExamOn
    }
}
const mapDispatchToProps = dispatch => {
    return {
        enableTest: () => dispatch({ type: ActionTypes.ENABLE_TEST }),
        examOff: () => dispatch({ type: ActionTypes.EXAM_OFF })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)