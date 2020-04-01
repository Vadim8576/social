import React from 'react';
import css from './users.module.css';
import { NavLink } from 'react-router-dom';
import Preloader from './../../common/preloader/preloader';





// Димыч делал Paginator  в 90ом уроке (redux-ducks). Примерно на 45 минуте.
let Users = ({users, totalUsersCount, currentPage, pageSize, ...props}) => {

    return <div className={css.usersWrapper}>
                <div className={css.totalUsersCount}>
                    Пользователей: {users.length} ({totalUsersCount})
                 </div>
                {users.map(u =>
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
                    (currentPage * pageSize) < totalUsersCount && (
                        <div className={css.loadMoreBtnWrapper}>             
                            {props.isFetching ? <Preloader /> :
                            <button onClick={(e) => {
                                let nextPage = currentPage+1;
                                props.loadMoreUsers(nextPage);
                                }}>Еще...</button>}
                        </div>)
                }
            </div>
}

export default Users;