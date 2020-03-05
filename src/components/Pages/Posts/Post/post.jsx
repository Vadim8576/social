import React from 'react';
import logo from '../../../img/Main_Icon.png';
import css from './post.module.css';

const Post = (props) => {
    return (  
    <div className={css.item}>
        <img src={logo} className={css.logo} alt=''/>
        <span>{props.message}</span>
        <span>likes {props.likesCount}</span>
    </div>
    );
}

export default Post;