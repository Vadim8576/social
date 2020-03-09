import { createStore, combineReducers } from 'redux';

import postsReducer from "./postsReducer";
import dialogsReducer from "./dialogsReducer";

let redusers = combineReducers({
    postsPage: postsReducer,
    dialogsPage: dialogsReducer
});


let store = createStore(redusers);


export default store;