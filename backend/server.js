const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: '*' }
});

const users = {};

function sendUsers() {
    io.emit('users', Object.entries(users).map(([id, name]) => ({ id, name })));
}

io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('join', (name) => {
        if (typeof name !== 'string' || name.trim() === '') return;
        users[socket.id] = name.trim();
        sendUsers();
    });

    socket.on('disconnect', () => {
        delete users[socket.id];
        sendUsers();
    });
});

server.listen(3000, () => {
    console.log('Servidor en el puerto 3000');
});