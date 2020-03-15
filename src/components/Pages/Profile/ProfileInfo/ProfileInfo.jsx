import React from 'react';
import Preloader from '../../../common/preloader/preloader';
import css from './profileInfo.module.css';
import UserNoFoto from '../../../img/UserPhoto.jpg';

const ProfileInfo = (props) => {

    if(!props.profile) {
        return <Preloader />
    } 

    return (
        <div> 
           
            {props.profile.photos && <div><img src={props.profile.photos.small || UserNoFoto} className={css.photo} alt="profile-photo"/></div>}
            {props.profile.aboutMe && <div><p className={css.status}>Статус: {props.profile.aboutMe}</p></div>}
            
            <p>Мои контакты:</p>
            {props.profile.contacts && 
                Object.keys(props.profile.contacts)
                    .map(items => <div>{items}: {props.profile.contacts[items]}</div>)}
        </div>
    );
}

export default ProfileInfo;