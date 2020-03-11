import React from 'react';
import Message from './Message/message'
import css from './messages.module.css';


 
const Messages = (props) => {

    let messages = props.dialogsPage.messages.map(el => <Message messages={el.messages} />);
    

    let newMessageBody = props.dialogsPage.newMessageBody;
    
    console.log('newMessageBody= ', newMessageBody);
    // debugger;
    
    // let onSendMessageClick = () => props.store.dispatch( sendMessageActionCreator() );

    // let onNewMessageChange = (e) => {
    //     let body = e.target.value;
    //     props.store.dispatch( updateNewMessageBodyActionCreator(body) );
    // }

    return (
        <div className={css.dialogs__messages}>
            {messages}
            <div>
                <div><textarea
                    value={ newMessageBody }
                    placeholder='Enter your message'
                    onChange={ props.onNewMessageChange } /></div>
                <div><button onClick={ props.onSendMessageClick }>Send</button></div>
            </div>

        </div>
    );
}

export default Messages;