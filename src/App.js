import React from 'react';
import HeaderContainer from './components/Header/headerContainer';
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
        <HeaderContainer />
        <Navigation />

        {/* Route следит за адресной строкой. Когда адрес равен '/dialogs', рендерит тег <Dialogs /> */}
        <Route path='/dialogs' render={() =>
          <DialogsContainer />} />


        {/* благодаря withRouter появились новые параменты:
        location и match (см. console)
        получаем парамерт match.params.userId */}
        {/* console.log(this.props); */}

        {/* вопросительный знак означает, что параметр не обязителен */}
        <Route path='/profile/:userId?' render={() => 
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
