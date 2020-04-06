import { usersAPI } from './../../api/api';
import { profileAPI } from './../../api/api';
import { stopSubmit } from 'redux-form';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCES = 'SAVE_PHOTO_SUCCES';


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
    switch(action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [
                    ...state.posts,
                    {id: 5, message: action.newPost, likesCount: 0}
                ]
            };
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
        case DELETE_POST: 
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            };
        case SAVE_PHOTO_SUCCES: 
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            };
        default:
        return state;
    }
}

export const addPost = (newPost) => ( {type: ADD_POST, newPost} );
export const setUserProfile = (profile) => ( {type: SET_USER_PROFILE, profile} );
export const setStatus = (status) => ( {type: SET_STATUS, status} );
export const deletePost = (postId) => ( {type: DELETE_POST, postId} );
export const savePhotoSucces = (photos) => ( {type: SAVE_PHOTO_SUCCES, photos} );


export const getUserProfile = (userId) => async (dispatch) => {
        
    let response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response));

    
}

export const getUserStatus = (userId) => async (dispatch) => {
        
    let responce = await profileAPI.getStatus(userId);
    dispatch(setStatus(responce));

}

export const updateStatus = (status) => async (dispatch) => {
    // try и catch используется при async-await
    // пытаемся выполнить код в try, если выдаст ошибку - catch
    try {
        let response = await profileAPI.updateStatus(status);
        if(response.resultCode === 0) {
            dispatch(setStatus(status)); // если ошибок нет, диспатчим setStatus
        }     
    } catch(error) {
        console.log(error);
    }
    

}

export const savePhoto = (file) => async (dispatch) => {

    let response = await profileAPI.savePhoto(file);
    if(response.resultCode === 0) {
        dispatch(savePhotoSucces(response.data.photos)); // если ошибок нет, диспатчим setStatus
    }     

}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId
    let response = await profileAPI.saveProfile(profile);
    // debugger;
    if(response.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit('profileFormData', {_error: response.messages[0]}));
        //вернуть промис с ошибкой
        return Promise.reject(response.messages[0]);
    }   
}

export default profileReducer;