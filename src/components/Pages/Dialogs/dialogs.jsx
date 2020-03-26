import React from 'react';
import css from './dialogs.module.css';
import Messages from './Messages/messages';
import { NavLink } from 'react-router-dom';

const Dialogs = (props) => {
   
    let item = props.dialogsPage.users.map (el => 
        {return (
                 <div className={css.dialogs__items_item+' '+css.active}>        
                    <NavLink to={`/dialogs/${el.id}`}>{el.name}</NavLink>   
                </div>)   
        });



    return (
        <div className={css.dialogs__messages}>
            <div>{item}</div>
            <Messages
                onNewMessageChange={props.onNewMessageChange}
                onSendMessageClick={props.onSendMessageClick}
                dialogsPage={props.dialogsPage}
            />
        </div>
    );
}



export default Dialogs;