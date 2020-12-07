import React from 'react'
import { NavLink } from 'react-router-dom';


const TextTestLink = (props) => {
    return (
        <div>
            <NavLink to={"/TextTest/" + props.id}>
                <p>{"TEST"}</p>
            </NavLink>
        </div >
    )
}

export default TextTestLink