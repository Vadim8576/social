import React from 'react';
import Post from './Post/post';
import css from './posts.module.css';




const MyPosts = (props) => {
    // debugger;
    //newPostElement - ссылается на textarea
    let newPostElement = React.createRef(); //Аналог селектора

    let addPost = () => {   
        // debugger;
        props.dispatch({type: 'ADD-POST'}); 
    }

    let onTextareaChange = () => {
        // debugger;
        let text = newPostElement.current.value;
        props.dispatch({type: 'UPDATE-NEW-POST-TEXT', newText: text});
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
                newPostText={props.newPostText}
                dispatch={props.dispatch} />
            <div>
               {post}
             {/* <Post message={postData[0].message}/> */}
            </div>
        </div>
    );
}

export default Posts;