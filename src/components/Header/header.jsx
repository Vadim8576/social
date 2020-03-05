import React from 'react';
import css from './header.module.css';
import logo from '../img/Main_Icon.png';

const Header = () => {
    return (
        <div className={css.header}>
            {/* <p>Header</p> */}
            <div className={css.headerLogo}>
                <img src={logo} className={css.logo} alt=''/>
                </div>
            <div className={css.title}>
                <span>Jon Doe</span>
            </div>
            
        </div>
    );
}

export default Header;