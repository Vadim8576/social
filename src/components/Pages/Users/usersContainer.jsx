import Users from './Users';
import { connect } from 'react-redux';
import {followAC, unfollowAC, setUsersAC, setCurrentPageAC, setTotalUsersCountAC} from '../../Redux/usersReducer';



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
const usersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);
/////////////////////////////////////

export default usersContainer;