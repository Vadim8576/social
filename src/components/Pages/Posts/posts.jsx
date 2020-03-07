import React from 'react';
import Post from './Post/post';
import css from './posts.module.css';
import {addPostActionCreator, updateNewPostNextActionCreator} from '../../Redux/state';

const MyPosts = (props) => {
    // debugger;
    //newPostElement - ссылается на textarea
    let newPostElement = React.createRef(); //Аналог селектора

    let addPost = () => {   
        // debugger;
        props.dispatch( addPostActionCreator() ); 
    }

    let onTextareaChange = () => {
        // debugger;
        let text = newPostElement.current.value;
        props.dispatch( updateNewPostNextActionCreator(text) );
    }

    return (    
        <div className={css.addPost}>
            <h2>Мои посты</h2>
            <div>
                <textarea
                    ref={ newPostElement }
                    onChange={ onTextareaChange }
                    value={ props.newPostText } />
            </div>
            <div>
                <button onClick={ addPost }>Добавить пост</button>
            </div>
        </div>
    );
};



const Posts = (props) => {
   
    let post = props.posts.map((el) => <Post message={el.message} likesCount={el.likesCount.toString()} />);

    return (
        <div>   
            <MyPosts
                newPostText={ props.newPostText }
                dispatch={ props.dispatch } />
            <div>
               {post}
            </div>
        </div>
    );
}

export default Posts;