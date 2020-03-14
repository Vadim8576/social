import Users from './Users';
import { connect } from 'react-redux';
import {followAC, unfollowAC, setUsersAC} from '../../Redux/usersReducer';



//////////////////////////////// react-redux
let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users
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
        }
    }
}

// Своими словами:
// connect передает props и dispatch в компоненту Users
const usersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);
/////////////////////////////////////

export default usersContainer;