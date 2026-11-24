import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {

  const username = ref('')
  const avatar = ref(null)
  const avatarColor = ref('#8B7CF6')

  function setUsername(name) {
    username.value = name
  }

  function setAvatar(selectedAvatar) {
    avatar.value = selectedAvatar
  }

  function setAvatarColor(color) {
    avatarColor.value = color
  }

  return {
    username,
    avatar,
    avatarColor,
    setUsername,
    setAvatar,
    setAvatarColor
  }
})