import { createStore, combineReducers } from 'redux';

import postsReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";


let redusers = combineReducers({
    profilePage: postsReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer
});


let store = createStore(redusers);


export default store;