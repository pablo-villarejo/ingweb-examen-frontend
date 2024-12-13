<script setup>
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
  <header class="bg-blue-500 flex items-center justify-between p-4">
    <!-- Logo y título -->
    <div class="flex items-center space-x-4">
        <img 
            alt="Mapa logo" 
            class="logo" 
            src="@/assets/logo.svg" 
            width="100" 
            height="100" 
        />
        <h1 class="text-white text-2xl font-bold">MiMapa</h1>
    </div>
    <div>
    <!-- Navegación -->
    <nav class="flex space-x-8"> <!-- Cambiado el espacio entre elementos -->
        <RouterLink 
            to="/" 
            class="text-white hover:text-blue-300 font-medium"
        >
            Inicio
        </RouterLink>
        <RouterLink 
            to="/add-marker" 
            class="text-white hover:text-blue-300 font-medium"
        >
            Añadir Marcador
        </RouterLink>
        <RouterLink 
            to="/my-map" 
            class="text-white hover:text-blue-300 font-medium"
        >
            Mi Mapa
        </RouterLink>
        <RouterLink 
            to="/visit-map" 
            class="text-white hover:text-blue-300 font-medium"
        >
            Visitar Mapa
        </RouterLink>
    </nav>
  </div>
</header>

<!-- Usamos el key en RouterView para forzar el reinicio del componente cuando cambia la ruta -->
<RouterView :key="$route.fullPath" />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
