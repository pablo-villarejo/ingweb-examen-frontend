<script setup>
import { ref } from 'vue';
import UserMapComponent from '@/components/UserMapComponent.vue';

const email = ref(''); // El correo electrónico introducido por el usuario
const submitEmail = () => {
  alert(`Intentando cargar el mapa del usuario con email: ${email.value}`);
};
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Visitar Mapa</h1>
    <p class="mb-4">Introduce el email del usuario cuyo mapa deseas visitar.</p>
    <form @submit.prevent="submitEmail" class="mb-6">
      <input
        type="email"
        v-model="email"
        placeholder="Introduce el email"
        class="p-2 border rounded w-full mb-2"
      />
      <button
        type="submit"
        class="p-2 bg-blue-500 text-white rounded"
      >
        Cargar Mapa
      </button>
    </form>

    <!-- Mapa dinámico -->
    <UserMapComponent :email="email" width="100%" height="500px" v-if="email" />
  </div>
</template>

<style scoped>
/* Opcional: estilos específicos para la vista */
</style>
