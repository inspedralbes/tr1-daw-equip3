<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import BrandHeader from '../components/BrandHeader.vue'
import BackButton from '@/components/BackButton.vue'

const router = useRouter()
const userStore = useUserStore()

onMounted(() => {
  if (!userStore.username) {
    router.push('/')
  }
})

function goBack() {
  router.push('/')
}
</script>

<template>
  <main class="lobbies-page">
    <section class="lobbies-card">
      <BrandHeader />

      <h3 class="lobbies-title">Lobbies</h3>
    </section>
    
    <BackButton />
  </main>
</template>