import React from 'react';
import Message from './Message/message'

import css from './messages.module.css';

 
const Messages = (props) => {

    //  console.log(props.messages);

    let messages = props.messages.map(el => <Message messages={el.messages} />);

    return (
        <div className={css.dialogs__messages}>
            {messages}
        </div>
    );
}

export default Messages;