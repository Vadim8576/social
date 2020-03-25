import React from 'react';
import {reduxForm, Field} from 'redux-form';



const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {/* <input placeholder={'Login'} /> */}
                {/* Вместо input используем Field - Это типа контейнерный компонент */}
                <Field placeholder={'login'} name={'login'} component={'input'} />
                
            </div>
            <div>
                {/* <input placeholder={'Password'} /> */}
                <Field placeholder={'Password'} name={'Password'} component={'input'} />
            </div>
            <div>
                {/* <input type={'checkbox'} /> remember me */}
                <Field type={'checkbox'} name={'rememberMe'} component={'input'} /> remember me
            </div>
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
    }
     
    return (
        <div className={'login'}>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )

}



export default Login;