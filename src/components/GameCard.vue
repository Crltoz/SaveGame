<script setup lang="ts">
import { useGames, type Game } from '../composables/useGames'
import { useSound } from '../composables/useSound'

const props = defineProps<{
  game: Game
}>()

const { getGameCover } = useGames()
const { playHover } = useSound()
</script>

<template>
  <div class="card h-100 card-dossier tactical-border" @mouseenter="playHover">
    <div class="card-img-wrap">
      <img :src="getGameCover(game.coverId)" :alt="game.title" class="card-img-top rounded-0" loading="lazy">
      
      <!-- Score Badge (Prominent) -->
      <div class="position-absolute top-0 end-0 p-0 z-2">
        <div class="score-container bg-primary text-dark d-flex flex-column align-items-center justify-content-center">
          <span class="mono x-small-px fw-bold opacity-75 mt-1">SCORE</span>
          <span class="fw-800 fs-4 mb-1">{{ game.score }}</span>
        </div>
      </div>
      
      <!-- Platform Icon Overlay -->
      <div class="position-absolute bottom-0 start-0 p-2 z-2 bg-dark bg-opacity-75 d-flex align-items-center">
         <i v-if="game.platform === 'PC'" class="bi bi-pc-display me-2 text-primary"></i>
         <i v-else-if="game.platform === 'PS5'" class="bi bi-playstation me-2 text-primary"></i>
         <span class="mono x-small fw-bold letter-spacing-1">{{ game.platform }}</span>
      </div>

      <div v-if="game.goty" class="position-absolute bottom-0 end-0 p-2 z-2">
         <i class="bi bi-star-fill text-primary shadow-glow"></i>
      </div>
    </div>

    <div class="card-body p-3 d-flex flex-column bg-dark bg-opacity-50 border-top border-primary border-opacity-10">
      <div class="d-flex justify-content-between align-items-baseline mb-2">
         <div class="mono text-primary x-small opacity-50">{{ game.year }}</div>
         <div v-if="game.goty" class="mono text-primary x-small fw-bold">PROYECTO_GOTY</div>
      </div>
      
      <h5 class="card-title fw-800 mb-3 text-uppercase letter-spacing-tight">{{ game.title }}</h5>
      
      <p class="card-text text-secondary x-small flex-grow-1 opacity-75 lh-base mb-0">
        {{ game.review }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-img-top {
  height: 280px;
  object-fit: cover;
  filter: grayscale(0.5) contrast(1.1) brightness(0.7);
  transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}

.card-dossier:hover .card-img-top {
  filter: grayscale(0) contrast(1) brightness(0.9);
}

.score-container {
  width: 50px;
  min-height: 50px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 25% 100%);
  box-shadow: -5px 5px 15px rgba(0, 0, 0, 0.5);
  line-height: 1;
}

.x-small {
  font-size: 0.7rem;
}

.x-small-px {
  font-size: 8px;
  letter-spacing: 0.5px;
}

.letter-spacing-tight {
  letter-spacing: -0.5px;
}

.letter-spacing-1 {
  letter-spacing: 1px;
}

.shadow-glow {
  filter: drop-shadow(0 0 5px var(--bs-primary));
}
</style>
