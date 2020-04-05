import { authAPI, securityAPI } from './../../api/api';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'auth/SET_USER_DATA';
const  GET_CAPTCHA_URL_SUCCESS= 'auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null // если null, значит captcha не обязательна
};


const authReducer = (state = initialState, action) => {
// изменяем только копию объекта state
// оператор ... как бы развертывает объект state и делает его копию
    switch(action.type) {
        case SET_USER_DATA:
            return {
                ...state,
               ...action.payload
            };
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        default:
        return state;
    }
}


//ActoinCreators:

export const setAuthUserData = (userId, email, login, isAuth) => ( {type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}} );

export const getCaptchaUrlSuccess = (captchaUrl) => ( {type: SET_USER_DATA,
    payload: {captchaUrl}} );


// у Димыча называется getAuthUserData
export const Authentication = () => async (dispatch) => {
    
    let response = await authAPI.me();
        
    let {id, email, login} = response.data;
    if(response.resultCode === 0) {
        dispatch(setAuthUserData(id, email, login, true));
    }

}


export const login = (email, password, rememberMe, captcha) => async (dispatch) => {

    let response = await authAPI.login(email, password, rememberMe, captcha);
    console.log('resultCode: ', response.resultCode);
    if(response.resultCode === 0) {
        // после залогинивания, снова вызываем thunk`у Authentication
        dispatch(Authentication()); // у Димыча называется getAuthUserData
    } else {
        if(response.resultCode === 10){
            dispatch(getCaptchaUrl());
            
        } else {
            const action = stopSubmit('login', {_error: 'email или password введены не верно!'}); //stopSubmit - Экшн криейтор из redux-form
            dispatch(action);
        }
       
    }
        
}


export const getCaptchaUrl = () => async (dispatch) => {
    
    const response = await securityAPI.getCaptchaUrl();
    
    const captchaUrl = response.url;
    console.log('response.url: ', response.url);
    dispatch(getCaptchaUrlSuccess(captchaUrl));

        
}


export const logout = () => async (dispatch) => {

    let resolve = await authAPI.logout();
        
    if(resolve.resultCode === 0) {
        //когда вылогинились - все данные в state
        dispatch(setAuthUserData(null, null, null, false));
    }
   
}

export default authReducer;