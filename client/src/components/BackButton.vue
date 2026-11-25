<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  if (window.history.state && window.history.state.back) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<template>
  <button type="button" class="back-btn" @click="goBack">
    &lt;- Torna enrere
  </button>
</template>