import { del, get, post, put } from './api.js';

const endpoints = {
    getAll: '/data/events?sortBy=_createdOn%20desc',
    getById: '/data/events/',
    create: '/data/events',
    edit: '/data/events/',
    delete: '/data/events/',

};

export async function getAll() {
    return get(endpoints.getAll);
}


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


