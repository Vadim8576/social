import React from 'react';
import Post from './Posts/post';
import css from './profile.module.css';


const Profile = (props) => {
    // debugger;
    let post = props.posts
        .map((el) =>
        <Post key={el.id} profile={props.profilePage.profile} message={el.message} likesCount={el.likesCount.toString()} />);
    // console.log(props.profile);
    return (
        <>
            <div className={css.postsWrapper}> 
                <div className={css.addPost}>
                    <textarea
                        onChange={ (e) => {props.updateNewPostText(e.currentTarget.value)} }
                        value={ props.newPostText }
                        placeholder='Введите текст поста' />
                
                    <div className={css.addPostBtn}>
                        <button onClick={ () => props.addPost() }>Опубликовать</button>
                    </div>
                </div>
            </div>
            <div className={css.postsWrapper}>
                <div className={css.posts}>
                    {post}
                </div>
            </div>
        </>
    );
}

export default Profile;