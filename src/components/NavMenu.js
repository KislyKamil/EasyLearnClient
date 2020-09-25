import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/NavItem';
import Button from 'react-bootstrap/Button';
import Login from './Login';

const NavMenu = () => {

  // const LogIn = () => {

  //   return 
  // }

  return (

   
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">Easy-Learn</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="#features">O projekcie</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
      <Nav>
       <NavItem>
          <Nav.Link  className="text-light">
          <Button variant="outline-light" onClick= {LogIn}>Zaloguj się</Button>         
           </Nav.Link>
        </NavItem>
      </Nav>
      </Navbar.Collapse>
    </Navbar>

   
  )   
}


export default NavMenu;