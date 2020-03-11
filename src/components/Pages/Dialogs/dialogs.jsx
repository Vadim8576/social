import React from 'react';
import Items from './Items/Items'
import css from './dialogs.module.css';
import Messages from './Messages/messages';


const Dialogs = (props) => {
    // console.log(props.message);
    // debugger;
    // let state = props.store.getState();
    // debugger;
    return (
        <div className={css.dialogs__messages}>
            <Items users={props.dialogsPage.users} />
            <Messages
                onNewMessageChange={props.onNewMessageChange}
                onSendMessageClick={props.onSendMessageClick}
                dialogsPage={props.dialogsPage}
            />
        </div>
    );
}

export default Dialogs;