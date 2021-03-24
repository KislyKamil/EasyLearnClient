import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as ActionTypes from './../../store/actions'
import { setCORS } from "google-translate-api-browser";
import './TextTest.css'
import database from '../../config'

const translate = setCORS("http://cors-anywhere.herokuapp.com/");


let time = 0
let timeInterval = 6000;
let timeoutHandler = null
let intervalUpdate = true
let wordsPerMinHandler = null

class TextTest extends Component {

    state = {
        inputValue: '',
        needBuild: true,
        divId: '',
        divText: [
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            ' '
        ],
        top: '',
        left: '',
        helpCounter: 0,
        translation: '',
        reRender: false,
        isUnmount: false
    }


    textSample1 = "James himself suffered a brush with melancholy, but he made a full recovery and began to think positively, or at least equivocally, about being alive, answering yes to the question “Is Life Worth Living?” However, by force of his honesty of intellect he knew this opinion needed to be defended as much as any other opinion. No logic can support it. Indeed, logic defeats all feeling that life is worth living, which, James says, only a self-willed belief in a higher order of existence can instill. Then every suffering will seem worthwhile in the way that the vivisection of a living dog, to use James’s example, would seem worthwhile to the animal if only it could comprehend the goodly ends its pain serves for the higher order of human existence. In his lecture “Is Life Worth Living,” James opined that human beings, unlike dogs, can in fact imagine a higher order of existence than theirs, one that may legitimate the worst adversities of mortal life. ";

    convertStringToArr = (text) => {
        return text.split(' ')
    }

    splitedArr = this.convertStringToArr(this.textSample1)


    body = [8]
    tableBody = []
    content = []
    contentBody = []
    divBody = [8]

    convertToSpan = (arr) => {
        let tmp = []
        let pointer = 0
        this.body = []
        return arr.forEach((element, index) => {

            if (index % 23 === 0 && index > 0) {

                this.body[pointer] = tmp
                tmp = []
                pointer++
            }
            tmp.push(
                <span key={index} onClick={this.translateSpanHandler} onMouseOver={this.clearHelp}>{element}{" "}</span>
            )

            if (index === arr.length - 1) {
                this.body[pointer] = tmp
                tmp = []
                pointer++
            }
        });
    }

    clearHelp = () => {
        document.getElementById("answ").innerHTML = ''
    }

    createTableBody = (source) => {

        this.tableBody = []
        source.forEach((element, id) => {
            this.tableBody.push(
                <tr key={id}>
                    <td>{element}</td>
                </tr>
            )

            this.tableBody.push(
                <tr key={id + 11}>
                    <td><div id={id} className="writing-box" onClick={this.setFocus} onMouseOver={this.hideHelp}>{this.state.divText[id]}</div></td>
                </tr>
            )
        })
    }

    setFocus = (event) => {
        document.getElementsByClassName("input-text")[0].focus()

        this.setState({
            ...this.state,
            divId: event.target.id
        })
    }

    inputHandler = (event) => {

        if (!wordsPerMinHandler) {
            wordsPerMinHandler = setInterval(() => {
                time += 0.1
            }, 100)
        }



        this.setState({
            ...this.state,
            needBuild: false,
            inputValue: event.target.value
        })
    }

    assignTextToDiv = () => {

        let tmp = [...this.state.divText]
        tmp[this.state.divId] += this.state.inputValue


        this.setState({
            ...this.state,
            divText: tmp,
            inputValue: ''
        })
    }

    componentDidMount = () => {
        document.getElementsByClassName("sideMenu")[0].style.display = "none"
        document.getElementsByClassName("input-text")[0].focus()

        console.log("MOUNT")
        time = 0
        timeInterval = 6000;
        timeoutHandler = null
        intervalUpdate = true
        wordsPerMinHandler = null
    }

    componentWillUnmount() {
        console.log("UN-MOUNT")
        time = 0
        timeInterval = 6000;
        timeoutHandler = null
        intervalUpdate = true
        wordsPerMinHandler = null

    }

    translateSpanHandler = (event) => {
        let tmp = { ...this.state }
        tmp.helpCounter++


        translate(event.target.innerHTML, { from: "en", to: "pl" })
            .then(res => {

                return res.text

            }).then(data => {
                document.getElementsByClassName("translate-box")[0].style.display = "block"
                document.getElementById("answ").innerHTML = data
            })
            .catch(err => {
                console.error(err);
            });

        this.setState({
            ...this.state,
            top: event.clientY - 75,
            left: event.clientX - 260,
            helpCounter: tmp.helpCounter,
        })

    };

    hideHelp = () => {
        document.getElementsByClassName("translate-box")[0].style.display = "none"
    }


    startInterval = () => {

        if (!timeoutHandler) {
            timeoutHandler = setTimeout(() => {
                this.submitResults()
            }, timeInterval)
        }
    }

    submitResults = () => {
        clearInterval(wordsPerMinHandler)
        if (intervalUpdate) {

            fetch('http://localhost:8080/api/Text/Results', {

                method: "POST",
                headers: {
                    'Authorization': "Bearer " + this.props.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    id: this.props.userId,
                })
            }).then(() => {

            })



        }
        intervalUpdate = false

        this.setState(({
            ...this.state,
            reRender: true
        }))

        let obj, updates = {};
        
        database.ref('/Stats/' + this.props.userId).once('value').then((snapshot) => {
            obj = snapshot.val()
        }).then(() => {

            if (obj == null) {
                database.ref('Stats/' + this.props.userId).set({
                    interval: [(time / 60).toFixed(2)]
                });

                return;
            }

            obj.interval.push((time / 60).toFixed(2))
            updates['/Stats/' + this.props.userId] = obj;

            return database.ref().update(updates);
        })
    }

    resetTimer = () => {

        if (timeoutHandler) {
            clearTimeout(timeoutHandler)
            timeoutHandler = null
        }
    }

    render() {
        console.log(time)
        this.result = (
            <div className="answer-text">
                <div className="rating">
                    <p>{"Ilość użytych podpowiedzi: " + this.state.helpCounter}</p>
                </div>
                <div className="rate-box">
                    <p>{"Wynik Czasowy: " + (time / 60).toFixed(2)}</p>
                    <p>{time / 60 <= 4.06 ? "Pewność pisowni w języku angielskim jest bardzo dobra" : "Pewność pisowni w języku angielskim poniżej 50 słów na minute"}</p>
                </div>
            </div>
        )

        this.convertToSpan(this.splitedArr)
        this.createTableBody(this.body)

        return (
            <div>
                <div className="main-text" onMouseOut={this.hideHelp}>
                    <input type="text" className="input-text" onKeyUp={() => {
                        this.assignTextToDiv()
                        this.startInterval()
                    }}
                        onKeyDown={this.resetTimer}
                        onChange={this.inputHandler}
                        value={this.state.inputValue} />
                    <div className="translate-box" style={{ top: this.state.top, left: this.state.left }}><p id="answ"></p></div>
                    <table>
                        <tbody>
                            {this.tableBody}
                        </tbody>
                    </table>
                </div>
                { !intervalUpdate ? this.result : ""}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.user.id,
        token: state.user.token,
    }
}

export default connect(mapStateToProps)(TextTest)

