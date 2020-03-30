import { authAPI } from './../../api/api';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'SET_USER_DATA';


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
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
        default:
        return state;
    }
}


//ActoinCreators:

export const setAuthUserData = (userId, email, login, isAuth) => ( {type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}} );


// у Димыча называется getAuthUserData
export const Authentication = () => (dispatch) => {
        return authAPI.me()
            .then(data => {
                let {id, email, login} = data.data;
                if(data.resultCode === 0) {
                    dispatch(setAuthUserData(id, email, login, true));
                }
            })
}


export const login = (email, password, rememberMe) => (dispatch) => {

        authAPI.login(email, password, rememberMe)
            .then(data => {
                if(data.resultCode === 0) {
                    // после залогинивания, снова вызываем thunk`у Authentication
                    dispatch(Authentication()); // у Димыча называется getAuthUserData
                } else {
                    // let action = stopSubmit('login', {email: 'Неверный email'});
                    let action = stopSubmit('login', {_error: 'email или password введены не верно!'}); //stopSubmit - Экшн криейтор из redux-form
                    dispatch(action);
                }
            })
}

export const logout = () => (dispatch) => {

    authAPI.logout()
        .then(data => {
            if(data.resultCode === 0) {
                //когда вылогинились - все данные в state
                dispatch(setAuthUserData(null, null, null, false));
            }
        })
}

export default authReducer;