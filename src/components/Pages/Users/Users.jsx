import React from 'react';
import css from './users.module.css';
import { NavLink } from 'react-router-dom';
import Preloader from './../../common/preloader/preloader';


let Users = (props) => {

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
                        ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={ () => props.unfollowUser(u.id)}>Отписаться</button>
                        : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={ () => props.followUser(u.id)}>Подписаться</button>}
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