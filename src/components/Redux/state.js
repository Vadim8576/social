const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

let store = {
    _state: {
        dialogsPage: {
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
            newMessageBody: '',
        },
        postsPage: {
            posts: [
            {id: 1, message: 'Hello!', likesCount: 10},
            {id: 2, message: 'Это переданный...', likesCount: 0},
            {id: 3, message: '...параметр Props,', likesCount: 5},
            {id: 4, message: 'а это значение переменной...', likesCount: 24}],
            newPostText: ''
        }
    },

    _callSubscriber() {
        console.log('state change');
    },

    getState() {
        return this._state;
    },
  
    subscribe(observer) {
        this._callSubscriber = observer; // observer (наблюдатель) - это pattern
    }, 

    // dispatch - переводится, как ОТПРАВКА
    dispatch(action) { //action это объект 
        if(action.type === ADD_POST) {
            if(!this._state.postsPage.newPostText) return;

            let newPost = {
                id: 5,
                message: this._state.postsPage.newPostText,
                likesCount: 0
            };
        
            this._state.postsPage.posts.push(newPost);
            this._state.postsPage.newPostText = '';
            this._callSubscriber(this._state);
        } else if(action.type === UPDATE_NEW_POST_TEXT) {
            this._state.postsPage.newPostText = action.newText;
            this._callSubscriber(this._state);
        } else if(action.type === UPDATE_NEW_MESSAGE_BODY) {
            this._state.dialogsPage.newMessageBody = action.body;
            this._callSubscriber(this._state);
        } else if(action.type === SEND_MESSAGE) {
            let body = this._state.dialogsPage.newMessageBody;
            this._state.dialogsPage.newMessageBody = '';
            this._state.dialogsPage.messages.push( {id: 6, messages: body} );
            this._callSubscriber(this._state);
        }
    }
}

export const addPostActionCreator = () => ( {type: ADD_POST} );

export const updateNewPostNextActionCreator = (text) =>
    ( {type: UPDATE_NEW_POST_TEXT, newText: text} );
    
export const sendMessageActionCreator = () => ( {type: SEND_MESSAGE} );

export const updateNewMessageBodyActionCreator = (text) => 
    ( {type: UPDATE_NEW_MESSAGE_BODY, body: text} );


    
export default store;