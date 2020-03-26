import React from 'react';
import Message from './Message/message'
import css from './messages.module.css';
import {reduxForm, Field} from 'redux-form';
import { requiredField, maxLengthCreator } from '../../../../utils/validators/validators';
import { Textarea } from '../../../common/formsControls/formsControls';


// props.handleSubmit метод из redux-form

const maxLength10 = maxLengthCreator(10);

const MessagesForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {/* <textarea
                    value={ props.dialogsPage.newMessageBody }
                    placeholder='Enter your message'
                    onChange={ props.onNewMessageChange } /> */}
            <Field placeholder={'Введите сообщение'} name={'messagesForm'} component={Textarea}
            validate={[requiredField, maxLength10]} />
            <div>
                <button>Send</button>
            </div>
            
            {/* <button onClick={ props.onSendMessageClick }>Send</button> */}
        </form>
    )
}
 
// { form: 'messages' } это уникальное имя формы, так как форм может быть много
const MessagesReduxForm = reduxForm({ form: 'messages' })(MessagesForm)


const Messages = (props) => {
    // debugger;
    let messages = props.dialogsPage.messages
    .map(el => <Message key={el.id} messages={el.messages} />);
    
     // Необходимо передать эту функцию в HOC
    const onSubmit = (formData) => {
        console.log(formData.messagesForm);
        props.onSendMessageClick(formData.messagesForm);
    }
    
    return (
        <div className={css.dialogs__messages}>
            {messages}
            <div>
                <MessagesReduxForm onSubmit={onSubmit} />
            </div>

        </div>
    );
}

export default Messages;