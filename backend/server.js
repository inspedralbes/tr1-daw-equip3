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

    socket.on('mensaje', (texto) => {
        const user = users[socket.id];
        if (!user || !user.sala) return; // tiene que estar en una sala
        if (typeof texto !== 'string' || texto.trim() === '') return;
        if (texto.length > 200) return; // mensajes no muy largos

        // enviar el mensaje solo a los de su sala
        io.to(user.sala).emit('mensaje', {
            nombre: user.name,
            texto: texto.trim()
        });
    });

    socket.on('disconnect', () => {
        delete users[socket.id];
        sendUsers();
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log('Servidor en el puerto ' + PORT);
});