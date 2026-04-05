<script setup lang="ts">
import { computed } from 'vue'
import { useGames } from '../composables/useGames'
import GameCard from '../components/GameCard.vue'

const { games, gotyWinners, getNomineesByYear } = useGames()

const years = computed(() => {
  const allYears = games.value.map(g => g.year)
  return [...new Set(allYears)].sort((a, b) => b - a)
})
</script>

<template>
  <div class="goty-view container pt-5 mt-4 mb-5 pb-5">
    <header class="py-5 text-center">
      <div class="mono small text-secondary opacity-50 mb-1">ARCHIVO_COMPLETO // SECCIÓN_GOTY</div>
      <h1 class="display-3 fw-800 text-uppercase letter-spacing-tight mb-2">GOTY PERSONAL</h1>
      <p class="lead text-primary mono fw-light opacity-75">
         Reconocimiento al máximo desempeño por periodo anual.
      </p>
    </header>

    <div v-for="year in years" :key="year" class="mb-5 py-5 border-top border-primary border-opacity-10">
      <div class="row align-items-center">
        <!-- Year  -->
        <div class="col-lg-2 text-center text-lg-start mb-4 mb-lg-0">
          <div class="mono text-primary opacity-25 small mb-1">PERIODO:</div>
          <h2 class="display-2 fw-800 text-uppercase letter-spacing-tight text-primary mb-0">{{ year }}</h2>
        </div>

        <!-- Winner Dossier -->
        <div class="col-lg-10">
           <div class="p-4 bg-dark bg-opacity-25 tactical-border">
              <div class="row g-4 align-items-center">
                 <div class="col-md-5">
                    <div v-if="gotyWinners.find(g => g.year === year)" class="winner-card-wrap">
                       <GameCard :game="gotyWinners.find(g => g.year === year)!" />
                    </div>
                    <div v-else class="placeholder-card bg-black border border-primary border-opacity-10 d-flex align-items-center justify-content-center" style="height: 400px;">
                       <span class="mono text-secondary opacity-25">-- PENDIENTE --</span>
                    </div>
                 </div>
                 
                 <div class="col-md-7 ps-md-5">
                    <div class="mono text-primary mb-2 small">ESTADO: GANADOR SELECCIONADO</div>
                    <h3 class="fw-800 display-4 mb-4 text-uppercase">
                      {{ gotyWinners.find(g => g.year === year)?.title || 'EN EVALUACIÓN' }}
                    </h3>
                    
                    <div class="nominees-section">
                       <div class="mono x-small text-secondary mb-3 opacity-50 text-uppercase">-- NOMINADOS COCURRENTES --</div>
                       <div class="row g-2">
                          <div v-for="nominee in getNomineesByYear(year)" :key="nominee.id" 
                               class="col-12 mono x-small text-primary opacity-75 d-flex align-items-center border-start border-primary border-opacity-25 ps-2">
                             <span class="me-2 text-secondary opacity-50">►</span> {{ nominee.title }}
                             <span class="ms-auto text-secondary small opacity-50">SCORE: {{ nominee.score }}</span>
                          </div>
                       </div>
                    </div>

                    <div class="mt-5 pt-3 border-top border-primary border-opacity-10 mono x-small opacity-25">
                       ARCHIVO PERSONAL // EL_VIEJO
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.fw-800 { font-weight: 800; }
.letter-spacing-tight {
  letter-spacing: -2px;
}

.winner-card-wrap {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: -10px; left: -10px;
    width: 20px; height: 2px;
    background: var(--bs-primary);
    opacity: 0.5;
  }
}
</style>
