import React from "react"

const submitButton = props => {
    return (
        <div className="row">
            <div className="col-md-4">
                <input type="submit" className="btn btn-dark btn-md btn-block" value={props.text} />
            </div>
        </div>
    )
}

export default submitButton