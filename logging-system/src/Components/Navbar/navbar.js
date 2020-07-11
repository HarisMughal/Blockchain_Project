import React from 'react';
import {Navbar,NavbarBrand, NavbarToggler, Nav,NavItem, Button} from 'reactstrap';
import { NavLink } from 'react-router-dom';




function NavBar(){
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
                        <NavLink className="nav-link mx-4" exact to = "/send">
                            Send Data
                        </NavLink>
                    </NavItem>
                </Nav>
                
            </div>
            <Nav className='ml-auto'>
                    <NavItem>
                        <Button outline color="light" > 
                            
                            Logout
                        </Button>
                    </NavItem>
            </Nav>


            
        </Navbar >
    );
}


export default NavBar;



