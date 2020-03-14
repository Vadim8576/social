import React from 'react';
import { connect } from 'react-redux';
import {followAC, unfollowAC, setUsersAC, setCurrentPageAC, setTotalUsersCountAC} from '../../Redux/usersReducer';
import * as axios from 'axios';
import Users from './Users';

class UsersContainer extends React.Component {

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
        return <Users totalUsersCount={this.props.totalUsersCount}
                        pageSize={this.props.pageSize}
                        currentPage={this.props.currentPage}
                        onPageChanged={this.onPageChanged}
                        users={this.props.users}
                        follow={this.props.follow}
                        unfollow={this.props.unfollow}

        />
    }
}



//////////////////////////////// react-redux
let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setTotalUsersCountAC(totalCount))
        }
    }
}

// Своими словами:
// connect передает props и dispatch в компоненту Users
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
/////////////////////////////////////

// export default usersContainer;