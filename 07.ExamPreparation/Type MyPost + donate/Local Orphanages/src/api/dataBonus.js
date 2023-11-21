import { get, post } from "./api.js";

export async function bonusAllById(postId) {
    return await post(`/data/donations`, postId);
}

export async function bonusSingleTotalById(postId) {
    return await get(`/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`);
}


export async function bonusByUserId(postId, userId){
    return await get(`/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

export async function search(query) {
    return await get(`/data/fruits?where=name%20LIKE%20%22${query}%22`);
}


export async function getMyPosts(userId) {
    return await get(`/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}



