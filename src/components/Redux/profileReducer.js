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


const profileReducer = (state = initialState, action) => {
    // console.log(state);
    switch(action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [
                    ...state.posts,
                    {id: 5, message: state.newPostText, likesCount: 0}
                ],
                newPostText: ''
            };
        case UPDATE_NEW_POST_TEXT: 
            return {
                ...state,
                newPostText: action.newText
            };
        default:
        return state;
    }
}

export const addPostActionCreator = () => ( {type: ADD_POST} );

export const updateNewPostTextActionCreator = (text) =>
    ( {type: UPDATE_NEW_POST_TEXT, newText: text} );

export default profileReducer;