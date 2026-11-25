import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {

  const username = ref('')
  const character = ref(null)
  const characterColor = ref('#8B7CF6')

  function setUsername(name) {
    username.value = name
  }

  function setCharacter(selectedCharacter) {
    character.value = selectedCharacter
  }

  function setCharacterColor(color) {
    characterColor.value = color
  }

  return {
    username,
    character,
    characterColor,
    setUsername,
    setCharacter,
    setCharacterColor
  }
})