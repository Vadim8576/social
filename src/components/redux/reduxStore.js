import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";
import authReducer from './authReducer';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from './appReducer';

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
});


// Это настройка Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunkMiddleware)
  ));


  
// Использовать это создание store, если не юзать Redux DevTools
// let store = createStore(redusers, applyMiddleware(thunkMiddleware));


// Применяя параметр applyMiddleware,
// мы говорим Store - прими промежуточные слои

// window.store = store;

export default store;