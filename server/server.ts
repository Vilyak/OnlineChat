import * as express from 'express';
import * as WebSocket from 'ws';
import {AUTH__PUBLIC_URL, SIGN_UP_URL, FETCH_ROOMS_URL, CREATE__ROOM_URL, REMOVE__ROOM_URL, JOIN_TO_ROOM_URL} from "./urls";
import {
    addMessageData,
    auth,
    connectToDatabase,
    createRoom,
    getAllRooms,
    joinToRoom,
    removeRoom,
    signUp,
} from "./controllers/database";

const app = express()
const port = 8080

const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    addMessageData(JSON.parse(data), (newMessageData) => {
        wss.clients.forEach(function each(client) {
            client.send(JSON.stringify(newMessageData));
        });
    });
  });
});


function errorHandler(res: express.Response, action: () => void) {
    try {action()}
    catch (error) {
        res.status(409).send(error);
    }
}

function appendCors(res: any){
    res.setHeader('Access-Control-Allow-Origin', '*')
}


app.get(`/${AUTH__PUBLIC_URL}`, (req, res) => {
    errorHandler(res, () => {
        auth(req.param('login'), req.param('password'), (data) => {
            appendCors(res);
            res.send(JSON.stringify(data));
        });
    })
});

app.get(`/${JOIN_TO_ROOM_URL}`, (req, res) => {
    joinToRoom(req.param('userId'), req.param('roomId'), (data) => {
        appendCors(res);
        res.send(JSON.stringify(data));
    });
});

app.get(`/${SIGN_UP_URL}`, (req, res) => {
    signUp(req.param('login'), req.param('password'), (data) => {
        appendCors(res);
        res.send(JSON.stringify(data));
    });
});


app.get(`/${FETCH_ROOMS_URL}`, (req, res) => {
    getAllRooms((data) => {
        appendCors(res);
        res.send(JSON.stringify(data));
    });
});

app.get(`/${CREATE__ROOM_URL}`, (req, res) => {
    createRoom(req.param('name'), req.param('userId'), (data) => {
        appendCors(res);
        res.send(JSON.stringify(data));
    });
});

app.get(`/${REMOVE__ROOM_URL}`, (req, res) => {
    removeRoom(req.param('roomId'), req.param('userId'), (data) => {
        appendCors(res);
        res.send(JSON.stringify(data));
    });
});


app.listen(port, () => {
    console.log(`Server listening at port : ${port}`);
    connectToDatabase((message: string) => {
        console.log(message);
    });
})