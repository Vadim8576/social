const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    users: [
        {id: 1, name: 'Андрей'},
        {id: 2, name: 'Валера'},
        {id: 3, name: 'Анна'},
        {id: 4, name: 'Сергей'}],
    messages: [
        {id: 1, messages: 'Привет!'},
        {id: 2, messages: 'Как дела?'},
        {id: 3, messages: 'Yo!'},
        {id: 4, messages: 'Пока!'}],
    newMessageBody: ''
}


const dialogsReducer = (state = initialState, action) => {

    switch(action.type){
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body;
            console.log(state.newMessageBody);
            return state;
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            state.newMessageBody = '';
            state.messages.push( {id: 6, messages: body} );
            console.log(state.messages);
            return state;
        default:
            return state;
    }
}

export const sendMessageActionCreator = () => ( {type: SEND_MESSAGE} );

export const updateNewMessageBodyActionCreator = (text) => 
    ( {type: UPDATE_NEW_MESSAGE_BODY, body: text} );

export default dialogsReducer;