import React from 'react';
import {reduxForm, Field} from 'redux-form';
import { Input } from '../common/formsControls/formsControls';
import { requiredField, maxLengthCreator } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login } from '../Redux/authReducer';
import { Redirect } from 'react-router-dom';
import css from './login.module.css';

const maxLength10 = maxLengthCreator(30);




// Можно использовать деструктуризаию {handleSubmit, error},
// чтобы постоянно не писать props.handleSubmit и props.error
const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    // debugger;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={'email'} name={'email'} component={Input}
                    validate={[requiredField, maxLength10]} />
            </div>
            <div>
                <Field placeholder={'Password'} name={'Password'} type={'password'} component={Input}
                    validate={[requiredField, maxLength10]} />
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={'input'} /> remember me
            </div>

            {captchaUrl && <img src={captchaUrl} alt='captcha' />}
            {captchaUrl && <Field placeholder={'Ввседите символы с картинки'} name={'captcha'} validate={[requiredField]} component={Input} />}

            {error &&
                <div className={css.formError}>
                    {error}
                </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )

}


// { form: 'login' } это уникальное имя формы, так как форм может быть много
const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = (props) => {

    // Необходимо передать эту функцию в HOC
    const onSubmit = (formData) => {
        console.log(formData);
        
        props.login(formData.email, formData.Password, formData.rememberMe, formData.captcha);
    }
     
    if(props.isAuth) {
        return <Redirect to={'/profile'} />
    }

    return (
        <div className={'login'}>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        </div>
    )
}


const mapStateToProps = (state) => (
    {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
    
)

// Коннектом прокидываем null и Login в компонент Login
export default connect(mapStateToProps, {login})(Login);