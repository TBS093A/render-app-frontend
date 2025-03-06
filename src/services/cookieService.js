import Cookies from 'js-cookie';

const TOKEN_COOKIE_NAME = 'auth_token';
const USER_COOKIE_NAME = 'user_data';

export const cookieService = {
    setToken: (token) => {
        Cookies.set(TOKEN_COOKIE_NAME, token, {
            expires: 7, // 7 dni
            secure: true, // tylko HTTPS
            sameSite: 'strict', // ochrona przed CSRF
            path: '/'
        });
    },

    getToken: () => {
        return Cookies.get(TOKEN_COOKIE_NAME);
    },

    removeToken: () => {
        Cookies.remove(TOKEN_COOKIE_NAME, { path: '/' });
    },

    setUserData: (userData) => {
        Cookies.set(USER_COOKIE_NAME, JSON.stringify(userData), {
            expires: 7,
            secure: true,
            sameSite: 'strict',
            path: '/'
        });
    },

    getUserData: () => {
        const userData = Cookies.get(USER_COOKIE_NAME);
        return userData ? JSON.parse(userData) : null;
    },

    removeUserData: () => {
        Cookies.remove(USER_COOKIE_NAME, { path: '/' });
    },

    clearAll: () => {
        this.removeToken();
        this.removeUserData();
    }
}; 