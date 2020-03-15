import React from 'react';
import css from './header.module.css';
import logo from '../img/Main_Icon.png';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <div className={css.header}>
            <div className={css.headerLogo}>
                <img src={logo} className={css.logo} alt=''/>
            </div>
            <div className={css.loginBlock}>
                {props.isAuth ? props.login
                : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </div>
    );
}

export default Header;