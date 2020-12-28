import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import logo from '../../../Assets/images/ew.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
const NavBar = (props)=>{
    return (
      <Navbar
        style={{
          borderBottom: "1px solid rgba(255, 255, 255, 0.442)",
          backgroundColor: "#43484d",
        }}
        collapseOnSelect
        expand="lg"
        variant="dark"
        className="py-0 my-0"
      >
        <Navbar.Brand href="#home">Chat$tudio</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Navbar.Brand>
              {/* {props.userData?<Navbar.Brand>{props.userData.given_name}</Navbar.Brand>:null} */}
              {props.userData?<img
                style={{
                  display:'block',
                  height: "50px",
                  width: "50px",
                  borderRadius: "100%",
                  border: "3px solid rgb(189, 103, 103)"
                }}
                alt=""
                src={props.userData.picture}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />:null}
            </Navbar.Brand>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
}


export default NavBar;