import React, { useState } from "react"
import './SideMenu.css'
import SideBox from './SideBox/SideBox'

import { NavLink } from 'react-router-dom';



const SideMenu = (props) => {

    let style, examList, sideBox, currentExams

    const [id, setValue] = useState(props.testAmount);

    function update(newId) {
        setValue(id => newId);
    }


    const init = () => {
        console.log(examList.length)
        if (examList.length <= 14) {

            currentExams = examList

        } else {
            currentExams = examList.slice(id - 14, id)
        }
    }
    const pushExams = (styleName) => {

        for (let i = 0; i < props.testAmount; i++) {

            examList.push(
                <div key={Date.now() + Math.random() * 2}>
                    <NavLink key={Date.now() + Math.random() * 2} to={"/Exam/" + i} className={styleName} onClick={props.turnExamOn}>
                        <p className={styleName}>{"Słownictwo-" + (i + 1)}</p>
                    </NavLink>
                </div >
            )
        }
    }



    sideBox = (
        <SideBox name="sideBox" openMenu={props.openMenuHandler} />
    )

    if (props.isEnabled) {
        style = "sidenav sidenav-active"
        examList = [];

        document.getElementsByClassName("closebtn")[0].style.display = "inherit"
        document.getElementsByClassName("navi-btn")[0].style.display = "block"
        document.getElementsByClassName("navi-btn")[1].style.display = "block"


        pushExams("test")

    } else if (!props.isEnabled && props.isExamOn) {

        document.getElementsByClassName("closebtn")[0].style.display = "none"

        document.getElementsByClassName("navi-btn")[0].style.display = "none"
        document.getElementsByClassName("navi-btn")[1].style.display = "none"

        sideBox = (
            <SideBox name="sideBox-active" openMenu={props.openMenuHandler} />
        )

        examList = [];

    } else {
        style = "sidenav"

        examList = [];
        pushExams("test test-close")

    }

    const lazyLoadingHandler = (type) => {

        let tmp = id - 14;

        if (examList.length > 14) {

            switch (type) {

                case "up":
                    if (id <= 14) {
                        break;
                    }
                    if (id - 14 < 14) {
                        update(id - tmp)
                        break;
                    }

                    update(id - 14)
                    break;

                case "down":
                    if (id == examList.length) {
                        break;
                    }
                    if (id + 14 > examList.length - 1) {
                        update(examList.length)
                        break;
                    }
                    update(id + 14)
                    break;

                default:
                    break;

            }
        }
    }

    init()

    return (
        <div className="sideMenu">
            {sideBox}
            <div id="mySidenav" className={style}>
                <div className="closebtn" onClick={props.disableSideView}>&times;</div>
                <div className="navi-btn"><i className='fas fa-arrow-up' onClick={() => lazyLoadingHandler("up")}></i></div>
                {currentExams}
                <div className="navi-btn dw"><i className='fas fa-arrow-down' onClick={() => lazyLoadingHandler("down")}></i></div>
            </div>
        </div>

    )
}

export default SideMenu