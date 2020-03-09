import React from 'react';
import Header from './components/Header/header';
import Navigation from './components/Navigation/navigation';
import Posts from './components/Pages/Posts/posts';
import Dialogs from './components/Pages/Dialogs/dialogs';
import News from './components/Pages/News/News';
import Fotos from './components/Pages/Fotos/Fotos';
import Footer from './components/Footer/footer';
import './App.css';
import { Route } from 'react-router-dom';

 

const App = (props) => {
  // console.log(props);
    // debugger;
  return (    
    <div className="App">
        <Header />
        <Navigation />

        {/* Route следит за адресной строкой. Когда адрес равен '/dialogs', рендерит тег <Dialogs /> */}
        <Route path='/dialogs' render={() =>
          <Dialogs
            users={props.store.getState().dialogsPage.users}
            store={props.store} />} />

        <Route path='/posts' render={() =>
          <Posts
            store={props.store}
            dispatch={props.store.dispatch.bind(props.store)} />} />

        <Route path='/news' component={News} />
        <Route path='/foto' component={Fotos} />          
        <Footer />
    </div>   
  );
}


export default App;
