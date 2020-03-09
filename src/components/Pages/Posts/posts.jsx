import React from 'react';
import Post from './Post/post';
import css from './posts.module.css';
import {addPostActionCreator, updateNewPostTextActionCreator} from '../../redux/postsReducer';

const MyPosts = (props) => {
    // debugger;
    //newPostElement - ссылается на textarea
    let newPostElement = React.createRef(); //Аналог селектора

    let addPost = () => {   
        // debugger;
        props.dispatch( addPostActionCreator() ); 
    }

    let onTextareaChange = () => {
    //    debugger;
        let text = newPostElement.current.value;
        props.dispatch( updateNewPostTextActionCreator(text) );
    }

    return (    
        <div className={css.addPost}>
            <h2>Мои посты</h2>
            <div>
                <textarea
                    ref={ newPostElement }
                    onChange={ onTextareaChange }
                    value={ props.store.getState().postsPage.newPostText } />
            </div>
            <div>
                <button onClick={ addPost }>Добавить пост</button>
            </div>
        </div>
    );
};



const Posts = (props) => {
//    debugger;
    let post = props.store.getState().postsPage.posts
        .map((el) =>
        <Post message={el.message} likesCount={el.likesCount.toString()} />);

    return (
        <div>   
            <MyPosts
                store={ props.store }
                dispatch={ props.store.dispatch.bind(props.store) } />
            <div>
               {post}
            </div>
        </div>
    );
}

export default Posts;