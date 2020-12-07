import React, { useEffect } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom';
import './TextMenu.css'


const TextTestLink = (props) => {

    let history = useHistory()

    useEffect(() => {
        document.getElementsByClassName("sideMenu")[0].style.display = "none"
    })

    const redirectHandler = () => {
        history.push("/TextTest/" + props.id)
    }

    return (
        <div className="text-link" onClick={redirectHandler}>
            <p> Tekst {props.id} </p>
        </div >
    )
}

export default TextTestLink