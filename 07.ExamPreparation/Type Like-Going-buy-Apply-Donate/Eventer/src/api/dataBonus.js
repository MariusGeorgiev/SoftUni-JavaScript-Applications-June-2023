import { get, post } from "./api.js";

// like: '/data/likes',
// going: '/data/going',
// totalLikes: (eventsId) => `/data/likes?where=factId%3D%22${eventsId}%22&distinct=_ownerId&count`,
// totalGoing: (eventId) => `/data/going?where=eventId%3D%22${eventId}%22&distinct=_ownerId&count`,
// hasLiked: (eventsId, userId) => `/data/likes?where=factId%3D%22${eventsId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
// usersHasGoing: (eventId, userId) => `/data/going?where=eventId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
// searchItem: (query) => `/data/fruits?where=name%20LIKE%20%22${query}%22`,



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


// export async function search(query) {
//     return get(endpoints.searchItem(query));
// }
