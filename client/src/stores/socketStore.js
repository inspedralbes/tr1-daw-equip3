import { defineStore } from 'pinia';
import { ref } from 'vue';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_SOCKET_URL);

export const useSocketStore = defineStore('socket', () => {
    const users = ref([]);
    const sala = ref(null);
    const mensajes = ref([]);

    socket.on('users', (list) => {
        console.log('Usuarios conectados:', list);
        users.value = list;

        // buscar mi usuario en la lista para saber en qué sala estoy
        const yo = list.find((u) => u.id === socket.id);
        if (yo) {
            if (yo.sala !== sala.value) {
                mensajes.value = []; // he cambiado de sala: chat nuevo
            }
            sala.value = yo.sala;
        }
    });

    socket.on('mensaje', (msg) => {
        mensajes.value.push(msg); // msg = { nombre, texto }
    });

    function join(name) {
        socket.emit('join', name);
    }

    function joinSala(nuevaSala) {
        socket.emit('joinSala', nuevaSala);
        // ya no ponemos sala.value aquí: lo actualiza el evento 'users'
    }

    function enviarMensaje(texto) {
        if (texto.trim() === '') return;
        socket.emit('mensaje', texto);
    }

    return { users, sala, mensajes, join, joinSala, enviarMensaje };
});