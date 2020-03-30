import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, setCurrentPage, toggleFollowingProgress } from '../../Redux/usersReducer';
import { getUsers, loadMoreUsers, followUser, unfollowUser } from '../../Redux/usersReducer';
import Users from './Users';
import Preloader from './../../common/preloader/preloader';
import withAuthRedirect from '../../../hoc/withAuthRedirect';
import { compose } from 'redux';


class UsersContainer extends React.Component {
    //////////////////////////// методы жизненного цикла
    componentDidMount() {
        
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
        
    }
/////////////////////////////////////////////////////////
    
    loadMoreUsers  = (page) => {

        this.props.loadMoreUsers(page, this.props.pageSize);
       
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
// export default withAuthRedirect(connect(
//     mapStateToProps,
//     {follow,
//     unfollow,
//     setCurrentPage,
//     toggleFollowingProgress,
//     getUsers,
//     loadMoreUsers,
//     followUser,
//     unfollowUser
//     })(UsersContainer));
/////////////////////////////////////




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
        getUsers,
        loadMoreUsers,
        followUser,
        unfollowUser})
)(UsersContainer)