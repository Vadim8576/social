import { createStore, combineReducers } from 'redux';

import postsReducer from "./postsReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";


let redusers = combineReducers({
    postsPage: postsReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer
});


let store = createStore(redusers);


export default store;