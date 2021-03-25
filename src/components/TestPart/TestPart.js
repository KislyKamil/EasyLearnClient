import React, { useState } from 'react'
import './TestStyle.css'
import { connect } from 'react-redux'

const TestPart = (props) => {

    let body
    const [isCorrect, setValue] = useState(false);

    async function playAudio() {
        let audio = new Audio(props.phonetics.audio);
        audio.type = 'audio/wav';
        // {props.phonetics.audio}
        try {
            await audio.play();
            console.log('Playing...');
        } catch (err) {
            console.log('Failed to play...' + err);
        }
    }

    let part = (
        <div>
            <div className="word-box">Słowo:
            <p className="wd">{props.word.toLowerCase()}</p>
            </div>

            <div className="word-box">{"Fonetyka słowa:"}
                <p className="wd">{props.phonetics.text}</p>
                <p>{"Transkrypcja audio: "}</p>
                <i className="material-icons" style={{ fontSize: "55px", cursor: "pointer" }} onClick={playAudio}> play_circle_filled</i>


            </div>

            <div className="word-box-nd">{"Defnicja z jezyka angielskiego:"}<p>{props.definition}</p></div>
            <div className="word-box-nd">{"Przykładowe użycie:"}<p>{props.example}</p></div>
        </div>
    )

    const updateView = () => {

        setValue(true);
    }
    let tran = document.getElementById("ts")

    if (tran != null) {
        console.log(tran.innerHTML)
        if (tran.innerHTML === props.word.toLowerCase()) {

            updateView()
            tran.innerHTML = ''

        }
    }

    if (isCorrect) {
        body = (
            <div className="test-main" >
                <div className="qs-main">{part}</div>
                <div id='goNext'>
                    <p>{"Przejdź do kolejenego pytania"}</p>
                    <i style={{ fontSize: "85px", color: "green" }} className='fas fa-arrow-alt-circle-right' onClick={props.nextQuestion}></i>
                </div >
            </div >
        )
    } else {
        body = (
            <div className="test-main" >
                <div className="qs-main">{part}</div>
            </div >
        )
    }

    return (
        body
    )

}


const mapStateToProps = state => {

    return {
        transcript: state.word,
    }
}

export default connect(mapStateToProps)(TestPart)