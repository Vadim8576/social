const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

const postsReducer = (state, action) => {
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