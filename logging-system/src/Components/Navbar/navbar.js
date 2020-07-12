import React from 'react';
import {Navbar,NavbarBrand, NavbarToggler, Nav,NavItem, Button} from 'reactstrap';
import { NavLink } from 'react-router-dom';

import {
    withRouter,
    Redirect,
  } from "react-router";

function NavBar({history}){

    const handleLogout = () => {

        history.push('/login');
        localStorage.clear();
    }
    return(
        <Navbar dark expand="md" className="bg-primary" >
            <NavbarBrand>DataLedger</NavbarBrand>
            <div className = 'container d-flex flex-grow-1 justify-content-around'>
                <NavbarToggler />
                
                <Nav navbar>
                    <NavItem >
                        <NavLink className="nav-link mx-4" exact to = "/home">
                            Catlog
                        </NavLink>
                    </NavItem>
                    <NavItem >
                        <NavLink className="nav-link mx-4" exact to = "/home/requests">
                            Request
                        </NavLink>
                    </NavItem>
                    <NavItem >
                        <NavLink className="nav-link mx-4" exact to = "/home/send">
                            Send Data
                        </NavLink>
                    </NavItem>
                </Nav>
                
            </div>
            <Nav className='ml-auto'>
                    <NavItem>
                        <Button type="button" outline color="light" onClick={handleLogout}> 
                            
                            Logout
                        </Button>
                    </NavItem>
            </Nav>


            
        </Navbar >
    );
}


export default withRouter(NavBar);



