import {put, takeLatest} from 'redux-saga/effects'
import {getType} from "typesafe-actions";
import {auth, createRoom, deleteRoom, fetchRooms, joinToRoom, signUp} from "./actions";
import {authUser, createUserRoom, deleteUserRoom, getAllRooms, joinToUserRoom, signUpUser} from "./api";
import { JoinRoomResponse, ResponseStatusData, RoomData, UserAuthResponse, UserData } from './types';

export function* fetchRoomsHandler() {
    try {
        const rooms: Array<RoomData> = yield getAllRooms();
        yield put(fetchRooms.success(rooms));
    }
    catch (e: any) {
        console.error(e.message);
        yield put(fetchRooms.failure(e.message));
    }
}

export function* authUserHandler(action: any) {
    try {
        const data: UserAuthResponse = yield authUser(action.payload);
        if (data.status === 'OK') {
            const userData: UserData = {
                id: data.userId,
                currentRoomId: -1,
                login: action.payload.login,
                password: action.payload.password,
            };
            yield put(auth.success({...userData, ...data}));
            if (action.payload.onData) {
                action.payload.onData(data.userId);
            }
        }
        else {
            auth.failure(true);
        }
    }
    catch (e: any) {
        console.error(e.message);
        yield put(auth.failure(true));
    }
}

export function* signUpUserHandler(action: any) {
    try {
        const data: UserAuthResponse = yield signUpUser(action.payload);
        if (data.status === 'OK') {
            const userData: UserData = {
                id: data.userId,
                currentRoomId: -1,
                login: action.payload.login,
                password: action.payload.password,
            };
            yield put(signUp.success({...userData, ...data}));
            if (action.payload.onData) {
                action.payload.onData(data.userId);
            }
        }
        else {
            auth.failure(true);
        }
    }
    catch (e: any) {
        console.error(e.message);
        yield put(auth.failure(true));
    }
}

export function* removeRoomHandler(action: any) {
    try {
        const data: ResponseStatusData = yield deleteUserRoom(action.payload);
        yield put(deleteRoom.success(data));
        yield put(fetchRooms.request());
    }
    catch (e: any) {
        console.error(e.message);
        yield put(deleteRoom.failure(true));
    }
}

export function* createRoomHandler(action: any) {
    try {
        const data: JoinRoomResponse = yield createUserRoom(action.payload);
        yield put(createRoom.success(data));
        yield put(fetchRooms.request());
    }
    catch (e: any) {
        console.error(e.message);
        yield put(createRoom.failure(true));
    }
}

export function* joinToRoomHandler(action: any) {
    try {
        const data: JoinRoomResponse = yield joinToUserRoom(action.payload);
        yield put(joinToRoom.success(data));
    }
    catch (e: any) {
        console.error(e.message);
        yield put(joinToRoom.failure(true));
    }
}

export default function* rootSaga() {
    yield takeLatest(getType(auth.request), authUserHandler);
    yield takeLatest(getType(signUp.request), signUpUserHandler);
    yield takeLatest(getType(fetchRooms.request), fetchRoomsHandler);
    yield takeLatest(getType(deleteRoom.request), removeRoomHandler);
    yield takeLatest(getType(createRoom.request), createRoomHandler);
    yield takeLatest(getType(joinToRoom.request), joinToRoomHandler);
}