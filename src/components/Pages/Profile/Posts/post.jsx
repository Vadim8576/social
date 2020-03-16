import React from 'react';
import css from './post.module.css';
import Preloader from '../../../common/preloader/preloader';
import UserNoFoto from '../../../img/UserPhoto.jpg';


const Post = (props) => {
    // debugger;
    // if(props.profile.photos) console.log(props.profile.photos);
    if(!props.profile) {
        return <Preloader />
    } 
    return (  
    <div className={css.item}>
        {/* <img src={logo} className={css.logo} alt=''/> */}
        {props.profile.photos && <img src={props.profile.photos.small || UserNoFoto} alt="profile-photo"/>}
        <span>{props.message}</span>
        <span className={css.likes}>likes {props.likesCount}</span>
    </div>
    );
}

export default Post;