import React from 'react';
import css from './users.module.css';
import * as axios from 'axios';

let Users = (props) => {

    console.log(props.users.length);

    if(props.users.length === 0) {
        axios
            .get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                props.setUsers(response.data.items);      
            })
    }

    // if(props.users.length === 0) {
    //     props.setUsers([
    //         {id: 1, photoUrl: 'images/UserPhoto.jpg', followed: true, fullName: 'Vadim', status: 'I am a boss', location: {city: 'SPb', country: 'Russia'} },
    //         {id: 2, photoUrl: 'images/UserPhoto.jpg', followed: false, fullName: 'Sergey', status: 'I am a driver', location: {city: 'Moscow', country: 'Russia'} },
    //         {id: 3, photoUrl: 'images/UserPhoto.jpg', followed: false, fullName: 'Nikolas', status: 'Hello!', location: {city: 'LA', country: 'USA'} }
    //     ])
    // };

    return <div>
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
                            <div>{'u.fullName'}</div>
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