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

    dispatch(action) { //action это объект 
        if(action.type === 'ADD-POST') {
            if(!this._state.postsPage.newPostText) return;

            let newPost = {
                id: 5,
                message: this._state.postsPage.newPostText,
                likesCount: 0
            };
        
            this._state.postsPage.posts.push(newPost);
            this._state.postsPage.newPostText = '';
            this._callSubscriber(this._state);
        } else if(action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.postsPage.newPostText = action.newText;
            this._callSubscriber(this._state);
        }
    }
}


export default store;