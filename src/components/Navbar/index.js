import React from 'react'
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavbarElements'

const NavBar = () => {
    return (
        <>
            <Nav>
                <NavLink to="/">
                    <h1>HR Training</h1>
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to="/profile" activeStyle>
                        Profile
                    </NavLink>
                    <NavLink to="/workouts" activeStyle>
                        Workouts
                    </NavLink>
                    <NavLink to="/workout-history" activeStyle>
                        Workout History
                    </NavLink>
                    <NavLink to="/goals" activeStyle>
                        Goals
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to='/signin'>Sign In</NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    )
}

export default NavBar
