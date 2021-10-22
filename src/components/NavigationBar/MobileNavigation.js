// import NavBar from "./components/Navbar/index.js";
// import { Bars } from "./NavbarElements";
import { bool, func } from 'prop-types';
import { Link } from 'react-router-dom';
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavbarElements';

const MobileNavigation = ({ open, setOpen }) => {


    const toggleClass = () => {
        debugger;
        // setOpen(!open);
    }

    return (
        // <nav className="Bars">
        //     <Bars>hi tia</Bars>hi tia
        // </nav>
        <div>
            <Bars
                onClick={() => console.log('hi')}
                className={open ? 'hamburgerOpen' : null}
            ></Bars>
        </div>

    );
}

export default MobileNavigation;