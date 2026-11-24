<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const userStore = useUserStore()

const username = ref('')

function enter() {
    if (!username.value.trim()) return

    userStore.setUsername(username.value.trim())

    router.push('/avatar')
}
</script>

<template>
    <main class="login-page">
        <section class="login-card">
            <h1>Arcadia</h1>
            <div class="login-form">
                <label for="username">Nom d'usuari</label>
                <input
                    id="username"
                    v-model="username"
                    type="text"
                    placeholder="Nom d'usuari..."
                    maxlength="20"
                    @keyup.enter="enter"
                />
                <button @click="enter">Entrar</button>
            </div>
        </section>
    </main>
</template>