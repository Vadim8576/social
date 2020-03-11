import React from 'react';
import Post from './Post/post';
import css from './posts.module.css';


const Posts = (props) => {
//    debugger;
    let post = props.postsPage.posts
        .map((el) =>
        <Post message={el.message} likesCount={el.likesCount.toString()} />);

    return (
        <div> 
            {/* <MyPosts> */}
            <div className={css.addPost}>
                <h2>Мои посты</h2>
                <div>
                    <textarea
                        onChange={ props.onTextareaChange }
                        value={ props.newPostText } />
                </div>
                <div>
                    <button onClick={ props.addPost }>Добавить пост</button>
                </div>
            </div>
            {/* </MyPosts> */}
            <div>
               {post}
            </div>
        </div>
    );
}

export default Posts;