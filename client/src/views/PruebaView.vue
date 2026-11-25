<script setup>
// Vista SOLO para probar las salas de Socket.IO (se puede borrar más adelante)
import { ref } from 'vue'
import { useSocketStore } from '../stores/socketStore'

const socketStore = useSocketStore()
const nombre = ref('')

function entrar() {
    if (nombre.value.trim() === '') return
    socketStore.join(nombre.value.trim())
}
</script>

<template>
    <main>
        <h1>Prueba de salas</h1>

        <input v-model="nombre" placeholder="Tu nombre" @keyup.enter="entrar" />
        <button @click="entrar">Entrar</button>

        <p>Estás en: {{ socketStore.sala || 'ninguna sala' }}</p>

        <button @click="socketStore.joinSala('sala1')">Sala 1</button>
        <button @click="socketStore.joinSala('sala2')">Sala 2</button>

        <h2>Usuarios conectados</h2>
        <ul>
            <li v-for="user in socketStore.users" :key="user.id">
                {{ user.name }} - {{ user.sala || 'sin sala' }}
            </li>
        </ul>
    </main>
</template>
