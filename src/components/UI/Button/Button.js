import React from "react"
import './Button.css'

const button = props => {
    return (
        <div className="row">
            <div className="col-sm-4">
                <button className="btn btn-dark btn-md btn-block">{props.text}</button>
            </div>
        </div>
    )
}

export default button