<script setup>
import { ref } from 'vue';
import UserMapComponent from '@/components/UserMapComponent.vue';

const email = ref(''); // El correo electrónico introducido por el usuario
const isSubmitted = ref(false); // Estado para controlar si el formulario fue enviado

const submitEmail = () => {
  if (email.value) {
    alert(`Intentando cargar el mapa del usuario con email: ${email.value}`);
    isSubmitted.value = true; // Marca como enviado el formulario
  } else {
    alert("Por favor, introduce un email.");
    isSubmitted.value = false;
  }
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

    <!-- Mapa dinámico solo si se ha enviado el formulario -->
    <UserMapComponent :email="email" width="100%" height="500px" v-if="isSubmitted" />
  </div>
</template>

<style scoped>
/* Opcional: estilos específicos para la vista */
</style>
