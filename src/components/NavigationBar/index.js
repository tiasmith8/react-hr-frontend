import { useEffect, useState } from 'react';
import MobileNavigation from './MobileNavigation';
import { Nav, NavLink, Bars, Head, NavMenu, NavBtn, NavBtnLink } from './NavbarElements';

const NavBar = () => {
    // const toggleButton = document.getElementsByTagName('NavMenu').item[0];
    // const navBarLinks = document.getElementsByTagName('NavMenu').item[0];
    // // const tia = document.getElementsByTagName

    // debugger;
    // toggleButton.addEventListener('click', () => {
    //     navBarLinks.classList.toggle('activeStyle');
    // });

    const [open, setOpen] = useState(true);

    // useEffect(() => {
    //     setOpen(open => !open);
    // }, [open])

    const toggleClass = () => {
        debugger;
    }

    return (
        <>
            <Nav>
                <NavLink to="/">
                    <h1>HR Training</h1>
                </NavLink>
                <div
                // onClick={setOpen(!open)}
                >
                    <MobileNavigation />
                </div>
                <NavMenu
                    className={open ? 'NavMenu.hamburgerOpen' : null}
                >
                    <NavLink to="/profile/id" activeStyle>
                        Profile
                    </NavLink>
                    <NavLink to="/60ADE84C-4079-47E9-1074-08D92F464040/workouts/:id" activeStyle>
                        Workouts
                    </NavLink>
                    <NavLink to="/workout-history" activeStyle>
                        Workout History
                    </NavLink>
                    <NavLink to="/profiles/60ADE84C-4079-47E9-1074-08D92F464040/settings" activeStyle>
                        Settings
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
