import { usersAPI } from './../../api/api';

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
               ...action.data,
               isAuth: true
            };
        default:
        return state;
    }
}


//ActoinCreators:

export const setAuthUserData = (userId, email, login) => ( {type: SET_USER_DATA, data: {userId, email, login}} );


export const Authentication = () => {
    
    return (dispatch) => {

        usersAPI.setAuth()
            .then(data => {
                let {id, email, login} = data.data;
                if(data.resultCode === 0) {
                    dispatch(setAuthUserData(id, email, login));
                }
            })
    }
}


export default authReducer;