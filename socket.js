import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({
    port: 8080,
    perMessageDeflate: {
        zlibDeflateOptions: {
            chunkSize: 1024,
            memLevel: 7,
            level: 3
        },
        zlibInflateOptions: {
            chunkSize: 10 * 1024
        },
        // Other options settable:
        clientNoContextTakeover: true, // Defaults to negotiated value.
        serverNoContextTakeover: true, // Defaults to negotiated value.
        serverMaxWindowBits: 10, // Defaults to negotiated value.
        // Below options specified as default values.
        concurrencyLimit: 10, // Limits zlib concurrency for perf.
        threshold: 1024 // Size (in bytes) below which messages
        // should not be compressed if context takeover is disabled.
    },
})


wss.on('connection', (socket) => {
    console.log('Client connected.');

    // 接收来自客户端的消息
    socket.on('message', (message) => {
        console.log(`Received message: ${message}`);

        // 向客户端发送消息
        socket.send(`Server received: ${message}`);
    });

    // 当客户端断开连接时触发
    socket.on('close', () => {
        console.log('Client disconnected.');
    });
});