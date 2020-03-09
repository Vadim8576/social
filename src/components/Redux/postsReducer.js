const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    posts: [
        {id: 1, message: 'Hello!', likesCount: 10},
        {id: 2, message: 'Это переданный...', likesCount: 0},
        {id: 3, message: '...параметр Props,', likesCount: 5},
        {id: 4, message: 'а это значение переменной...', likesCount: 24}],
        newPostText: ''
}


const postsReducer = (state = initialState, action) => {
    console.log(state);
    switch(action.type) {
        case ADD_POST:
            // if(!state.newPostText) return state;
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            
            state.newPostText = '';
            state.posts.push(newPost);
            console.log(state);
            return state;

        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText;
            return state; 
        default:
        return state;
    }

}

export const addPostActionCreator = () => ( {type: ADD_POST} );

export const updateNewPostTextActionCreator = (text) =>
    ( {type: UPDATE_NEW_POST_TEXT, newText: text} );

export default postsReducer;