import React, { Component } from 'react'
import { setCORS } from "google-translate-api-browser";
// setting up cors-anywhere server address
import './TextTest.css'

const translate = setCORS("http://cors-anywhere.herokuapp.com/");

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
        translation: ''
    }


    textSample1 = "James himself suffered a brush with melancholy, but he made a full recovery and began to think positively, or at least equivocally, about being alive, answering yes to the question “Is Life Worth Living?” However, by force of his honesty of intellect he knew this opinion needed to be defended as much as any other opinion. No logic can support it. Indeed, logic defeats all feeling that life is worth living, which, James says, only a self-willed belief in a higher order of existence can instill. Then every suffering will seem worthwhile in the way that the vivisection of a living dog, to use James’s example, would seem worthwhile to the animal if only it could comprehend the goodly ends its pain serves for the higher order of human existence. In his lecture “Is Life Worth Living,” James opined that human beings, unlike dogs, can in fact imagine a higher order of existence than theirs, one that may legitimate the worst adversities of mortal life. James was a rare philosopher in that he put no faith in logic. And he was doubtless wise to adopt that stance, since the fortunes of those who attempt to defend their opinions with logic are not enviable.";

    textSmaple2 = "In the dark the old man could feel the morning coming and as he rowed he heard the tremblingsound as flying fish left the water and the hissing that their stiff set wings made as they soared away in the darkness. He was very fond of flying fish as they were his principal friends on the ocean. He was sorry for the birds, especially the small delicate dark terns that were always flying and looking and almost never finding, and he thought, the birds have a harder life than we do except for the robber birds and the heavy strong ones. Why did they make birds so delicate and fine as those sea swallows when the ocean can be so cruel? She is kind and very beautiful. But she can be so cruel and it comes so suddenly and such birds that fly, dipping and hunting, with their small sad voices are made too delicately for the sea.";

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

        this.setState({
            ...this.state,
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

        // this.contentBody = this.convertStringToArr(this.state.divText[this.divId])

        // this.content = []

        // this.contentBody.forEach((element, id) => {
        //     this.content.push(
        //         <span key={Date.now() + id}>{element}{" "}</span>
        //     )
        // })

        // this.divBody[this.state.divText[this.divId]].push(this.content)
    }

    componentDidMount = () => {
        document.getElementsByClassName("sideMenu")[0].style.display = "none"
        document.getElementsByClassName("input-text")[0].focus()
    }

    translateSpanHandler = (event) => {
        let tmp = { ...this.state }
        tmp.helpCounter++
        let word
        

        translate(event.target.innerHTML, { from: "en", to: "pl" })
            .then(res => {

                return res.text
                
            }).then(data =>{
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

    render() {

        if (this.state.needBuild) {

            this.setState({
                ...this.state,
                needBuild: false
            })
        }
        this.convertToSpan(this.splitedArr)
        this.createTableBody(this.body)


        console.log(this.state)
        return (
            <div>
                <div className="main-text" onMouseOut={this.hideHelp}>
                    <input type="text" className="input-text" onKeyUp={this.assignTextToDiv} onChange={this.inputHandler} value={this.state.inputValue} />
                    <div className="translate-box" style={{ top: this.state.top, left: this.state.left }}><p id="answ"></p></div>
                    <table>
                        <tbody>
                            {this.tableBody}
                        </tbody>
                    </table>
                </div>
                {/* <div className="answer-text">

                </div> */}
            </div>
        )
    }
}

export default TextTest


// In the dark the old man could feel the morning coming and as he rowed he heard the trembling
// sound as flying fish left the water and the hissing that their stiff set wings made as they soared away
// in the darkness. He was very fond of flying fish as they were his principal friends on the ocean. He
// was sorry for the birds, especially the small delicate dark terns that were always flying and looking
// and almost never finding, and he thought, the birds have a harder life than we do except for the
// robber birds and the heavy strong ones. Why did they make birds so delicate and fine as those sea
// swallows when the ocean can be so cruel? She is kind and very beautiful. But she can be so cruel and
// it comes so suddenly and such birds that fly, dipping and hunting, with their small sad voices are
// made too delicately for the sea.

