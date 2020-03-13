import React from 'react';
import css from './users.module.css';
import * as axios from 'axios';


class Users extends React.Component {

    constructor(props){
        super(props);

       //Запрос на сервер произойдет при создании классовой компоненты один раз.
       axios
            .get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                this.props.setUsers(response.data.items);      
        })
    }

    render() {
        return <div>
        {
            this.props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photos.small != null ? u.photos.small: 'images/UserPhoto.jpg'} className={css.avatar} />
                        </div>
                        <div>
                            {u.followed ?
                            <button onClick={ () => this.props.unfollow(u.id) }>Убрать из друзей</button>:
                            <button onClick={ () => this.props.follow(u.id) }>Добавить в друзья</button>}      
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
}

export default Users;