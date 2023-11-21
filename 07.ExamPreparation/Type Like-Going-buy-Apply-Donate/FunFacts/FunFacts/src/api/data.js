import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    getAll: '/data/facts?sortBy=_createdOn%20desc',
    getById: '/data/facts/',
    create: '/data/facts',
    edit: '/data/facts/',
    delete: '/data/facts/',
    like: '/data/likes',
    totalLikes: (factId) => `/data/likes?where=factId%3D%22${factId}%22&distinct=_ownerId&count`,
    hasLiked: (factId, userId) => `/data/likes?where=factId%3D%22${factId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export async function getAllFacts() {
    return api.get(`http://localhost:3030/data/facts?sortBy=_createdOn%20desc`);
}

// export async function getMyTheaters(id) {
//     return api.get(endpoints.getMyTheaters(id));
// }

export async function getFactById(id) {
    return api.get(`http://localhost:3030/data/facts/${id}`);
}

export async function createFact(fact) {
    return api.post(`http://localhost:3030/data/facts`, fact);
}

export async function editFactById(id, fact) {
    return api.put(`http://localhost:3030/data/facts/${id}`, fact);
}

export async function deleteFactById(id) {
    return api.del(`http://localhost:3030/data/facts/${id}`);
}

export async function likeFactById(factId) {
    return api.post(endpoints.like, { factId });
}

export async function getAllLikesByFactId(factId) {
    return api.get(endpoints.totalLikes(factId));
}

export async function getAllLikesByFactIdAndUserId(factId, userId) {
    return api.get(endpoints.hasLiked(factId, userId));
}