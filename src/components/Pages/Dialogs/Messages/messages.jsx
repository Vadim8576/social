import React from 'react';
import Message from './Message/message'
import css from './messages.module.css';

import {sendMessageActionCreator, updateNewMessageBodyActionCreator} from '../../../Redux/state';


 
const Messages = (props) => {

    //  console.log(props.messages);

    let messages = props.messages.map(el => <Message messages={el.messages} />);


    let newMessageBody = props.state.newMessageBody;
    let onSendMessageClick = () => props.store.dispatch( sendMessageActionCreator());


    let onNewMessageChange = (e) => {
        let body = e.target.value;
        props.dispatch( updateNewMessageBodyActionCreator(body) );
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