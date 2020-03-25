import React from 'react';
import css from './profileInfo.module.css';
import Preloader from '../../../common/preloader/preloader';
import UserNoFoto from '../../../img/UserPhoto.jpg';
import ProfileStatus from './ProfileStatus';

const ProfileInfo = (props) => {
    // debugger;
    if(!props.profile) {
        return <Preloader />
    } 

    return (
        <div className={css.profileWrapper}> 
            <div className={css.profilePhotoWrapper}>
                <div className={css.profilePhoto}>
                 {props.profile.photos &&<img src={props.profile.photos.small || UserNoFoto} alt="profile-photo"/>}
                </div>
            </div>

            <div className={css.profileInfo}>
                <div className={css.fullName}><h2>{props.profile.fullName}</h2></div>    

                <ProfileStatus status={"Здесь будет твой статус"} />
             
                {/* {props.profile.aboutMe && <div className={css.status}><span>Статус: {props.profile.aboutMe}</span></div>} */}
              
                Мои контакты:
                {props.profile.contacts && 
                    Object.keys(props.profile.contacts)
                        .map(items => <div>{items}: {props.profile.contacts[items]}</div>)}
            </div>  
        </div>
    );
}

export default ProfileInfo;