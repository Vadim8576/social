import React from 'react';
import css from './users.module.css';
import * as axios from 'axios';


class Users extends React.Component {

    //////////////////////////// методы жизненного цикла
    componentDidMount() {
        //Запрос на сервер произойдет при создании классовой компоненты один раз.
       // все SIDE ЭФФЕКТЫ делаются здесь
        axios
        .get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
        .then(response => {
            this.props.setUsers(response.data.items);   
            this.props.setTotalUsersCount(response.data.totalCount);
        })
    }

    componentDidUpdate() {

    }

    /////////////////////////////////////////////////////////

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios
        .get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
        .then(response => {
            this.props.setUsers(response.data.items);
        })
    }

    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize); // округляем в большую сторону

        let pages = [];
        for(let i=1; i<=pagesCount; i++){
            pages.push(i);
        }


        return <div>
            <div>
                {pages.map(p => {
                   return (
                        <span className={this.props.currentPage === p ?
                            css.selectedPage:
                            css.noSelectedPage}
                            onClick={(e) => this.onPageChanged(p)}>{p}
                        </span>
                   )
                })}
                
                
            </div>
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
}

export default Users;