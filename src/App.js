import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { render } from '@testing-library/react';


function App() {

  const onLogin = () => {

    render(
      <div className="container-md">
      <Login />
      </div>
    );

  }

  const onRegister = () => {

    render (
    
      <div className="container-md">
      <Register />
      </div>
      
    )

  }


  return (
    <Router>
      <div className="appRoot">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Easy-Learn</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          </Nav>
        <Nav>
          <Nav.Link onClick={onLogin} >Zaloguj się</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link onClick={onRegister} >Załóż konto</Nav.Link>
        </Nav>
    </Navbar.Collapse>
  </Navbar>
  </div>
  </Router>
  );
}

export default App;

