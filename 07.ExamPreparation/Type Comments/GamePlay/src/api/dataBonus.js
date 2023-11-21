import { get, post } from "./api.js";

export async function bonusAllById(eventId) {
    return await post(`/data/going`, eventId);
}

export async function bonusSingleTotalById(eventId) {
    return await get(`/data/going?where=eventId%3D%22${eventId}%22&distinct=_ownerId&count`);
}


export async function bonusByUserId(eventId, userId){
    return await get(`/data/going?where=eventId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

export async function search(query) {
    return await get(`/data/fruits?where=name%20LIKE%20%22${query}%22`);
}



