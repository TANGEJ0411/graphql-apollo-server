import WebSocket from "ws";

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
    console.log('Connected to server.');

    // 向服务器发送消息
    client.send('Hello, server!');
})

// 接收来自服务器的消息
client.on('message', (message) => {
    console.log(`Received message from server: ${message}`);
});

// 当连接关闭时触发
client.on('close', () => {
    console.log('Disconnected from server.');
});

console.log(123)