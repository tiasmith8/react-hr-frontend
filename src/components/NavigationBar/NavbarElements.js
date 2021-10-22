import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

export const Nav = styled.nav`
    background: #000;
    height: 80px;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem calc((100vw - 1000px) / 2);
    z-index: 10;

    @media screen and (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        height: 130px;
    }
`

export const HamburgerMenu = styled.div`
@media screen and (max-width: 768p) {
    display: none;
}
`

export const NavLink = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;

    &.active {
    color: #15cdfc;

    @media screen and (max-width: 768px) {
        // flex-direction: column;
    }
`

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 768px) {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    // transform: translate(-100%, 75%);
    transform: translate(-15%, 10%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.nav`
    display: flex;
    align-items: center;
    margin-right: -24px;

    .hamburgerOpen {
        background: red;
    }

    /* Second Nav */
    /* margin-right: 24px; */

    /* Third Nav */
    /* width: 100vw;
    
    white-space: nowrap; */
    @media screen and (max-width: 768px) {
        display: none;
        flex-direction: column;
        align-items: flex-start;
       
    }
`;

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    margin-right: 24px;

    @media screen and (max-width: 768px) {
        display: none;
        // flex-direction: column;
    }
`

export const NavBtnLink = styled(Link)`
    border-radius: 4px;
    background: #256ce1;
    padding: 10px 22px;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`

// export const GlobalStyles = styled`
//   html, body {
//     margin: 0;
//     padding: 0;
//   }
//   *, *::after, *::before {
//     box-sizing: border-box;
//   }

//   body {
//     align-items: center;
//     background: #0D0C1D;
//     color: #EFFFFA;
//     display: flex;
//     font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
//     height: 100vh;
//     justify-content: center;
//     text-rendering: optimizeLegibility;
//   }
//   `

