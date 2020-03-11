import React from 'react';
import Items from './Items/Items'
import css from './dialogs.module.css';
import Messages from './Messages/messages';


const Dialogs = (props) => {
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