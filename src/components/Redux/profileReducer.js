import { usersAPI } from './../../api/api';
import { profileAPI } from './../../api/api';

const ADD_POST = 'ADD-POST';
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
    posts: [
        {id: 1, message: 'Hello!', likesCount: 10},
        {id: 2, message: 'Это переданный...', likesCount: 0},
        {id: 3, message: '...параметр Props,', likesCount: 5},
        {id: 4, message: 'а это значение переменной...', likesCount: 24}
    ],
    profile: null,
    status: ''
}


const profileReducer = (state = initialState, action) => {
    // console.log(action);
    switch(action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [
                    ...state.posts,
                    {id: 5, message: action.newPost, likesCount: 0}
                ]
            };
        // case UPDATE_NEW_POST_TEXT: 
        //     return {
        //         ...state,
        //         newPostText: action.newText
        //     };
        case SET_USER_PROFILE: 
            return {
                ...state,
                profile: action.profile
            };
        case SET_STATUS: 
            return {
                ...state,
                status: action.status
            };
        default:
        return state;
    }
}

export const addPost = (newPost) => ( {type: ADD_POST, newPost} );
// export const updateNewPostText = (text) => ( {type: UPDATE_NEW_POST_TEXT, newText: text} );
export const setUserProfile = (profile) => ( {type: SET_USER_PROFILE, profile} );
export const setStatus = (status) => ( {type: SET_STATUS, status} );

export const getUserProfile = (userId) => {
    
    return (dispatch) => {
        
        usersAPI.getProfile(userId)
        .then(data => {
            dispatch(setUserProfile(data));
        })
    }
}

export const getUserStatus = (userId) => {
    
    return (dispatch) => {
        
        profileAPI.getStatus(userId)
        .then(data => {
            dispatch(setStatus(data));
        })
    }
}

export const updateStatus = (status) => {
    
    return (dispatch) => {
        
        profileAPI.updateStatus(status)
        .then(data => {
            // debugger;
            if(data.resultCode === 0) {
                dispatch(setStatus(status)); // если ошибок нет, диспатчим setStatus
            }
            
        })
    }
}

export default profileReducer;