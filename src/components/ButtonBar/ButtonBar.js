import React from 'react'
import './ButtonBar.css'




const ButtonBar = (props) => {

    return (

        <div className="containerPag">
            <ul className="pagination">
                <li><span id="0" onClick={props.handler}> 1</span></li>
                <li><span id="1" onClick={props.handler}> 2</span></li>
                <li><span id="2" onClick={props.handler}> 3</span></li>
                <li><span id="3" onClick={props.handler}> 4</span></li>
                <li><span id="4" onClick={props.handler}> 5</span></li>
                <li><span id="5" onClick={props.handler}> 6</span></li>
                <li><span id="6" onClick={props.handler}> 7</span></li>
                <li><span id="7" onClick={props.handler}> 8</span></li>
                <li><span id="8" onClick={props.handler}> 9</span></li>
                <li><span id="9" onClick={props.handler}> 10</span></li>
                <li><span id="10" onClick={props.handler}> 11</span></li>
                <li><span id="11" onClick={props.handler}> 12</span></li>
            </ul>
        </div>

    )
}

export default ButtonBar