import React from 'react';
import HeaderContainer from './components/Header/headerContainer';
import Navigation from './components/Navigation/navigation';
import ProfileContainer from './components/Pages/Profile/profileContainer';
import DialogsContainer from './components/Pages/Dialogs/dialogsContainer';
import UsersContainer from './components/Pages/Users/usersContainer';
import News from './components/Pages/News/News';
import Fotos from './components/Pages/Fotos/Fotos';
import LoginPage from './components/Login/Login';
import './App.css';
import { Route } from 'react-router-dom';
import { initializeApp } from '../src/components/Redux/appReducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Preloader from './components/common/preloader/preloader';
 

class App extends React.Component {
  componentDidMount() {

    this.props.initializeApp();
    
  }

  render() {

    // если еще не все загрузилось, покажем Прелоадер
    if(!this.props.initialized) return <Preloader />

    return (    
      <div className='App'>
          <HeaderContainer />
          <div className='wrapper'>
            <Navigation />
  
            <div className='content_wrapper'>
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
  
              <Route path='/login' render={() =>
                <LoginPage /> } />
  
              <Route path='/news' component={News} />
              <Route path='/foto' component={Fotos} />    
            </div>  
          </div>    
      </div>   
    );
  }
  
}


const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default compose(
    connect(mapStateToProps, {initializeApp})(App)
);


