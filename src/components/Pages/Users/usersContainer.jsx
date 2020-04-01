import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, setCurrentPage, toggleFollowingProgress } from '../../Redux/usersReducer';
import { requestUsers, loadMoreUsers, followUser, unfollowUser } from '../../Redux/usersReducer';
import Users from './Users';
import Preloader from './../../common/preloader/preloader';
import withAuthRedirect from '../../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from './../../Redux/usersSelectors';


class UsersContainer extends React.Component {
    //////////////////////////// методы жизненного цикла
    // Компонент монтируется
    componentDidMount() {

        let {currentPage, pageSize} = this.props;
        this.props.requestUsers(currentPage, pageSize);
        
    }
    // Компонент размонтируется
    componentWillUnmount() {
        this.props.setCurrentPage(1);
    }
/////////////////////////////////////////////////////////
    
    loadMoreUsers  = (page) => {
        let {pageSize} = this.props;
        this.props.loadMoreUsers(page, pageSize);
       
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
                        isFetching={this.props.isFetching}
                        followUser={this.props.followUser}
                        unfollowUser={this.props.unfollowUser}
                />}   

            </div>)
    }
}


//////////////////////////////// react-redux
// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }



// getUsers(state) и остальные - это селекторы

let mapStateToProps = (state) => {
    return {
        // users: getUsers(state),
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}


// Как бы оборачиваем компонент UsersContainer в connect, а потом в withAuthRedirect
//withAuthRedirect для того, чтобы страница редиректилась на логин, если не залогинен
export default compose (
    withAuthRedirect,
    connect(
        mapStateToProps,
        {follow,
        unfollow,
        setCurrentPage,
        toggleFollowingProgress,
        requestUsers,
        loadMoreUsers,
        followUser,
        unfollowUser})
)(UsersContainer)