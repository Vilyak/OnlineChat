import { first } from 'lodash';
import * as mysql from 'mysql2';
import {databaseConfiguration} from "../config";
import { Message, MessageData, RoomData, UserData } from "../types";

let connection = null;

export function connectToDatabase(callback: (message: string) => void) {
    connection = mysql.createPool({...databaseConfiguration, connectionLimit : 10});
    callback("Connected to DB!");
}

export function getAllRooms(callback: (data: Array<RoomData>) => void) {
    connection.query('SELECT * FROM rooms', function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
}

export function createRoom(name: string, userId: string, callback: (data: any) => void) {
    connection.query(`INSERT INTO rooms (name, ownerId) VALUES ('${name}', '${userId}')`, function (error) {
        if (error) throw error;

        connection.query('SELECT id FROM rooms WHERE ownerId = ' + userId, function (error, results, fields) {
            if (error) throw error;
            const room: {id: number} = first(results);
            if (room) {
                joinToRoom(userId, room.id.toString(), callback);
            }
            else console.log('Room is not exist!');
        });
    });
}

export function joinToRoom(userId: string, roomId: string, callback: (data: any) => void) {
    connection.query(`SELECT * FROM rooms WHERE id = ${roomId}`, function (error, results, fields) {
        if (error) throw error;
        if (results.length) {
            connection.query(`UPDATE users SET currentRoomId = '${roomId}' WHERE id = ${userId}`, function (error, results) {
                if (error) throw error;
                getAllUsersFromRoom(roomId, (users: Array<UserData>) => {
                    getAllMessagesFromRoom(roomId, (messages: Array<Message>) => {
                        callback({status: "OK", data: users, messages, id: roomId});
                    })
                });
            });
        }
        else {
            console.log('Room is not exist!');
        }
    });
}

export function getAllUsersFromRoom(roomId: string, callback: (data: any) => void) {
    connection.query('SELECT * FROM users WHERE currentRoomId = ' + roomId, function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
}

export function addMessageData({message, roomId, userId, login}: MessageData, callback: (data: any) => void) {
    connection.query('SELECT max(localId) FROM messages WHERE roomId = ' + roomId, function (error, results: Array<any>, fields) {
        if (error) throw error;
        const currentLocalId: number = first(results)?.localId ? Number(first(results)?.localId) : -1;
        const localId =  currentLocalId + 1;

        connection.query(`INSERT INTO messages (localId, roomId, userId, message, login) VALUES (${localId}, ${roomId}, ${userId}, '${message}', '${login}')`, function (error) {
            if (error) throw error;
            callback({localId, roomId, userId, message, login});
        });
    });
}

export function getAllMessagesFromRoom(roomId: string, callback: (data: any) => void) {
    connection.query('SELECT * FROM messages WHERE roomId = ' + roomId, function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });
}

export function auth(login: string, password: string, callback: (data: any) => void) {
    connection.query(`SELECT password, id FROM users WHERE login = '${login}'`, function (error, result, fields) {
        if (error) throw error;
        const user: UserData = first(result);
        if (user && user.password === password) {
            callback({status: "OK", userId: user.id});
        }
        else {
            callback({status: "NO"});
        }
    });
}

export function removeRoom(roomId: string, userId: string, callback: (data: any) => void) {
    connection.query(`DELETE FROM rooms WHERE id = ${roomId} and ownerId = ${userId}`, function (error) {
        if (error) throw error;
        callback({status: 'OK'});
    });
}

export function signUp(login: string, password: string, callback: (data: any) => void) {
    connection.query(`SELECT * FROM users WHERE login = '${login}'`, function (error, users: Array<UserData>) {
        if (error) throw error;

        if (!users.length) {
            connection.query(`INSERT INTO users (login, password, currentRoomId) VALUES ('${login}', '${password}', -1)`, function (error) {
                if (error) throw error;

                connection.query(`SELECT id FROM users WHERE login = '${login}'`, function (error, result: any) {
                    if (error) throw error;
                    callback({status: 'OK', userId: result.id});
                });
            });
        }
        else {
            callback({status: "NO"});
        }
    });
}

export function closeConnection() {
    connection.end();
}