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
  
  return (    
    <div className="App">
        <Header />
        <Navigation />

        {/* Route следит за адресной строкой. Когда адрес равен '/dialogs', рендерит тег <Dialogs /> */}
        <Route path='/dialogs' render={() =>
          <Dialogs
            users={props.state.dialogsPage.users}
            messages={props.state.dialogsPage.messages} />} />

        <Route path='/posts' render={() =>
          <Posts
            newPostText={props.state.postsPage.newPostText}
            posts={props.state.postsPage.posts}
            addPost={props.addPost}
            updateNewPostText={props.updateNewPostText} />} />

        <Route path='/news' component={News} />
        <Route path='/foto' component={Fotos} />          
        <Footer />
    </div>   
  );
}


export default App;
