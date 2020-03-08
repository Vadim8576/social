import React from 'react';
import Items from './Items/Items'
import css from './dialogs.module.css';
import Messages from './Messages/messages';


const Dialogs = (props) => {
    // console.log(props.message);
    // debugger;
    let state = props.store.getState();
    return (
        <div className={css.dialogs__messages}>
            <Items users={state.dialogsPage.users} />
            <Messages store={props.store} />
        </div>
    );
}

export default Dialogs;