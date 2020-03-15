const SET_USER_DATA = 'SET_USER_DATA';


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

// isFetching -  получение данных. Показывать крутилку или нет (Preloader)

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

export default authReducer;