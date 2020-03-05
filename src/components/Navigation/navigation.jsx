import React from 'react';
import NavItem from './NavItem/navItem';
import css from './navigation.module.css';

const Navigation = () => {
    return (
        <div className={css.nav}>
            <ul>
                <NavItem link='/posts' item='Мои посты'/>
                <NavItem link='/dialogs' item='Сообщения'/>
                <NavItem link='/news' item='Новости'/>
                <NavItem link='/foto' item='Фотографии'/>
                <NavItem link='/setting' item='Настройки'/>
            </ul>
        </div>
    );
}

export default Navigation;