import { defineStore } from 'pinia';
import { ref } from 'vue';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

export const useSocketStore = defineStore('socket', () => {
    const users = ref([]);

    socket.on('users', (list) => {
        console.log('Usuarios conectados:', list);
        users.value = list;
    });

    function join(name) {
        socket.emit('join', name);
    }

    return { users, join };
});