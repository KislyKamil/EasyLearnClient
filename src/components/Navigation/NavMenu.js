import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from './NavItem';
import { NavLink } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'

import { connect } from 'react-redux'
import * as ActionTypes from './../../store/actions'


import './NavMenu.css'

const NavMenu = (props) => {

  const dispatch = useDispatch()
  let item, style;

  //remember to change it after test
  if (useSelector(state => state.isAuthenticated)) {
    item = (

      < Nav >
        <NavItem link="/Board" text="Nauka" />
        <NavItem link={"/User/" + props.userID } text="Konto" />
        <NavItem link="/" text="Wyloguj" logout={() => dispatch({ type: ActionTypes.LOGOUT })} />
      </Nav >
    )
  }

  props.isEnabled ? style = { marginLeft: "250px", transition: "margin-left 0.7s" } : style = { marginLeft: "0px", transition: "margin-left 0.7s" }
  return (

    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={style}>
      <NavLink to='/' exact>
        <p className="homeLink">Easy-Learn</p>
      </NavLink>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {item}
        <Nav>
          <NavItem link="/Login" text="Zaloguj" />
        </Nav>
      </Navbar.Collapse>
    </Navbar>

  );
}

const mapStateToProps = state => {

  return {
    isAuth: state.isAuthenticated,
    userID: state.user.id
  }
}

export default connect(mapStateToProps)(NavMenu);