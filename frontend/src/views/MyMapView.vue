<script setup>
import UserMapComponent from '@/components/UserMapComponent.vue';
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Mi Mapa</h1>
    <p class="mb-4">Visualiza tu mapa con los marcadores que has añadido.</p>

    <!-- Aquí llamamos al nuevo componente pasando el email del usuario -->
    <UserMapComponent :email="'user@example.com'" width="100%" height="500px" />
  </div>
</template>

<style scoped>
/* Opcional: estilos específicos para la vista */
</style>
