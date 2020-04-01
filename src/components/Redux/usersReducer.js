import { usersAPI } from './../../api/api';
import { updateObjectInArray } from '../../utils/objectHelper';


const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';
const LOAD_MORE = 'LOAD_MORE';


// isFetching - идет загрузка?
// followingInProgress - идет процесс подписки на пользователя.
// если да - прячем кнопку "подписаться"
let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
};

// isFetching -  получение данных. Показывать крутилку или нет (Preloader)
// followingInProgress - идет процесс подписки или нет Boolean

const userReducer = (state = initialState, action) => {
// изменяем только копию объекта state
// оператор ... как бы развертывает объект state и делает его копию
    switch(action.type) {
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isProgress
                ? [...state.followingInProgress, action.userId]
                : state.followingInProgress.filter(id => id !== action.userId)
            };
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
                // users: state.users.map(u => {
                //     if(u.id === action.userId) {
                //         return {...u, followed: true}
                //     }
                //     return u;
                // })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
                // users: state.users.map(u => {
                //     if(u.id === action.userId) {
                //         return {...u, followed: false}
                //     }
                //     return u;
                // })
            };
            case SET_USERS:
                // в копии state.users добавляем всех action.users,
                // которые пришли с сервера\
                return {
                    ...state, users: action.users
                };
            case LOAD_MORE:
                return {
                    ...state,
                    users: [
                        ...state.users, ...action.users
                    ] 
                };
            case SET_CURRENT_PAGE:
                return {
                    ...state, currentPage: action.currentPage
                };
            case SET_TOTAL_USERS_COUNT:
                return {
                    ...state, totalUsersCount: action.totalCount
                };
            case TOGGLE_IS_FETCHING:
                
                return {
                    ...state, isFetching: action.isFetching
                };
        default:
        return state;
    }
}


//ActoinCreators:

export const follow = (userId) => ( {type: FOLLOW, userId} );
export const unfollow = (userId) => ( {type: UNFOLLOW, userId} );
export const setUsers = (users) => ( {type: SET_USERS, users} );
export const setCurrentPage = (currentPage) => ( {type: SET_CURRENT_PAGE, currentPage} );
export const setTotalUsersCount = (totalCount) => ( {type: SET_TOTAL_USERS_COUNT, totalCount} );
export const toggleIsFetching = (isFetching) => ( {type: TOGGLE_IS_FETCHING, isFetching} );
export const loadMore = (users) => ( {type: LOAD_MORE, users} );
export const toggleFollowingProgress = (isProgress, userId) => ( {type: TOGGLE_IS_FOLLOWING_PROGRESS, isProgress, userId} );



// Thunk - Санк (санка)
// В Санки диспатчим Action Creators
// UI вызываем getUsers, чтобы создать САНКУ
export const requestUsers = (currentPage, pageSize) => async (dispatch) => {

    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(1));

    let response = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(toggleIsFetching(false));
    dispatch(setUsers(response.items));   
    dispatch(setTotalUsersCount(response.totalCount));
}

export const loadMoreUsers = (page, pageSize) => {
    return async (dispatch) => {
       
        dispatch(setCurrentPage(page));
        dispatch(toggleIsFetching(true));

        let response = await usersAPI.getUsers(page, pageSize);

        dispatch(toggleIsFetching(false));
        dispatch(loadMore(response.items));
    }
}

export const followUser = (id) => {
    return async (dispatch) => {
       
        dispatch(toggleFollowingProgress(true, id));
        
        let response = await usersAPI.followToUser(id);

        // Если сервер не выдал ошибки, меняем state (подписываемся)
        if(response.resultCode === 0) {
            dispatch(follow(id));
        }
        dispatch(toggleFollowingProgress(false, id));

    }
}


export const unfollowUser = (id) => {
    return async (dispatch) => {
       
        dispatch(toggleFollowingProgress(true, id));
        
        let response = await usersAPI.unfollowToUser(id)
        
        // Если сервер не выдал ошибки, меняем state (подписываемся)
        if(response.resultCode === 0) {
            dispatch(unfollow(id));
        }
        dispatch(toggleFollowingProgress(false, id));
 
    }
}


export default userReducer;