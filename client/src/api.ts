import ax from "axios";
import {ROOT_URL} from "./config";
import {ClientAuthData, UserAuthResponse, UserRoomData, UserRoomPair} from "./types";
import { AUTH__PUBLIC_URL, CREATE__ROOM_URL, FETCH_ROOMS_URL, JOIN_TO_ROOM_URL, REMOVE__ROOM_URL, SIGN_UP_URL } from "./urls";

export async function getAllRooms() {
    const {data} = await ax.get(`${ROOT_URL}${FETCH_ROOMS_URL}`);
    return data;
}

export async function authUser(params: ClientAuthData) {
    const {data} = await ax.get(`${ROOT_URL}${AUTH__PUBLIC_URL}`, {params});
    return data;
}

export async function signUpUser(params: UserAuthResponse) {
    const {data} = await ax.get(`${ROOT_URL}${SIGN_UP_URL}`, {params});
    return data;
}

export async function deleteUserRoom(params: UserRoomPair) {
    const {data} = await ax.get(`${ROOT_URL}${REMOVE__ROOM_URL}`, {params});
    return data;
}

export async function createUserRoom(params: UserRoomData) {
    const {data} = await ax.get(`${ROOT_URL}${CREATE__ROOM_URL}`, {params});
    return data;
}

export async function joinToUserRoom(params: UserRoomPair) {
    const {data} = await ax.get(`${ROOT_URL}${JOIN_TO_ROOM_URL}`, {params});
    return data;
}