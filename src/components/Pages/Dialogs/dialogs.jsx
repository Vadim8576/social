import React from 'react';
import Items from './Items/Items'
import css from './dialogs.module.css';
import Messages from './Messages/messages';


const Dialogs = (props) => {
    // console.log(props.message);
    return (
        <div className={css.dialogs__messages}>
            <Items users={props.users} />
            <Messages messages={props.messages} />
        </div>
    );
}

export default Dialogs;