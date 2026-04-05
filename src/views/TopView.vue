<script setup lang="ts">
import { useGames } from '../composables/useGames'
import { useSound } from '../composables/useSound'

const { topGames, getGameCover } = useGames()
const { playHover } = useSound()
</script>

<template>
  <div class="top-view container pt-5 mt-4 mb-5 pb-5">
    <header class="py-5">
      <div class="mono small text-secondary opacity-50 mb-1">INTEL_EVALUATION // TOP JUEGOS</div>
      <h1 class="display-3 fw-800 text-uppercase letter-spacing-tight mb-2">TOP JUEGOS</h1>
      <p class="lead text-primary mono fw-light opacity-75">
         Clasificación de activos por desempeño y satisfacción (1-10)
      </p>
    </header>

    <div class="top-list">
      <div v-for="(game, index) in topGames" :key="game.id" 
           class="top-item py-4 border-top border-primary border-opacity-10 d-flex flex-column flex-md-row align-items-center"
           @mouseenter="playHover">
        
        <!-- Position -->
        <div class="position-indicator mono display-4 fw-800 text-primary me-md-5 mb-3 mb-md-0">
          #{{ (index + 1).toString().padStart(2, '0') }}
        </div>

        <!-- Cover (Small but clear) -->
        <div class="cover-mini me-md-4 mb-3 mb-md-0 position-relative">
          <img :src="getGameCover(game.coverId)" :alt="game.title" class="rounded-0 shadow-sm">
          <div class="platform-badge bg-primary text-dark mono x-small fw-bold px-1 position-absolute bottom-0 end-0">
            {{ game.platform }}
          </div>
        </div>

        <!-- Info & Score -->
        <div class="flex-grow-1 text-center text-md-start pe-md-4">
          <div class="d-flex flex-column flex-md-row align-items-center mb-2">
            <h3 class="fw-800 text-uppercase mb-0 me-3">{{ game.title }}</h3>
            <span class="mono text-secondary small opacity-50">{{ game.year }}</span>
          </div>
          <p class="text-secondary mb-0 fw-light">
            "{{ game.review }}"
          </p>
        </div>

        <!-- Final Score prominent -->
        <div class="final-score-wrap ms-md-auto mt-4 mt-md-0">
          <div class="score-display bg-primary text-dark d-flex align-items-center justify-content-center">
            <span class="mono fw-bold fs-2">{{ game.score }}</span>
          </div>
        </div>

      </div>
    </div>

    <!-- Empty state -->
    <div v-if="topGames.length < 1" class="text-center py-5">
      <div class="mono display-1 text-secondary opacity-25">ERROR_NO_DATA</div>
      <p class="mt-3 text-secondary mono">NO HAY ACTIVOS REGISTRADOS</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.top-item {
  transition: background 0.3s;
  &:hover {
    background: rgba(var(--bs-primary-rgb), 0.02);
  }
}

.position-indicator {
  min-width: 80px;
  letter-spacing: -2px;
}

.cover-mini {
  width: 80px;
  height: 120px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.8) contrast(1.2);
  }
}

.score-display {
  width: 60px;
  height: 60px;
  clip-path: circle(50% at 50% 50%);
  box-shadow: 0 0 15px rgba(var(--bs-primary-rgb), 0.3);
}

.fw-800 { font-weight: 800; }
.letter-spacing-tight {
  letter-spacing: -2px;
}
.x-small { font-size: 0.65rem; }
</style>
