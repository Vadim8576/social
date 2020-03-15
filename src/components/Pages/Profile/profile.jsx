import React from 'react';
import Post from './Posts/post';
import css from './profile.module.css';


const Profile = (props) => {
    let post = props.posts
        .map((el) =>
        <Post key={el.id} message={el.message} likesCount={el.likesCount.toString()} />);
    // console.log(props.profile);
    return (
        <div> 
            <div className={css.addPost}>
                <h2>Мои посты</h2>
                <div>
                    <textarea
                        onChange={ (e) => {props.updateNewPostText(e.currentTarget.value)} }
                        value={ props.newPostText } />
                </div>
                <div>
                    <button onClick={ () => props.addPost() }>Добавить пост</button>
                </div>
            </div>
            <div>
               {post}
            </div>
        </div>
    );
}

export default Profile;