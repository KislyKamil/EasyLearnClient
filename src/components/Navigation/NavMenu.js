import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from './NavItem';
import { NavLink } from 'react-router-dom';
import * as ActionTypes from './../../store/actions'

import { useSelector } from 'react-redux'

import { connect } from 'react-redux'


const NavMenu = () => {


  let item;

  if (useSelector(state => state.isAuthenticated)) {
    item = (

      < Nav >
        <NavItem link="/Board" text="Nauka" />
      </Nav >
    )
  }
  return (


    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <NavLink to='/' exact>
        Easy-Learn
        </NavLink>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <NavItem link="/Login" text="Zaloguj" />
        </Nav>
        {item}
      </Navbar.Collapse>
    </Navbar>

  );
}

const mapStateToProps = state => {

  return {
    isAuth: state.isAuthenticated
  }
}


export default connect(mapStateToProps)(NavMenu);