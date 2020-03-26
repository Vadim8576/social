import React from 'react';
import Post from './Posts/post';
import css from './profile.module.css';
import {reduxForm, Field} from 'redux-form';



const PostForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div className={css.postsWrapper}> 
                <div className={css.addPost}>
                    {/* <textarea
                        onChange={ (e) => {props.updateNewPostText(e.currentTarget.value)} }
                        value={ props.newPostText }
                        placeholder='Введите текст поста' /> */}
                    <Field placeholder={'Введите текст поста'} name={'postText'} component={'textarea'} />
                    <div className={css.addPostBtn}>
                        {/* <button onClick={ () => props.addPost() }>Опубликовать</button> */}
                        <button>Опубликовать</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

// { form: 'postform' } это уникальное имя формы, так как форм может быть много
const PostReduxForm = reduxForm({ form: 'postform' })(PostForm)

const Profile = (props) => {
    // debugger;
    let post = props.posts
        .map((el) =>
        <Post key={el.id} profile={props.profilePage.profile} message={el.message} likesCount={el.likesCount.toString()} />);
    // console.log(props.profile);

    const onSubmit = (formData) => {
        console.log(formData.postText);
        props.addPost(formData.postText);
    }
    return (
        <>
            <PostReduxForm onSubmit={onSubmit} />
            <div className={css.postsWrapper}>
                <div className={css.posts}>
                    {post}
                </div>
            </div>
        </>
    );
}

export default Profile;