<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const userStore = useUserStore()

const username = ref('')

const characters = ['char-1', 'char-2']
const currentcharacterIndex = ref(0)

const characterImages = import.meta.glob(
    '../assets/sprites/characters/*/*.png',
    { eager: true, import: 'default' }
)

function getCharacterPreview(charName) {
    const basePath = `../assets/sprites/characters/${charName}`
    return (
        characterImages[`${basePath}/cover.png`] ||
        ''
    )
}

const currentCharacterName = computed(() => characters[currentcharacterIndex.value])
const currentCharacterImage = computed(() =>
    getCharacterPreview(currentCharacterName.value)
)

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

console.log('keys:', Object.keys(characterImages))
console.log('target:', `../assets/sprites/characters/${currentCharacterName.value}/cover.png`)
console.log('value:', currentCharacterImage.value)
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
              <img
                v-if="currentCharacterImage"
                :src="currentCharacterImage"
                :alt="currentCharacterName"
                class="character-img"
              />
              <span v-else class="character-placeholder">{{  }}</span>
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