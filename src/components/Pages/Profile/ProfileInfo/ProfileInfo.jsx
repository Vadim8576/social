import React from 'react';
import Preloader from '../../../common/preloader/preloader';
import css from './profileInfo.module.css';



const ProfileInfo = (props) => {
    // console.log(props.profile);
    if(!props.profile) {
        return <Preloader />
    } 

    return (
        <div> 
            {props.profile.photos.small && <div><img src={props.profile.photos.small} alt="profile-photo"/></div>}
            {props.profile.aboutMe && <div><p className={css.status}>Статус: {props.profile.aboutMe}</p></div>}
            
            <p>Мои контакты:</p>
            {props.profile.contacts && 
                Object.keys(props.profile.contacts)
                    .map(items => <div>{items}: {props.profile.contacts[items]}</div>)}
        </div>
    );
}

export default ProfileInfo;