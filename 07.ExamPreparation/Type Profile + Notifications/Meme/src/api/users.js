import { clearUserData, setUserData } from '../util.js';
import { get, post, put, del } from './api.js';


const urlEndpoints = {
    login: "/users/login",
    register: "/users/register",
    logout: "/users/logout"
};

export async function login(email, password) {
    const user = await post(urlEndpoints.login, { email, password });
    setUserData(user);
}

export async function register(email, password) {
    const user = await post(urlEndpoints.register, {email, password});
    setUserData(user);
}

export async function logout() {
    await get(urlEndpoints.logout);
    clearUserData();
}
