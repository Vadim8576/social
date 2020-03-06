import React from 'react';
import Post from './Post/post';
import css from './posts.module.css';




const MyPosts = (props) => {
    //newPostElement - ссылается на textarea
    let newPostElement = React.createRef(); //Аналог селектора

    let addPost = () => {
       
        props.addPost();
       
        
    }

    let onTextareaChange = () => {
  
        let text = newPostElement.current.value;
        
        props.updateNewPostText(text);
    }

    return (    
        <div className={css.addPost}>
            <h2>Мои посты</h2>
            <div>
                <textarea
                    ref={ newPostElement }
                    onChange={onTextareaChange}
                    value={props.newPostText} />
            </div>
            <div>
                <button onClick={ addPost }>Добавить пост</button>
            </div>
        </div>
    );
};



const Posts = (props) => {
    // debugger;
    let post = props.posts.map((el) => <Post message={el.message} likesCount={el.likesCount.toString()} />);

    return (
        <div>
            <MyPosts
                addPost={props.addPost}
                newPostText={props.newPostText}
                updateNewPostText={props.updateNewPostText} />
            <div>
               {post}
             {/* <Post message={postData[0].message}/> */}
            </div>
        </div>
    );
}

export default Posts;