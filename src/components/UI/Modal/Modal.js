import React, { useState } from 'react'


import './Modal.css'


function Modal(props) {

    const [name, setName] = useState("modal-cus modal-active");

    const closeHandler = () => {
        setName(
            "modal-cus"
        )
    }

    return (
        <div id="myModal" className={name}>
            <div className="modal-content-cus">
                <div className="modal-header">
                    <h2>Zalogowano</h2>
                    <span className="close" onClick={() => {
                        props.handleModal()
                        closeHandler()
                    }}>&times;</span>
                </div>
                <div className="modal-body-cus">
                    <p>Wroc aby dzialac dalej</p>
                </div>
            </div>

        </div >
    )
}

export default Modal;