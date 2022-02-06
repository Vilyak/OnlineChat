export interface ClientAuthData {
    login: string;
    password: string;
}

export interface MessageData {
    userId: number;
    roomId: number;
    message: string;
    login: string;
}

export interface RoomData {
    id: number;
    name: string;
    ownerId: number;
}

export interface UserData {
    id: string;
    login: string;
    password: string;
    currentRoomId: number;
}

export interface Message {
    localId: number;
    userId: number;
    roomId: string;
    message: string;
}