import { defineStore } from 'pinia';
import { ref } from 'vue';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

export const useSocketStore = defineStore('socket', () => {
    const users = ref([]);
    const sala = ref(null);

    socket.on('users', (list) => {
        console.log('Usuarios conectados:', list);
        users.value = list;

        // buscar mi usuario en la lista para saber en qué sala estoy
        const yo = list.find((u) => u.id === socket.id);
        if (yo) {
            sala.value = yo.sala;
        }
    });

    function join(name) {
        socket.emit('join', name);
    }

    function joinSala(nuevaSala) {
        socket.emit('joinSala', nuevaSala);
        // ya no ponemos sala.value aquí: lo actualiza el evento 'users'
    }

    return { users, sala, join, joinSala };
});