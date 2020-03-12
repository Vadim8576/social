import React from 'react';
import css from './users.module.css';

let Users = (props) => {

    if(props.users.length === 0) {
        props.setUsers([
            {id: 1, photoUrl: 'images/UserPhoto.jpg', followed: true, fullName: 'Vadim', status: 'I am a boss', location: {city: 'SPb', country: 'Russia'} },
            {id: 2, photoUrl: 'images/UserPhoto.jpg', followed: false, fullName: 'Sergey', status: 'I am a driver', location: {city: 'Moscow', country: 'Russia'} },
            {id: 3, photoUrl: 'images/UserPhoto.jpg', followed: false, fullName: 'Nikolas', status: 'Hello!', location: {city: 'LA', country: 'USA'} }
        ])
    };

    return <div>
        {
            props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photoUrl} className={css.avatar} />
                        </div>
                        <div>
                            {u.followed ?
                            <button onClick={ () => props.unfollow(u.id) }>Убрать из друзей</button>:
                            <button onClick={ () => props.follow(u.id) }>Добавить в друзья</button>}      
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.fullName}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{u.location.country}</div>
                            <div>{u.location.city}</div>
                        </span>
                    </span>
                </div>)
        }   
    </div>
}

export default Users;