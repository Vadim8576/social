import { usersAPI } from './../../api/api';


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
                users: state.users.map(u => {
                    if(u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if(u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
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
export const requestUsers = (currentPage, pageSize) => {
    return (dispatch) => {

        dispatch(toggleIsFetching(true));
    
        usersAPI.getUsers(currentPage, pageSize)
            .then(data => {
                dispatch(toggleIsFetching(false));
                dispatch(setUsers(data.items));   
                dispatch(setTotalUsersCount(data.totalCount));
            });
    }
}

export const loadMoreUsers = (page, pageSize) => {
    return (dispatch) => {
       
        dispatch(setCurrentPage(page));
        dispatch(toggleIsFetching(true));

        usersAPI.getUsers(page, pageSize)
        .then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(loadMore(data.items));
        })
    }
}

export const followUser = (id) => {
    return (dispatch) => {
       
        dispatch(toggleFollowingProgress(true, id));
        
        usersAPI.followToUser(id)
            .then(data => {
                // Если сервер не выдал ошибки, меняем state (подписываемся)
                if(data.resultCode === 0) {
                    dispatch(follow(id));
                }
                dispatch(toggleFollowingProgress(false, id));
            });
    }
}


export const unfollowUser = (id) => {
    return (dispatch) => {
       
        dispatch(toggleFollowingProgress(true, id));
        
        usersAPI.unfollowToUser(id)
        .then(data => {
            // Если сервер не выдал ошибки, меняем state (подписываемся)
            if(data.resultCode === 0) {
                dispatch(unfollow(id));
            }
            dispatch(toggleFollowingProgress(false, id));
        });
    }
}


export default userReducer;