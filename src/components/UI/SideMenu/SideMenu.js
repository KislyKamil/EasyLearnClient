import React from "react"
import './SideMenu.css'
import SideBox from './SideBox/SideBox'

import { NavLink } from 'react-router-dom';



const sideMenu = (props) => {

    let style, ExamList, sideBox


    sideBox = (
        <SideBox name="sideBox" openMenu={props.openMenuHandler} />
    )

    if (props.isEnabled) {
        style = "sidenav sidenav-active"
        ExamList = [];

        document.getElementsByClassName("closebtn")[0].style.display = "inherit"


        for (let i = 0; i < props.testAmount; i++) {

            ExamList.push(
                <div key={Date.now() + Math.random()}>
                    <NavLink key={Date.now() + Math.random() + 1} to={"/Exam/" + i} className="test" onClick={props.turnExamOn}>
                        <p className="test">{"Słownictwo-" + (i + 1)}</p>
                    </NavLink>
                </div >
            )
        }

    } else if (!props.isEnabled && props.isExamOn) {

        document.getElementsByClassName("closebtn")[0].style.display = "none"

        sideBox = (
            <SideBox name="sideBox-active" openMenu={props.openMenuHandler} />
        )

        ExamList = [];

    } else {
        style = "sidenav"

        ExamList = [];

        for (let i = 0; i < props.testAmount; i++) {

            ExamList.push(
                <div key={Date.now() + Math.random() * 2}>
                    <NavLink key={Date.now() + Math.random() * 2} to={"/Exam/" + i} className="test test-close" onClick={props.turnExamOn}>
                        <p className="test test-close">{"Słownictwo-" + (i + 1)}</p>
                    </NavLink>
                </div >
            )
        }

    }



    return (
        <div className="sideMenu">
            {sideBox}
            <div id="mySidenav" className={style}>
                <div className="closebtn" onClick={props.disableSideView}>&times;</div>
                {ExamList}
            </div>
        </div>

    )
}

export default sideMenu