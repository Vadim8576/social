import React from 'react';
import css from './item.module.css';
import { NavLink } from 'react-router-dom';


const Item = (props) => {
    return (
        <div className={css.dialogs__items_item+' '+css.active}>        
            <NavLink to={`/dialogs/${props.id}`}>{props.name}</NavLink>   
        </div>
    );
}

export default Item;