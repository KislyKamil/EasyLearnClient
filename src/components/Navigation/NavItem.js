import React from 'react'
import NavItem from 'react-bootstrap/NavItem';
import { NavLink } from 'react-router-dom';

const navitem = props => {

    return (
        <NavItem>
            <NavLink to={props.link} exact className="text-light" onClick={props.logout}>
                {props.text}
            </NavLink>
        </NavItem>
    )


}


export default navitem;