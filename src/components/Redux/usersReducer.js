const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';


let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1
};

const userReducer = (state = initialState, action) => {
// изменяем только копию объекта state
// оператор ... как бы развертывает объект state и делает его копию
    switch(action.type) {
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
                // которые пришли с сервера
                return {
                    ...state, users: action.users
                }
            case SET_CURRENT_PAGE:
                return {
                    ...state, currentPage: action.currentPage
                }
            case SET_TOTAL_USERS_COUNT:
                return {
                    ...state, totalUsersCount: action.totalCount
                }
        default:
        return state;
    }
}


//ActoinCreators:

export const followAC = (userId) => ( {type: FOLLOW, userId} );
export const unfollowAC = (userId) => ( {type: UNFOLLOW, userId} );
export const setUsersAC = (users) => ( {type: SET_USERS, users} );
export const setCurrentPageAC = (currentPage) => ( {type: SET_CURRENT_PAGE, currentPage} );
export const setTotalUsersCountAC = (totalCount) => ( {type: SET_TOTAL_USERS_COUNT, totalCount} );

export default userReducer;