import React from 'react';
import css from './users.module.css';
import { NavLink } from 'react-router-dom';
import { usersAPI } from './../../../api/api';

let Users = (props) => {
    // debugger;

    
    // let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize); // округляем в большую сторону

    // let pages = [];
    // for(let i=1; i<=pagesCount; i++){
    //     pages.push(i);
    // }


    let follow = (id) => {
       
        usersAPI.followUser(id)
            .then(data => {
                // Если сервер не выдал ошибки, меняем state (подписываемся)
                if(data.resultCode == 0) {
                    props.follow(id);
                }
            });
    }
   
    let unfollow = (id) => {
        
        usersAPI.unfollowUser(id)
        .then(data => {
            // Если сервер не выдал ошибки, меняем state (подписываемся)
            if(data.resultCode == 0) {
                props.unfollow(id);
            }
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
                            <img src={u.photos.small != null ? u.photos.small: 'images/UserPhoto.jpg'} className={css.avatar} />
                        </NavLink>
                        
                        <span>{u.name}</span>
                    </div>
                    <div className={css.follow}>
                        {/* {u.followed ?
                        <button onClick={ () => props.unfollow(u.id) }>Отписаться</button>:
                        <button onClick={ () => props.follow(u.id) }>Подписаться</button>} */}
                         {u.followed ?
                        <button onClick={ () => unfollow(u.id) }>Отписаться</button>:
                        <button onClick={ () => follow(u.id) }>Подписаться</button>}
                    </div>
                </div>)}  
                {
                    (props.currentPage * props.pageSize) < props.totalUsersCount && (
                        <div className={css.loadMoreBtnWrapper}>
                            {/* {pages.map(p => {
                            return (
                                    <span key={p.id} className={props.currentPage === p ?
                                        css.selectedPage:
                                        css.noSelectedPage}
                                        onClick={(e) => props.onPageChanged(p)}>{p}
                                    </span>
                            )
                            })}              */}
                            
                            <button onClick={(e) => {
                                let nextPage = props.currentPage+1;
                                props.loadMore(nextPage);
                                }}>Еще...</button>
                        </div>)
                }
            </div>
}

export default Users;