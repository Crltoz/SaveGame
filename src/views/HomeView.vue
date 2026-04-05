<script setup lang="ts">
import { useGames } from '../composables/useGames'
import GameCard from '../components/GameCard.vue'

const { games } = useGames()
</script>

<template>
  <div class="home-view container pt-5 mt-4 pb-5 mb-5">
    <header class="py-5">
      <div class="mono small text-secondary opacity-50 mb-1">INTEL_LOG // ACTIVIDAD RECIENTE</div>
      <h1 class="display-3 fw-800 text-uppercase letter-spacing-tight mb-2">BITÁCORA</h1>
      <p class="lead text-primary mono fw-light opacity-75">
         <span class="badge bg-primary text-dark me-2 rounded-0">AGENTE: EL_VIEJO</span> Análisis de campo y registros de operaciones.
      </p>
    </header>

    <div class="pb-5">
      <div class="dossier-list d-flex flex-column gap-5">
        <div v-for="(game, index) in games" :key="game.id" class="dossier-item">
          <div class="row g-0 align-items-stretch" :class="{ 'flex-row-reverse': index % 2 !== 0 }">
            
            <!-- Card Section -->
            <div class="col-lg-4 col-md-5">
              <div class="game-wrapper h-100 dossier-card-boundary position-relative">
                <GameCard :game="game" />
                <!-- Tactical connection line -->
                <div class="connection-line d-none d-md-block" :class="index % 2 === 0 ? 'to-right' : 'to-left'"></div>
              </div>
            </div>

            <!-- Review Section -->
            <div class="col-lg-8 col-md-7">
              <div class="log-entry p-4 p-lg-5 bg-dark bg-opacity-40 h-100 dossier-text-boundary border-primary border-opacity-10 d-flex flex-column justify-content-center"
                   :class="index % 2 === 0 ? 'border-start-0 border-end border-top border-bottom rounded-end' : 'border-end-0 border-start border-top border-bottom rounded-start'">
                
                <div class="d-flex align-items-center mb-4" :class="{ 'justify-content-md-end': index % 2 === 0 }">
                   <div class="mono text-primary bg-primary bg-opacity-10 px-3 py-1 small border-start border-primary">
                     REPORTE_ASSET // <span class="text-light opacity-100">{{ game.date }}</span>
                   </div>
                </div>

                <div class="intel-text py-4">
                   <div class="mono text-secondary small mb-3 opacity-25">-- DESCRIPCIÓN DEL REPORTE --</div>
                   <p class="review-quote fs-4 fw-light text-light lh-lg mb-0 px-md-3" :class="{ 'text-md-end': index % 2 === 0 }">
                     "{{ game.review }}"
                   </p>
                </div>

                <div class="d-flex flex-wrap gap-4 mt-4 pt-4 border-top border-primary border-opacity-10 mono x-small"
                     :class="{ 'justify-content-md-end': index % 2 === 0 }">
                   <span class="text-uppercase text-primary fst-italic">PLATAFORMA_{{ game.platform }}</span>
                   <span v-if="game.finished" class="text-uppercase text-success fw-bold">
                     <i class="bi bi-check2-circle me-1"></i>TERMINADO
                   </span>
                   <span v-if="game.platinum" class="text-uppercase text-warning fw-bold">
                     <i class="bi bi-trophy-fill me-1"></i>PLATINADO
                   </span>
                   <span class="text-uppercase opacity-50 ms-md-auto">VERIFICADO_POR_VIEJO</span>
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
.letter-spacing-tight {
  letter-spacing: -2px;
}
.fw-800 { font-weight: 800; }

.dossier-item {
  transition: transform 0.3s ease;
  &:hover {
    transform: translateX(5px);
  }
}

.log-entry {
  position: relative;
  transition: all 0.4s ease;
  &::before {
     content: '';
     position: absolute;
     top: 10px; bottom: 10px;
     width: 1px;
     background: rgba(var(--bs-primary-rgb), 0.1);
  }
}

.review-quote {
  font-size: 1.25rem !important;
  color: rgba(255,255,255,0.9);
}

.connection-line {
  position: absolute;
  top: 50%;
  width: 50px;
  height: 1px;
  background: rgba(var(--bs-primary-rgb), 0.3);
  z-index: 10;
  
  &.to-right {
    left: 100%;
  }
  &.to-left {
    right: 100%;
  }
}

.dossier-card-boundary {
  z-index: 5;
}
</style>
