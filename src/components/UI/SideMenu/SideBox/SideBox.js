import React from 'react'
import './SideBox.css'



const sideBox = (props) => {

    return (
        <div className={props.name} onClick={props.openMenu}>
            <i style={{ fontSize: "24px", color: "white", margin: "9px" }} className='fas'>&#xf03a;</i>

        </div>
    )
}

export default sideBox