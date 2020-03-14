import React from 'react';
import Header from './components/Header/header';
import Navigation from './components/Navigation/navigation';
import ProfileContainer from './components/Pages/Profile/profileContainer';
import DialogsContainer from './components/Pages/Dialogs/dialogsContainer';
import UsersContainer from './components/Pages/Users/usersContainer';
import News from './components/Pages/News/News';
import Fotos from './components/Pages/Fotos/Fotos';
import Footer from './components/Footer/footer';
import './App.css';
import { Route } from 'react-router-dom';

 

const App = (props) => {
  return (    
    <div className="App">
        <Header />
        <Navigation />

        {/* Route следит за адресной строкой. Когда адрес равен '/dialogs', рендерит тег <Dialogs /> */}
        <Route path='/dialogs' render={() =>
          <DialogsContainer />} />

        <Route path='/profile' render={() =>
          <ProfileContainer /> } />

        <Route path='/users' render={() =>
          <UsersContainer /> } />

        <Route path='/news' component={News} />
        <Route path='/foto' component={Fotos} />          
        <Footer />
    </div>   
  );
}


export default App;
