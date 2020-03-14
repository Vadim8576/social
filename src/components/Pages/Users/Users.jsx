import React from 'react';
import css from './users.module.css';


let Users = (props) => {
  
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize); // округляем в большую сторону

    let pages = [];
    for(let i=1; i<=pagesCount; i++){
        pages.push(i);
    }
 
    return <div>
                <div>
                    {pages.map(p => {
                    return (
                            <span key={p.id} className={props.currentPage === p ?
                                css.selectedPage:
                                css.noSelectedPage}
                                onClick={(e) => props.onPageChanged(p)}>{p}
                            </span>
                    )
                    })}             
                </div>
                {
                    props.users.map(u => <div key={u.id}>
                            <span>
                                <div>
                                    <img src={u.photos.small != null ? u.photos.small: 'images/UserPhoto.jpg'} className={css.avatar} />
                                </div>
                                <div>
                                    {u.followed ?
                                    <button onClick={ () => props.unfollow(u.id) }>Убрать из друзей</button>:
                                    <button onClick={ () => props.follow(u.id) }>Добавить в друзья</button>}      
                                </div>
                            </span>
                            <span>
                                <span>
                                    <div>{u.name}</div>
                                    <div>{'u.status'}</div>
                                </span>
                                <span>
                                    <div>{'u.location.country'}</div>
                                    <div>{'u.location.city'}</div>
                                </span>
                            </span>
                        </div>)
                }   
                </div>
}

export default Users;