import React from 'react';
import css from './navItem.module.css';
import { NavLink } from 'react-router-dom';


const NavItem = (props) => {
    // console.log(css.active);
    return (  
        
        <li className={css.item}>
            {/* NavLink - меняет URL без перезагрузки страницы */}
            <NavLink to={props.link} activeClassName={css.active}>{props.item}</NavLink>
        </li> 
    );
}

export default NavItem;