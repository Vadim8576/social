import { createSelector} from 'reselect';


// если селекторы примитивные
// (типа возвращают только state.usersPage.users, без сложной логики),
// createSelector использовать не надо.
// Только если селектор выполняет сложную логику.
// filter используется для примера.

const getUsersSelector = (state) => {
    return state.usersPage.users;
}

// users - зависимость.
// users.filter(u => true) будет вызываться только тогда, когда ей передадуться новые users
// соответственно, будет минимум перерисовок
export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(u => true); // возвращает всех users, как будто без filter
});



export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress;
}