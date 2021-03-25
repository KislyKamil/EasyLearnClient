import React from 'react'
import './ButtonBar.css'




const ButtonBar = (props) => {

    return (

        <div className="ButtonBar">
            <ul>
                <li><span id="0" onClick={props.handler}> pytanie nr 1</span></li>
                <li><span id="1" onClick={props.handler}> pytanie nr 2</span></li>
                <li><span id="2" onClick={props.handler}> pytanie nr 3</span></li>
                <li><span id="3" onClick={props.handler}> pytanie nr 4</span></li>
                <li><span id="4" onClick={props.handler}> pytanie nr 5</span></li>
                <li><span id="5" onClick={props.handler}> pytanie nr 6</span></li>
                <li><span id="6" onClick={props.handler}> pytanie nr 7</span></li>
                <li><span id="7" onClick={props.handler}> pytanie nr 8</span></li>
                <li><span id="8" onClick={props.handler}> pytanie nr 9</span></li>
                <li><span id="9" onClick={props.handler}> pytanie nr 10</span></li>
                <li><span id="10" onClick={props.handler}> pytanie nr 11</span></li>
                <li><span id="11" onClick={props.handler}> pytanie nr 12</span></li>
            </ul>
        </div>

    )
}

export default ButtonBar