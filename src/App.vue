<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import DisclaimerModal from './components/DisclaimerModal.vue'
import { useSound } from './composables/useSound'
import { ref } from 'vue'

const { isMuted, toggleMute, playClick } = useSound()

// Check localStorage immediately to avoid reactivity lag
const isAccepted = ref(!!localStorage.getItem('savegame_disclaimer_accepted'))

const handleAccept = () => {
  isAccepted.value = true
}
</script>

<template>
  <div class="app-container min-vh-100 bg-dark text-light overflow-x-hidden pt-5">
    <DisclaimerModal v-if="!isAccepted" @accept="handleAccept" />
    
    <div class="scanner-line"></div>

    <!-- HUD Overlay decoration -->
    <div class="position-fixed top-0 start-0 w-100 h-100 pointer-events-none z-0 opacity-10">
      <div class="border-top border-primary position-absolute w-25 mt-3 ms-3"></div>
      <div class="border-start border-primary position-absolute h-25 ms-3 mt-3"></div>
    </div>

    <!-- Navbar -->
    <Navbar />

    <!-- Main Content -->
    <main class="main-content z-1" :class="{ 'content-blur': !isAccepted }">
      <RouterView v-slot="{ Component }">
        <transition name="blur-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>

    <!-- Mute Toggle HUD -->
    <div class="position-fixed bottom-0 end-0 p-4 z-3 d-flex flex-column align-items-end">
       <button class="btn-mute mono x-small text-primary bg-dark bg-opacity-50 border border-primary border-opacity-25 p-2 px-3 d-flex align-items-center"
               @click="toggleMute(); playClick()">
          <span class="opacity-50 me-2">AUDIO_OUTPUT:</span>
          <span v-if="!isMuted" class="fw-bold"><i class="bi bi-volume-up-fill me-1"></i>ENABLED</span>
          <span v-else class="fw-bold opacity-50"><i class="bi bi-volume-mute-fill me-1"></i>MUTED</span>
       </button>
    </div>

    <!-- Footer -->
    <footer class="py-5 bg-black border-top border-primary border-opacity-10 mt-5">
      <div class="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div class="mb-3 mb-md-0 mono small opacity-50">
          SYSTEM_IP: 192.168.1.1 // LOC: REDACTED
        </div>
        <div class="text-center">
          <h4 class="mono text-primary mb-0 small opacity-75">© 2026 SAVE GAME - INTEL DIVISION</h4>
          <small class="mono text-secondary x-small mt-1 d-block opacity-25">PROPERTY OF THE AGENCY. UNAUTHORIZED ACCESS
            PROHIBITED.</small>
        </div>
        <div class="mt-3 mt-md-0 mono small opacity-50">
          U_OPERATOR: EL_VIEJO
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
.app-container {
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  transition: filter 0.8s ease, opacity 0.8s ease;
  
  &.content-blur {
    filter: blur(10px);
    opacity: 0.3;
    pointer-events: none;
  }
}

// Transitions
.blur-fade-enter-active,
.blur-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}

.blur-fade-enter-from {
  opacity: 0;
  filter: blur(10px);
  transform: scale(0.98);
}

.blur-fade-leave-to {
  opacity: 0;
  filter: blur(10px);
  transform: scale(1.02);
}

// Custom Scrollbar
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #030303;
}

::-webkit-scrollbar-thumb {
  background: var(--bs-primary);
  border-radius: 0;
  opacity: 0.5;
}

.x-small {
  font-size: 0.6rem;
  letter-spacing: 1px;
}

.btn-mute {
  transition: all 0.2s;
  cursor: pointer;
  z-index: 100;
  &:hover {
    background: rgba(var(--bs-primary-rgb), 0.1) !important;
    border-color: var(--bs-primary) !important;
    box-shadow: 0 0 10px rgba(var(--bs-primary-rgb), 0.2);
  }
}
</style>
