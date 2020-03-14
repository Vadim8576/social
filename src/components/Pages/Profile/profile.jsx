import React from 'react';
import Post from './Posts/post';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import css from './profile.module.css';


const Profile = (props) => {
    
    let post = props.posts
        .map((el) =>
        <Post key={el.id} message={el.message} likesCount={el.likesCount.toString()} />);

    return (
        <div> 
            <ProfileInfo />
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
            <div>
               {post}
            </div>
        </div>
    );
}

export default Profile;