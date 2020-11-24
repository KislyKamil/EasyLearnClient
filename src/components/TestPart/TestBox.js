import React from 'react'
import './TestStyle.css'
import { useStore, connect } from 'react-redux'


let correct = 0
const TestBox = (props) => {

    let randWords = props.randoms

    const waitTillNext = () => {
        return setTimeout(() => {

            document.getElementById('goNext').style.display = "block"
            correct = 0
        }, 1600)
    }




    if (randWords.includes(props.word)) {

        document.querySelector("input[value=" + props.word + "]").checked = true

        correct++;
    }

    if (correct === 3) {
        waitTillNext()

    }

    return (
        <div className="ch-test-box">
            <div>
                <input type="checkbox" value={randWords[0]} /> {randWords[0]}
            </div>
            <div>
                <input type="checkbox" value={randWords[1]} /> {randWords[1]}
            </div>
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

export default connect(mapStateToProps)(TestBox)