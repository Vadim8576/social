import React from 'react';
import HeaderContainer from './components/Header/headerContainer';
import Navigation from './components/Navigation/navigation';
import UsersContainer from './components/Pages/Users/usersContainer';
import News from './components/Pages/News/News';
import Fotos from './components/Pages/Fotos/Fotos';
import LoginPage from './components/Login/Login';
import './App.css';
import { initializeApp } from '../src/components/Redux/appReducer';
import { compose } from 'redux';
import Preloader from './components/common/preloader/preloader';
import store from './components/Redux/reduxStore'
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { withSuspense } from './hoc/withSuspense';

// Ленивая загрузка React.lazy, suspense - изучить
// import DialogsContainer from './components/Pages/Dialogs/dialogsContainer';
const DialogsContainer = React.lazy(() => import('./components/Pages/Dialogs/dialogsContainer'));

// import ProfileContainer from './components/Pages/Profile/profileContainer';
const ProfileContainer = React.lazy(() => import('./components/Pages/Profile/profileContainer'));





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
              <Route path='/dialogs' render={withSuspense(DialogsContainer)} />
  
              {/* благодаря withRouter появились новые параменты:
              location и match (см. console)
              получаем парамерт match.params.userId */}
              {/* console.log(this.props); */}
  
              {/* вопросительный знак означает, что параметр не обязителен */}
              <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)} />
  
              <Route path='/users' render={withSuspense(UsersContainer)} />
  
              <Route path='/login' render={withSuspense(LoginPage)} />
  
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

let AppContainer = compose(
    connect(mapStateToProps, {initializeApp})(App)
);


const SamuraiJsApp = (props) => {
  return <BrowserRouter>   
            <Provider store={store}>
                <AppContainer />
            </Provider>
          </BrowserRouter>
}


export default SamuraiJsApp;