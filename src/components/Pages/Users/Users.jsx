import React from 'react';
import css from './users.module.css';
import { NavLink } from 'react-router-dom';


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
                                    <NavLink to={'/profile/'+u.id}>       
                                        <img src={u.photos.small != null ? u.photos.small: 'images/UserPhoto.jpg'} className={css.avatar} />
                                    </NavLink>
                                </div>
                                <div>{u.name}</div>
                                <div>
                                    {u.followed ?
                                    <button onClick={ () => props.unfollow(u.id) }>Из друзей</button>:
                                    <button onClick={ () => props.follow(u.id) }>В друзья</button>}      
                                </div>
                            </span>
                        </div>)
                }   
                </div>
}

export default Users;