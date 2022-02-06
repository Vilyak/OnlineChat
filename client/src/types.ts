import {ActionType} from "typesafe-actions";
import * as actions from './actions';

export interface ChatState {
    userData?: UserData;
    users: Array<UserData>;
    rooms: Array<RoomData>;
    messages: Array<MessageData>;
    createRoomError: boolean;
    deleteRoomError: boolean;
    joinToRoomError: boolean;
    signUpError: boolean;
    authError: boolean;
    loginDialogState: boolean;
    modalType: ModalType;
    modalParams?: any;
    currentRoomId: number;
}

export interface ModalChange {
    modalType: ModalType;
    params?: any;
}

export enum ModalType {
    None,
    AddChannel,
    RemoveChannel,
}

export interface ClientAuthData {
    login: string;
    password: string;
    onData?: (userId: string) => void;
}

export interface MessageData {
    localId: number;
    userId: number;
    roomId: number;
    login: string;
    message: string;
}

export interface UserData {
    id: number;
    login: string;
    password: string;
    currentRoomId: number;
}

export interface ResponseStatusData {
    status: string;
}

export interface RoomData {
    id: number;
    name: string;
    ownerId: number;
}

export interface UserRoomData {
    name: string;
    userId: number;
}

export interface UserRoomPair {
    userId: number;
    roomId: number;
}

export interface JoinRoomResponse extends ResponseStatusData {
    data: Array<UserData>;
    id: number;
    messages: Array<MessageData>
}

export interface UserAuthResponse extends ResponseStatusData {
    userId: number;
}

export type Actions = ActionType<typeof actions>