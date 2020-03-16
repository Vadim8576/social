const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const LOAD_MORE = 'LOAD_MORE';

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true
};

// isFetching -  получение данных. Показывать крутилку или нет (Preloader)

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

export default userReducer;