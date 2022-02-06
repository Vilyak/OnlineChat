import {createAction, createAsyncAction} from "typesafe-actions";
import {ClientAuthData, JoinRoomResponse, MessageData, ModalChange, ResponseStatusData, RoomData, UserAuthResponse, UserData, UserRoomData, UserRoomPair} from "./types";

export const auth = createAsyncAction(
    'CHAT/AUTH_REQUEST',
    'CHAT/AUTH_SUCCESS',
    'CHAT/AUTH_FAILURE',
)<ClientAuthData, UserAuthResponse & UserData, boolean>();

export const signUp = createAsyncAction(
    'CHAT/SIGN_UP_REQUEST',
    'CHAT/SIGN_UP_SUCCESS',
    'CHAT/SIGN_UP_FAILURE',
)<ClientAuthData, UserAuthResponse & UserData, boolean>();

export const fetchRooms = createAsyncAction(
    'CHAT/FETCH_ROOMS_REQUEST',
    'CHAT/FETCH_ROOMS_SUCCESS',
    'CHAT/FETCH_ROOMS_FAILURE',
)<void, Array<RoomData>, string>();

export const deleteRoom = createAsyncAction(
    'CHAT/DELETE_ROOM_REQUEST',
    'CHAT/DELETE_ROOM_SUCCESS',
    'CHAT/DELETE_ROOM_FAILURE',
)<UserRoomPair, ResponseStatusData, boolean>();

export const createRoom = createAsyncAction(
    'CHAT/ADD_ROOM_REQUEST',
    'CHAT/ADD_ROOM_SUCCESS',
    'CHAT/ADD_ROOM_FAILURE',
)<UserRoomData, JoinRoomResponse, boolean>();

export const joinToRoom = createAsyncAction(
    'CHAT/JOIN_REQUEST',
    'CHAT/JOIN_SUCCESS',
    'CHAT/JOIN_FAILURE',
)<UserRoomPair, JoinRoomResponse, boolean>();

export const setLoginDialogState = createAction('CHAT/SET_LOGIN_DIALOG_STATE')<boolean>();

export const setModalState = createAction('CHAT/SET_MODAL_STATE')<ModalChange>();

export const addLocalMessage = createAction('CHAT/ADD_LOCAL_MESSAGE')<MessageData>();