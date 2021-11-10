import { useEffect, useState } from 'react';
import MobileNavigation from './MobileNavigation';
import { Nav, NavLink, Bars, Head, NavMenu, NavBtn, NavBtnLink } from './NavbarElements';

const NavBar = () => {
    // const toggleButton = document.getElementsByTagName('NavMenu').item[0];
    // const navBarLinks = document.getElementsByTagName('NavMenu').item[0];
    // // const tia = document.getElementsByTagName

    const profileID = "60ADE84C-4079-47E9-1074-08D92F464040";

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
                    <NavLink to={{ pathname: `/profile/${profileID}` }} activeStyle>
                        Profile
                    </NavLink>
                    <NavLink to={{ pathname: `/${profileID}/workouts/:id` }} activeStyle>
                        Workouts
                    </NavLink>
                    <NavLink to={{ pathname: `/workout-history` }} activeStyle>
                        Workout History
                    </NavLink>
                    <NavLink to={{ pathname: `/profiles/${profileID}/settings` }} activeStyle>
                        Settings
                    </NavLink>
                    <NavLink to={{ pathname: `/profiles/${profileID}/goals` }} activeStyle>
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
