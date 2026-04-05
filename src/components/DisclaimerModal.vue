<script setup lang="ts">
import { useSound } from '../composables/useSound'

const emit = defineEmits(['accept'])
const { playClick, playHover } = useSound()

const accept = () => {
  playClick()
  localStorage.setItem('savegame_disclaimer_accepted', 'true')
  emit('accept')
}
</script>

<template>
  <div class="disclaimer-overlay d-flex align-items-center justify-content-center px-3">
    <div class="card card-tactical max-w-md w-100 shadow-lg">
      <div class="card-header bg-primary text-dark mono fw-bold py-2 border-0 rounded-0 d-flex justify-content-between align-items-center px-3">
        <span>SISTEMA // PROTOCOLO_DE_ACCESO</span>
        <span class="x-small opacity-75">V.2026.04</span>
      </div>
      
      <div class="card-body p-4 p-md-5 bg-dark text-light border border-primary border-opacity-25 mt-0">
        <div class="mono text-primary small mb-3 opacity-50">-- NOTA DEL OPERADOR --</div>
        <h2 class="fw-800 text-uppercase mb-4 h4 letter-spacing-tight">Antes de continuar:</h2>
        
        <p class="fs-5 fw-light lh-lg text-secondary mb-5">
          Este es un registro personal de partidas y opiniones. Creemos que cada juego cuenta una historia diferente dependiendo de quién sostenga el control. Por eso, las valoraciones aquí publicadas son subjetivas y no pretenden ser una crítica definitiva. Disfrutá, jugá y sacá tus propias conclusiones; este es solo mi <span class="text-primary fw-bold fst-italic">punto de guardado</span>.
        </p>

        <div class="d-grid">
          <button @click="accept" @mouseenter="playHover" class="btn btn-outline-primary rounded-0 py-3 mono letter-spacing-1 fw-bold border-2 text-uppercase">
            [ INICIAR RECAPITULACIÓN ]
          </button>
        </div>
      </div>

      <div class="card-footer bg-black border-top border-primary border-opacity-10 py-2 d-flex justify-content-between mono x-small text-secondary opacity-50 px-3">
         <span>SESIÓN_UNIFICADA</span>
         <span>PUNTO_DE_GUARDADO_OK</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.disclaimer-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(15px);
}

.card-tactical {
  border: none;
  background: transparent;
  max-width: 600px;
}

.max-w-md { max-width: 600px; }

.letter-spacing-1 { letter-spacing: 1.5px; }
.fw-800 { font-weight: 800; }
</style>
