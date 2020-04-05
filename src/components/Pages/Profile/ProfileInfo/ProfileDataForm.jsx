import React from 'react';
import { Textarea, Input, CheckBox } from './../../../common/formsControls/formsControls';
import { Field, reduxForm } from 'redux-form';
import css from './../../../Login/login.module.css';


const ProfileDataForm = ({profile, handleSubmit, error}) => {


    return  <form onSubmit={handleSubmit}>
       <div><button>Save</button></div>

        {error && <div className={css.formError}>
            {error}
        </div>}
       
       <div>
           Full name:
           <Field placeholder={'Введите новое имя'} name={'fullName'} component={Input} />
       </div>
       <div>
            About me: <Field name={'aboutMe'} component={Textarea} />
        </div>

        <div>
            Looking for a jobs: <Field name={'lookingForAJob'} component={CheckBox} />
        </div>
        
        <div>
            My professional skils: {profile.lookingForAJobDescription}
            <Field placeholder={'Введите свои скилы'} name={'lookingForAJobDescription'} component={Textarea} />
        </div>
       
        <p>Мои контакты:</p>
        {profile.contacts && 
            Object.keys(profile.contacts)
                .map(items => <div key={items}>
                    {items}: <Field name={'contacts.' + items} component={Input} />
                </div>)}
    </form>
}


const ProfileDataReduxForm = reduxForm({ form: 'profileFormData' })(ProfileDataForm);

export default ProfileDataReduxForm;