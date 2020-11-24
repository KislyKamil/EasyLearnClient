import React, { useState, useEffect, useRef } from 'react'
import './TestStyle.css'
import { useStore, connect } from 'react-redux'

const TestPart = (props) => {

    let part = (
        <div style={{backgroundColor: "wheat"}}>
            <p>{props.words.pronun}</p>
        </div>
    )
    const box = useRef(null);

    const waitTillNext = () => {
        return setTimeout(() => {

            document.getElementById('goNext').style.display = "block"
        }, 1600)
    }

    useEffect(() => {
        box.current = document.getElementsByClassName("qs-main")[0]

    });

    if (props.word === props.words.word.toLowerCase()) {


        box.current.style.backgroundColor = "#73e873"

        waitTillNext()

    }

    return (
        <div className="test-main">
            <div className="qs-main"><p>{props.words.word.toLowerCase()}</p>{part}</div> 
            <div id='goNext' style={{ display: "none", backgroundColor: "white" }}>
                <i style={{ fontSize: "55px" }} className='fas fa-arrow-alt-circle-right' onClick={props.nextQuestion}></i>
            </div >
        </div >
    )

}

const mapStateToProps = state => {

    return {
        word: state.word,
    }
}

export default connect(mapStateToProps)(TestPart)