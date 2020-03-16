import React from 'react';
import css from './users.module.css';
import { NavLink } from 'react-router-dom';


let Users = (props) => {
    // debugger;

    
    // let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize); // округляем в большую сторону

    // let pages = [];
    // for(let i=1; i<=pagesCount; i++){
    //     pages.push(i);
    // }

   
 
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
                        {u.followed ?
                        <button onClick={ () => props.unfollow(u.id) }>Из друзей</button>:
                        <button onClick={ () => props.follow(u.id) }>В друзья</button>}      
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