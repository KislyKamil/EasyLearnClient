import React, { Component } from 'react'
import SpeechInterface from './SpeechInterface'


class SpeechContainer extends Component {

    state = {
        isRecording: false
    }


    recordAudioHandler = () => {

        this.setState({
            ...this.state,
            isRecording: true
        })
    }


    stopRedcordingHandler = () => {

        this.setState({
            ...this.state,
            isRecording: false
        })
    }
    render() {

        return (

            <SpeechInterface
                clickHandler={this.recordAudioHandler}
                isRecording={this.state.isRecording}
                stopRecordingHandler={this.stopRedcordingHandler}
            />
        )
    }
}

export default SpeechContainer