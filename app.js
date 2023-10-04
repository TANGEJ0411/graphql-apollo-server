import express from 'express';
import { WebSocketServer } from 'ws';

const app = express()

app.get('/', (request, response) => {
    response.send(`<h1>Hello, Node</h1>`)
})

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
    ws.on('error', console.error);

    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });

    ws.send('something');
});

// 監聽 port

const port = process.env.port || 3000;
console.log(port)
app.listen(port)
