import {Actions, ChatState, ModalType} from "./types";
import {Reducer} from "redux";
import {getType} from "typesafe-actions";
import { addLocalMessage, auth, createRoom, fetchRooms, joinToRoom, setLoginDialogState, setModalState, signUp } from "./actions";

const initialState: ChatState = {
    users: [],
    rooms: [],
    messages: [],
    createRoomError: false,
    deleteRoomError: false,
    joinToRoomError: false,
    signUpError: false,
    authError: false,
    loginDialogState: false,
    modalType: ModalType.None,
    currentRoomId: -1,
}

export const ChatReducer: Reducer<ChatState, Actions> = (state = initialState, action) => {
    switch (action.type) {
        case getType(auth.failure):
        case getType(signUp.failure):
            return {...state, authError: action.payload};

        case getType(auth.success):
        case getType(signUp.success):
            return {...state, userData: action.payload};

        case getType(fetchRooms.success):
            return {...state, rooms: action.payload};

        case getType(createRoom.success):
        case getType(joinToRoom.success):
            return {...state, users: action.payload.data, currentRoomId: action.payload.id, messages: action.payload.messages};

        case getType(setModalState):    
            return {...state, modalType: action.payload.modalType, modalParams: action.payload.params};

        case getType(setLoginDialogState):
            return {...state, loginDialogState: action.payload};

        case getType(addLocalMessage):
            return {...state, messages: [...state.messages, action.payload]};
            
        default:
            return state;
    }
}