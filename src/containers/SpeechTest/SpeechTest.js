import React, { useState, useEffect } from 'react'
import SpeechContainer from './SpeechRecording/SpeechContainer'
import SpeechMenu from '../../components/UI/TestMenu/SpeechMenu'

import './SpeechTest.css'


const SpeechTest = () => {

    useEffect(() => {
        document.getElementsByClassName("sideMenu")[0].style.display = "none"
    })

    return (
        <div className="main-speech-body">

            <SpeechMenu />
            <SpeechContainer />

        </div>
    )
}

export default SpeechTest