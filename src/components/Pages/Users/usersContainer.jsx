import React from 'react';
import { connect } from 'react-redux';
import {follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching, loadMore, toggleFollowingProgress} from '../../redux/usersReducer';
import Users from './Users';
import Preloader from './../../common/preloader/preloader';
import { usersAPI } from './../../../api/api';

class UsersContainer extends React.Component {
    //////////////////////////// методы жизненного цикла
    componentDidMount() {
        this.props.toggleIsFetching(true);
        //Запрос на сервер произойдет при создании классовой компоненты один раз.
       // все SIDE ЭФФЕКТЫ делаются здесь

       usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
        .then(data => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(data.items);   
            this.props.setTotalUsersCount(data.totalCount);
        });
    }
/////////////////////////////////////////////////////////
    
loadMoreUsers  = (page) => {
        this.props.setCurrentPage(page);
        this.props.toggleIsFetching(true);
 
        usersAPI.getUsers(page, this.props.pageSize)
        .then(data => {
            this.props.toggleIsFetching(false);
            // this.props.toggleIsFetching(false);
            this.props.loadMore(data.items);
        })
    }


    render() {
        return (
            <div>      
                {(this.props.isFetching && this.props.currentPage < 2) ? <Preloader />:
                <Users totalUsersCount={this.props.totalUsersCount}
                        pageSize={this.props.pageSize}
                        currentPage={this.props.currentPage}
                        users={this.props.users}
                        follow={this.props.follow}
                        unfollow={this.props.unfollow}
                        loadMoreUsers={this.loadMoreUsers}
                        followingInProgress={this.props.followingInProgress}
                        toggleFollowingProgress={this.props.toggleFollowingProgress}
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
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}



// connect создает callback, который задиспатчит то,
// что вернет ActionCreator
export default connect(
    mapStateToProps,
    {follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
    loadMore,
    toggleFollowingProgress
    })(UsersContainer);
/////////////////////////////////////
