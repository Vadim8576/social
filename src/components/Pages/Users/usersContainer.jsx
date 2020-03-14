import React from 'react';
import { connect } from 'react-redux';
import {follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching} from '../../Redux/usersReducer';
import * as axios from 'axios';
import Users from './Users';
import Preloader from './../../common/preloader/preloader';


class UsersContainer extends React.Component {

    //////////////////////////// методы жизненного цикла
    componentDidMount() {
        this.props.toggleIsFetching(true);
        //Запрос на сервер произойдет при создании классовой компоненты один раз.
       // все SIDE ЭФФЕКТЫ делаются здесь
        axios
        .get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
        .then(response => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(response.data.items);   
            this.props.setTotalUsersCount(response.data.totalCount);
        })
        
    }

    
    /////////////////////////////////////////////////////////

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);
        axios
        .get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
        .then(response => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(response.data.items);
        })
        
    }

    render() {
       
        return (
            <div>      
                {this.props.isFetching ? <Preloader />:
                <Users totalUsersCount={this.props.totalUsersCount}
                        pageSize={this.props.pageSize}
                        currentPage={this.props.currentPage}
                        onPageChanged={this.onPageChanged}
                        users={this.props.users}
                        follow={this.props.follow}
                        unfollow={this.props.unfollow}
                />}
                    
            </div>)
    }
}



//////////////////////////////// react-redux
let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}


export default connect(
    mapStateToProps,
    {follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching
    })(UsersContainer);
/////////////////////////////////////
