import './index.css';
import * as serviceWorker from './serviceWorker';
import store from './components/Redux/reduxStore'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';

import SamuraiJsApp from './App';


// Компоненты обернутые <Provider>, с переданным в его store
// могут использовать Контекст, созданный им (могут использовать store).
// <Provider> добавляет store в контекст, который может использовать
// любой компонент (обернутый)
    // ReactDOM.render(
    //     <BrowserRouter>   
    //         <Provider store={store}>
    //             <App />
    //         </Provider>
    //     </BrowserRouter>, document.getElementById('root'));

    ReactDOM.render(
        <SamuraiJsApp />, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


