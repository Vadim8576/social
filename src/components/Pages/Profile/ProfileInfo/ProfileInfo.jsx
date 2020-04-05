import React, { useState } from 'react';
import css from './profileInfo.module.css';
import Preloader from '../../../common/preloader/preloader';
import UserNoFoto from '../../../img/UserPhoto.jpg';
import ProfileDataReduxForm from './ProfileDataForm';
// import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = (props) => {
    
    let isOwner=true;
    
    // локальный state
    let [editMode, setEditMode] = useState(false);
    // let [status, setStatus] = useState(props.status);


    if(!props.profile) {
        return <Preloader />
    } 
    console.log(props.profile);


    const onSubmit = (formData) => {
        //thunk`а saveProfile возвращает promise
        // Так делать не совсем правильно архитектурно.
        props.saveProfile(formData).then( () => setEditMode(false) );
    };

    return (
        <div className={css.profileWrapper}> 
            <div className={css.profilePhotoWrapper}>
                <div className={css.profilePhoto}>
                 {props.profile.photos &&<img src={props.profile.photos.small || UserNoFoto} alt="profile-photo"/>}
                </div>
            </div>

            <div className={css.profileInfo}>
                <div className={css.fullName}><h2>{props.profile.fullName}</h2></div>    

               
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />

                {editMode
                    // initialValues={props.profile} - инициализируем текст в форме из props.profile
                    && <ProfileDataReduxForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} />
                    || <ProfileData profile={props.profile} isOwner={isOwner} goToEditMode={() => setEditMode(true)}/>
                }
               
            </div>  
        </div>
    );
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return  <>
        {isOwner && <div><button onClick={goToEditMode}>Edit</button></div>}
        <div>
            About me: {profile.aboutMe}
        </div>
        <div>
            <p>Looking for a jobs: {profile.lookingForAJob ? 'yes' : 'no'}</p>
        </div>
        {profile.lookingForAJob &&
            <div>
                My professional skils: {profile.lookingForAJobDescription}
            </div>
        }
        <p>Мои контакты:</p>
        {profile.contacts && 
            Object.keys(profile.contacts)
                .map(items => <div>{items}: {profile.contacts[items] || 'нет данных' }</div>)}
    </>
}





export default ProfileInfo;