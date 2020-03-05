import React from 'react';
import Item from './Item/Item'
import css from './items.module.css';



const Items = (props) => {

    let item = props.users.map (el => <Item id={el.id} name={el.name} />);

 return (
        <div className={css.dialogs__items}>
            {item}
        </div>
    );
}

export default Items;