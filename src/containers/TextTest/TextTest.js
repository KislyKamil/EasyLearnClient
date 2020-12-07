import React, { Component } from 'react'

import './TextTest.css'




class TextTest extends Component {



    componentDidMount = () => {
        document.getElementsByClassName("sideMenu")[0].style.display = "none"
    }

    textSample1 = "James himself suffered a brush with melancholy, but he made a full recovery and began to think positively, or at least equivocally, about being alive, answering yes to the question “Is Life Worth Living?” However, by force of his honesty of intellect he knew this opinion needed to be defended as much as any other opinion. No logic can support it. Indeed, logic defeats all feeling that life is worth living, which, James says, only a self-willed belief in a higher order of existence can instill. Then every suffering will seem worthwhile in the way that the vivisection of a living dog, to use James’s example, would seem worthwhile to the animal if only it could comprehend the goodly ends its pain serves for the higher order of human existence. In his lecture “Is Life Worth Living,” James opined that human beings, unlike dogs, can in fact imagine a higher order of existence than theirs, one that may legitimate the worst adversities of mortal life. James was a rare philosopher in that he put no faith in logic. And he was doubtless wise to adopt that stance, since the fortunes of those who attempt to defend their opinions with logic are not enviable.";

    textSmaple2 = "In the dark the old man could feel the morning coming and as he rowed he heard the tremblingsound as flying fish left the water and the hissing that their stiff set wings made as they soared away in the darkness. He was very fond of flying fish as they were his principal friends on the ocean. He was sorry for the birds, especially the small delicate dark terns that were always flying and looking and almost never finding, and he thought, the birds have a harder life than we do except for the robber birds and the heavy strong ones. Why did they make birds so delicate and fine as those sea swallows when the ocean can be so cruel? She is kind and very beautiful. But she can be so cruel and it comes so suddenly and such birds that fly, dipping and hunting, with their small sad voices are made too delicately for the sea.";

    convertStringToArr = (text) => {
        return text.split(' ')
    }

    splitedArr = this.convertStringToArr(this.textSample1)
    body = []

    convertToSpan = (arr) => {
        return arr.forEach((element, index) => {

            if (index % 25 === 0 && index > 0) {
                this.body.push(
                    <input />
                )
            }
            this.body.push(
                <span>{element}{" "}</span>
            )
        });
    }

    render() {

        this.convertToSpan(this.splitedArr)
        return (
            <div>
                <div className="main-text">
                    {this.body}
                </div>
                <div className="answer-text">

                </div>
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