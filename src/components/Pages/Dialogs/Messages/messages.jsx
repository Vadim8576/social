import React from 'react';
import Message from './Message/message'
import css from './messages.module.css';

import {sendMessageActionCreator, updateNewMessageBodyActionCreator} from '../../../redux/dialogsReducer';


 
const Messages = (props) => {

    let messages = props.store.getState().dialogsPage.messages.map(el => <Message messages={el.messages} />);
    // debugger;

    let newMessageBody = props.store.getState().dialogsPage.newMessageBody;
    let onSendMessageClick = () => props.store.dispatch( sendMessageActionCreator());

    let onNewMessageChange = (e) => {
        let body = e.target.value;
        props.store.dispatch( updateNewMessageBodyActionCreator(body) );
    }

    return (
        <div className={css.dialogs__messages}>
            {messages}
            <div>
                <div><textarea
                    value={ newMessageBody }
                    placeholder='Enter your message'
                    onChange={ onNewMessageChange } /></div>
                <div><button onClick={ onSendMessageClick }>Send</button></div>
            </div>

        </div>
    );
}

export default Messages;