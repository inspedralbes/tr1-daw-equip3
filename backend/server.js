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
    const lista = Object.entries(users).map(([id, u]) => ({ id, name: u.name, sala: u.sala }));
    io.emit('users', lista);
}

io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('join', (name) => {
        if (typeof name !== 'string' || name.trim() === '') return;
        users[socket.id] = { name: name.trim(), sala: null };
        sendUsers();
    });

    socket.on('joinSala', (sala) => {
        const user = users[socket.id];
        if (!user) return;
        if (typeof sala !== 'string' || sala === '') return;
        if (user.sala === sala) return; // ya está en esa sala

        // salir de la sala anterior
        if (user.sala) {
            socket.leave(user.sala);
        }

        socket.join(sala);
        user.sala = sala;
        console.log(user.name + ' ha entrado en ' + sala);
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