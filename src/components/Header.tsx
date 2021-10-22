import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { FC } from 'react'
import logo from '../logo.svg';

interface HeaderProps {
    title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
    return (
        <header className='header'>
            <h1><img src={logo} width="100" height="50" alt="logo" />{title}</h1>
        </header>
    )
}

Header.defaultProps = {
    title: 'HR Training App'
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
