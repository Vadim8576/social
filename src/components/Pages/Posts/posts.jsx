import React from 'react';
import Post from './Post/post';
import css from './posts.module.css';




const MyPosts = (props) => {
    //newPostElement - ссылается на textarea
    let newPostElement = React.createRef(); //Аналог селектора

    let addPost = () => {
        let text = newPostElement.current.value;
        // console.log(props.addPost);
        props.addPost(text);
    }

    return (    
            <div className={css.addPost}>
                <h2>Мои посты</h2>
                <div>
                    <textarea ref={ newPostElement }></textarea>
                </div>
                <div>
                    <button onClick={ addPost }>Добавить пост</button>
                </div>
            </div>
    );
};



const Page = (props) => {

    let post = props.posts.map((el) => <Post message={el.message} likesCount={el.likesCount.toString()} />);

    return (
        <div>
            <MyPosts addPost={props.addPost} />
            <div>
               {post}
             {/* <Post message={postData[0].message}/> */}
            </div>
        </div>
    );
}

export default Page;