import React from 'react';
import {NavLink} from 'react-router-dom';
const NavBarHome = () => {
    return (
        <nav>
            <div className='nav-container'>
                <h1> <NavLink exact to= "/" activeStyle={{color: "white"}}> AgendaX </NavLink></h1>
            </div>
        </nav>
    );
};

export default NavBarHome;