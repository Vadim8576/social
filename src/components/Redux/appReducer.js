// import { authAPI } from '../../api/api';
// import { stopSubmit } from 'redux-form';
import { Authentication } from './authReducer';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';


let initialState = {
    initialized: false
};


const appReducer = (state = initialState, action) => {
// изменяем только копию объекта state
// оператор ... как бы развертывает объект state и делает его копию
    switch(action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
               initialized: true
            };
        default:
        return state;
    }
}


//ActoinCreators:

export const initializedSuccess = () => ( {type: INITIALIZED_SUCCESS} );


// у Димыча называется getAuthUserData
export const initializeApp = () => (dispatch) => {
    // Thunk`a Authentication возвращает Promise
    let promise = dispatch(Authentication());

    // если нужно дождаться нескольких запросов, помещаем их в массив Промисов

    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess());
        });
}

export default appReducer;