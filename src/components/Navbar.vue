<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useSound } from '../composables/useSound'

const { playHover, playClick } = useSound()
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top py-0">
    <div class="container border-start border-end border-primary border-opacity-10 px-4">
      <RouterLink class="navbar-brand py-3 d-flex align-items-center" to="/" @mouseenter="playHover" @click="playClick">
        <span class="text-primary me-2 mono">SAVE GAME // INTEL</span>
        <span class="ms-1 border-start border-primary border-opacity-25 ps-2 mono small opacity-50">SISTEMA: OK</span>
      </RouterLink>

      <button class="navbar-toggler border-0 p-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
         <i class="bi bi-grid-fill text-primary"></i>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto text-uppercase">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/" @mouseenter="playHover" @click="playClick">
              BITÁCORA
            </RouterLink>
          </li>
          <li class="nav-item" @mouseenter="playHover" @click="playClick">
            <RouterLink class="nav-link" to="/top">
              TOP JUEGOS
            </RouterLink>
          </li>
          <li class="nav-item" @mouseenter="playHover" @click="playClick">
            <RouterLink class="nav-link" to="/goty">
              GOTY PERSONAL
            </RouterLink>
          </li>
        </ul>
        <div class="ms-lg-4 d-flex align-items-center border-start border-primary border-opacity-10 ps-4 py-3 d-none d-lg-flex">
           <span class="mono small text-secondary opacity-75">OP: EL_VIEJO</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.navbar-brand {
  font-weight: 800;
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.nav-link {
  position: relative;
  transition: all 0.2s;
  font-weight: 400;
  font-size: 0.8rem;
  letter-spacing: 1.5px;

  &:hover, &.router-link-active {
    color: var(--bs-primary) !important;
  }

  &.router-link-active {
    background: linear-gradient(to bottom, transparent, rgba(var(--bs-primary-rgb), 0.05));
    font-weight: 700;
  }
}
</style>
