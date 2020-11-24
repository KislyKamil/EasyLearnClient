import React from 'react'
import SpeechContainer from './SpeechRecording/SpeechContainer'
import SpeechMenu from '../../components/UI/TestMenu/SpeechMenu'

import './SpeechTest.css'


const SpeechTest = () => {
    document.getElementsByClassName("sideMenu")[0].style.display = "none"
    return (

        <div className="main-speech-body">
            <SpeechContainer />

            <SpeechMenu />

        </div>
    )
}

export default SpeechTest