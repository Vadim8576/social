import * as axios from 'axios';

// создаем настройки axios
const instanse = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '97448058-f2b7-4bf4-961c-f51a6ff67ab6'
    }
});


export const usersAPI = {

    // Получить всех пользователей
    //{ withCredentials: true} - делаем запрос от авторизованного пользователя

    getUsers(currentPage, pageSize) {
        return instanse
                .get(`users?page=${currentPage}&count=${pageSize}`)
                .then(response => response.data)
    },

    // получить страницу пользователя

    getProfile(userId) {
        return instanse
            .get(`profile/${userId}`)
            .then(response => response.data)
     },
    

    // Подписка на Юзера
    // POST запрос на подписку на пользователя.
    // Только после ответа сервера, что мы подписались, меняем state.

    // в POST запросе настройки передаются ТРЕТЬИМ параметром
    // { withCredentials: true }
    
    followToUser(id) {
        return instanse
                .post(`follow/${id}`)
                .then(response => response.data)       
     },
    
    
    // Отписка от Юзера
    // Для отписки, мы шлем DELETE запрос
    // Настройки передаются ВТОРЫМ параметром { withCredentials: true }
    
    unfollowToUser(id) {
        return instanse
                .delete(`follow/${id}`)
                .then(response => response.data)      
     }

}


export const authAPI = {
    // Запрос на аудентификацию
   
    me() {
        return instanse
                .get(`auth/me`)
                .then(response => response.data)        
     }
}