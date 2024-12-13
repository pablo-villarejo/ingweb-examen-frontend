<script setup>

import MapComponent from '../components/Map.vue';

</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- Contenedor para mapa -->
    <div class="flex  items-center space-y-4 md:w-1/3 w-full">
          <!-- Mapa -->
          <div class="w-full max-w-4xl"> <!-- Centrado y limitación de ancho en pantallas grandes -->
            <MapComponent :latitude="3" :longitude="3" :zoom="3" markerLatitude="3" markerLongitude="3" markerText="Ubicación de la empresa"
              class="w-full h-[300px] rounded-lg shadow-md" />
          </div>
      </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
