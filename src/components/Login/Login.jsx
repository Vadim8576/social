import React from 'react';
import {reduxForm, Field} from 'redux-form';
import { Input } from '../common/formsControls/formsControls';
import { requiredField, maxLengthCreator } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login } from '../Redux/authReducer';
import { Redirect } from 'react-router-dom';
import css from './login.module.css';

const maxLength10 = maxLengthCreator(30);

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {/* <input placeholder={'Login'} /> */}
                {/* Вместо input используем Field - Это типа контейнерный компонент */}
                <Field placeholder={'email'} name={'email'} component={Input}
                    validate={[requiredField, maxLength10]} />
                
            </div>
            <div>
                {/* <input placeholder={'Password'} /> */}
                <Field placeholder={'Password'} name={'Password'} type={'password'} component={Input}
                    validate={[requiredField, maxLength10]} />
            </div>
            <div>
                {/* <input type={'checkbox'} /> remember me */}
                <Field type={'checkbox'} name={'rememberMe'} component={'input'} /> remember me
            </div>
            {props.error &&
                <div className={css.formError}>
                    {props.error}
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
        
        props.login(formData.email, formData.Password, formData.rememberMe);
    }
     
    if(props.isAuth) {
        return <Redirect to={'/profile'} />
    }

    return (
        <div className={'login'}>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}


const mapStateToProps = (state) => (
    {
        isAuth: state.auth.isAuth
    }
    
)

// Коннектом прокидываем null и Login в компонент Login
export default connect(mapStateToProps, {login})(Login);