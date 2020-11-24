import * as React from 'react';

import './Card.css'


const Card = (props) => {


    return (
        <div className="card" onClick={props.clickHandler} >
            {props.children}
        </div >
    )
}

export default Card;