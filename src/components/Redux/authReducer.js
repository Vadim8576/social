import { authAPI } from './../../api/api';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'auth/SET_USER_DATA';


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
export const Authentication = () => async (dispatch) => {
    
    let response = await authAPI.me();
        
    let {id, email, login} = response.data;
    if(response.resultCode === 0) {
        dispatch(setAuthUserData(id, email, login, true));
    }

}


export const login = (email, password, rememberMe) => async (dispatch) => {

    let response = await authAPI.login(email, password, rememberMe);
        
    if(response.resultCode === 0) {
        // после залогинивания, снова вызываем thunk`у Authentication
        dispatch(Authentication()); // у Димыча называется getAuthUserData
    } else {
        // let action = stopSubmit('login', {email: 'Неверный email'});
        let action = stopSubmit('login', {_error: 'email или password введены не верно!'}); //stopSubmit - Экшн криейтор из redux-form
        dispatch(action);
    }
        
}

export const logout = () => async (dispatch) => {

    let resolve = await authAPI.logout();
        
    if(resolve.resultCode === 0) {
        //когда вылогинились - все данные в state
        dispatch(setAuthUserData(null, null, null, false));
    }
   
}

export default authReducer;