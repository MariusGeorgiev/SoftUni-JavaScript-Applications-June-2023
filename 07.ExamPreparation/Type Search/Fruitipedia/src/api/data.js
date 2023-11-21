import { del, get, post, put } from './api.js';

const endpoints = {
    getAll: '/data/fruits?sortBy=_createdOn%20desc',
    getById: '/data/fruits/',
    create: '/data/fruits',
    edit: '/data/fruits/',
    delete: '/data/fruits/',
    like: '/data/likes',
    totalLikes: (fruitsId) => `/data/likes?where=factId%3D%22${fruitsId}%22&distinct=_ownerId&count`,
    hasLiked: (fruitsId, userId) => `/data/likes?where=factId%3D%22${fruitsId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
    searchItem: (query) => `/data/fruits?where=name%20LIKE%20%22${query}%22`,
};

export async function getAll() {
    return get(endpoints.getAll);
}

// export async function getMyTheaters(id) {
//     return get(endpoints.getMyTheaters(id));
// }

export async function getById(id) {
    return get(endpoints.getById + id);
}

export async function create(data) {
    return post(endpoints.create, data);
}

export async function edit(id, data) {
    return put(endpoints.edit + id, data);
}

export async function deleteItem(id) {
    return del(endpoints.delete + id);
}

export async function like(fruitsId) {
    return post(endpoints.like, { fruitsId });
}

export async function getTotalLikes(fruitsId) {
    return get(endpoints.totalLikes(fruitsId));
}

export async function userHasLiked(fruitsId, userId) {
    return get(endpoints.hasLiked(fruitsId, userId));
}

export async function search(query) {
    return get(endpoints.searchItem(query));
}
