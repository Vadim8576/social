import React from 'react';
import Post from './Posts/post';
import css from './profile.module.css';
import {reduxForm, Field} from 'redux-form';
import { requiredField, maxLengthCreator } from '../../../utils/validators/validators';
import { Textarea } from '../../common/formsControls/formsControls';

const maxLength10 = maxLengthCreator(10);

const PostForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div className={css.postsWrapper}> 
                <div className={css.addPost}>
                    <Field placeholder={'Введите текст поста'} name={'postText'} component={Textarea}
                        validate={[requiredField, maxLength10]} />
                    <div className={css.addPostBtn}>
                        <button>Опубликовать</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

// { form: 'postform' } это уникальное имя формы, так как форм может быть много
const PostReduxForm = reduxForm({ form: 'postform' })(PostForm)



// если использовать классовый компонент:
// если использовать PureComponent, оптимизацию вручную делать не нужно
// shouldComponentUpdate (метод жизненного цикла) можно удалить

// для функционального компонента для оптимизации, оборачиваем ее в memo

const Profile = React.memo(props => {

    // опитимизация. Компонент рендерится 1 раз, если без этой функции - 3 раза.
    // shouldComponentUpdate(nextProps, nextState) {
    //     // возвращает true, если props`ы и statы не равны и рендерится
    //     return nextProps != this.props || nextState != this.state;
    // }

  
    console.log('компонент Profile');

    let post = props.posts
        .map((el) =>
        <Post key={el.id} profile={props.profilePage.profile} message={el.message} likesCount={el.likesCount.toString()} />);
    
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

});

export default Profile;