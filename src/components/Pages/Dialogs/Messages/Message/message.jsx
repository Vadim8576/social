import React from 'react';
import css from './message.module.css';


const Message = (props) => {
    // console.log(props.messages);
    return (
        <div className={css.dialogs__messages_message+' '+css.active}>
            {props.messages}
         </div>
    );
}

export default Message;