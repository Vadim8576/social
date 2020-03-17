import React from 'react';
import css from './users.module.css';
import { NavLink } from 'react-router-dom';
import Preloader from './../../common/preloader/preloader';
import { usersAPI } from './../../../api/api';

let Users = (props) => {

    let follow = (id) => {
        props.toggleFollowingProgress(true, id);
        usersAPI.followUser(id)
            .then(data => {
                // Если сервер не выдал ошибки, меняем state (подписываемся)
                if(data.resultCode === 0) {
                    props.follow(id);
                }
                props.toggleFollowingProgress(false, id);
            });
    }
   
    let unfollow = (id) => {
        props.toggleFollowingProgress(true, id);
        usersAPI.unfollowUser(id)
        .then(data => {
            // Если сервер не выдал ошибки, меняем state (подписываемся)
            if(data.resultCode === 0) {
                props.unfollow(id);
            }
            props.toggleFollowingProgress(false, id);
        });
    }

    return <div className={css.usersWrapper}>
                <div className={css.totalUsersCount}>
                    Пользователей: {props.users.length} ({props.totalUsersCount})
                 </div>
                {props.users.map(u =>
                <div key={u.id} className={css.usersItem}>
                    <div className={css.users}>
                        <NavLink to={'/profile/'+u.id}>
                            <img src={u.photos.small != null ? u.photos.small: 'images/UserPhoto.jpg'} className={css.avatar} alt='' />
                        </NavLink>        
                        <span>{u.name}</span>
                    </div>
                    <div className={css.follow}>
                        {/* изучить метод some */}
                        {u.followed
                        ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={ () => unfollow(u.id)}>Отписаться</button>
                        : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={ () => follow(u.id) }>Подписаться</button>}
                    </div>
                </div>)}  
                {
                    (props.currentPage * props.pageSize) < props.totalUsersCount && (
                        <div className={css.loadMoreBtnWrapper}>             
                            {props.isFetching ? <Preloader /> :
                            <button onClick={(e) => {
                                let nextPage = props.currentPage+1;
                                props.loadMoreUsers(nextPage);
                                }}>Еще...</button>}
                        </div>)
                }
            </div>
}

export default Users;