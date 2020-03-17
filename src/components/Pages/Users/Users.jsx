import React from 'react';
import css from './users.module.css';
import { NavLink } from 'react-router-dom';
import * as axios from 'axios';


let Users = (props) => {
    // debugger;

    
    // let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize); // округляем в большую сторону

    // let pages = [];
    // for(let i=1; i<=pagesCount; i++){
    //     pages.push(i);
    // }


    let follow = (id) => {
        // POST запрос на подписку на пользователя.
        // Только после ответа сервера, что мы подписались, меняем state.

        // в POST запросе настройки передаются ТРЕТЬИМ параметром
        // { withCredentials: true }
        console.log(id);
        axios
        .post(`https://social-network.samuraijs.com/api/1.0/follow/${id}`,
        {},
        { withCredentials: true, headers: {'API-KEY': '97448058-f2b7-4bf4-961c-f51a6ff67ab6'} })
        .then(response => {
        
            // Если сервер не выдал ошибки, меняем state (подписываемся)
            if(response.data.resultCode == 0) {
                props.follow(id);
            }
        });
    }
   
    let unfollow = (id) => {
        // Для отписки, мы шлем DELETE запрос
        // Настройки передаются ВТОРЫМ параметром { withCredentials: true }
        
        axios
        .delete(`https://social-network.samuraijs.com/api/1.0/follow/${id}`,
        { withCredentials: true, headers: {'API-KEY': '97448058-f2b7-4bf4-961c-f51a6ff67ab6'} })
        .then(response => {
        
            // Если сервер не выдал ошибки, меняем state (подписываемся)
            if(response.data.resultCode == 0) {
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