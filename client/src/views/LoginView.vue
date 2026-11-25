<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const userStore = useUserStore()

const username = ref('')

// Lista de personajes de ejemplo (puedes cambiarlos por rutas a tus imágenes)
const characters = ['👾', '🤖', '👽', '👻', '🕹️']
const currentcharacterIndex = ref(0)

function prevcharacter() {
  currentcharacterIndex.value =
    (currentcharacterIndex.value - 1 + characters.length) % characters.length
}

function nextcharacter() {
  currentcharacterIndex.value = (currentcharacterIndex.value + 1) % characters.length
}

function enter() {
    if (!username.value.trim()) return

    userStore.setUsername(username.value.trim())

    router.push('/lobbies')
}
</script>

<template>
  <main class="login-page">
    <section class="login-card">
      <header class="login-header">
        <h1>Arcadia</h1>
        <h2>Play, connect, repeat.</h2>
      </header>

      <div class="form-columns">
        <div class="column-left">
          <label for="username">Nom</label>
          <input
            id="username"
            v-model="username"
            type="text"
            placeholder="Escriu el teu nom..."
            maxlength="20"
            @keyup.enter="enter"
          />
        </div>

        <div class="column-right">
          <label>Escull el teu personatge</label>
          <div class="character-selector">
            <button type="button" class="arrow-btn" @click="prevcharacter">&lt;</button>
            <div class="character-box">
              <!-- Si usas imágenes reales, cambia el span por: <img :src="characters[currentcharacterIndex]" alt="character" /> -->
              <span class="character-placeholder">{{ characters[currentcharacterIndex] }}</span>
            </div>
            <button type="button" class="arrow-btn" @click="nextcharacter">&gt;</button>
          </div>
        </div>
      </div>

      <div class="form-footer">
        <button class="enter-btn" @click="enter">Entra</button>
      </div>
    </section>
  </main>
</template>