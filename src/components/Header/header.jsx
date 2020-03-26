import React from 'react';
import css from './header.module.css';
import { NavLink } from 'react-router-dom';
// import Preloader from '../common/preloader/preloader';
// import UserNoFoto from '../img/UserPhoto.jpg';

const Header = (props) => {
    // debugger;
    // if(!props.profile) {
    //     return <Preloader />
    // } 
    return (
        <div className={css.header}>
            <div className={css.headerLogo}>
                {/* <img src={logo} className={css.logo} alt=''/> */}
                {/* {props.profile.photos &&<img src={props.profile.photos.small || UserNoFoto} alt="profile-photo"/>} */}
            </div>
            <div className={css.loginBlock}>
                {props.isAuth?
                    <div>
                        {props.login}
                        <div><button onClick={props.logout}>Выйти</button></div>
                    </div>
                : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </div>
    );
}

export default Header;