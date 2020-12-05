import React from 'react'
import Question from './Question/Question'

import './Questions.css'




const questions = (props) => {

    const wordArr = [props.word]
    const wordsPool = wordArr.concat(props.arr)
    let styleName;



    let body = [

        wordsPool.sort().map((word) => {

            if (props.isCorrect && word === props.word) {
                styleName = "answer-field-correct"
            } else if (!props.isCorrect && props.marked === word) {
                styleName = "answer-field-wrong"
            } else {
                styleName = "answer-field"
            }

            return (
                <Question
                    key={Date.now() + Math.random() * 2}
                    word={word}
                    choose={props.answer}
                    id={word}
                    isCorrect={props.isCorrect}
                    styleName={styleName}
                />
            )
        })

    ]

    return (

        <div className="test">
            <div className="question"><p>{props.question}</p></div>
            <div className="wrapper">
                {body}
            </div>
            <div className="test-navigation" translate="no">
                <div className="counter">{props.id + 1}/12</div>
                <p className="arrow left" onClick={props.prev}></p>
                {props.id + 1 === 12 ? <p className="send-results" onClick={props.submit}>Zakończ</p> : <p className="arrow right" onClick={props.next}></p>}
            </div>
        </div >
    )
}

export default questions