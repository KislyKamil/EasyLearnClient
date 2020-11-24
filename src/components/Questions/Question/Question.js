import React from 'react'


const question = (props) => {


    return (

        <div id={props.id + "ID"} className={props.styleName} onClick={props.choose}>{props.word}</div>
    )
}

export default question