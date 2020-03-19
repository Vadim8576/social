import React from 'react';
import Items from './Items/Items'
import css from './dialogs.module.css';
import Messages from './Messages/messages';
import { Redirect } from 'react-router-dom';


const Dialogs = (props) => {

    if(!props.isAuth) return <Redirect to={'/Login'} />;

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