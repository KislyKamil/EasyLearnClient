import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { useDispatch, connect } from 'react-redux'

import * as ActionTypes from '../../../store/actions'

import icon from './../../../components/UI/assets/images/record.svg'



const SpeechInterface = (props) => {

    const { transcript, resetTranscript } = useSpeechRecognition()
    const dispatch = useDispatch()




    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }

    let stopBtn = (
        <button className="stop-rc" onClick={(e) => {
            SpeechRecognition.stopListening()
            props.stopRecordingHandler()
            onChangeHandler(e)
        }}>
            Zatrzymaj
        </button>
    )

    const onChangeHandler = (e) => {

        let text = document.getElementById("ts").innerText
        
        dispatch({ type: ActionTypes.SAVE_WORD, word: text })
       
    }


    return (
        
        <div className='sp-test-box'>
            <div className="audio-box">
                <p>Nacisnij i mów</p>

                <div className={props.isRecording ? "sp-box-active" : "sp-box"} onClick={() => {
                    props.clickHandler()
                    SpeechRecognition.startListening({ continuous: true, language: "en-US" })
                    resetTranscript()
                }}>
                    <img src={icon} alt="audio-icon" className="sp-audio" width="80%" height="80%" />
                </div>
                {props.isRecording ? stopBtn : null}

            </div>
            <div className="transcript" ><p id="ts" >{transcript.toLowerCase()}</p></div>

        </div >

    )
}

export default connect(null)(SpeechInterface)