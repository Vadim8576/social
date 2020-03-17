import { createStore, combineReducers, applyMiddleware } from 'redux';

import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";
import authReducer from './authReducer';
import thunkMiddleware from 'redux-thunk';

let redusers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer
});


let store = createStore(redusers, applyMiddleware(thunkMiddleware));
// Применяя параметр applyMiddleware,
// мы говорим Store - прими промежуточные слои

window.store = store;

export default store;