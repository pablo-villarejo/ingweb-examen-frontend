<script setup>
import { ref, onMounted } from 'vue';
import ImageInput from './ImageInput.vue';
import axios from 'axios';

// Referencias reactivas
const moviePosterUrl = ref(''); // URL de la imagen
const markerName = ref(''); // Nombre del marcador
const address = ref(''); // Dirección ingresada
const marker = ref(null); // Instancia del marcador
const map = ref(null); // Mapa
const coordinates = ref({ lat: null, lon: null }); // Coordenadas del marcador

// Función para manejar la actualización de la URL de la imagen
function handleUpdateImageUrl(url) {
  moviePosterUrl.value = url;
  console.log('Image:', url);
}

// Inicialización del mapa
onMounted(() => {
  map.value = L.map('map').setView([34, -43], 5); // Coordenadas iniciales
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map.value);
});

// Función para buscar la ubicación a través del geocoding
const findLocation = async () => {
  if (!address.value.trim()) {
    alert("Please enter an address.");
    return;
  }

  try {
    // Solicitar datos de geocodificación a la API Nominatim
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address.value)}`
    );
    const data = await response.json();

    if (data.length === 0) {
      alert("No results found for the given address.");
      return;
    }

    const { lat, lon, display_name } = data[0]; // Primer resultado
    console.log(`Address found: ${display_name}, Lat: ${lat}, Lon: ${lon}`);

    // Actualizar vista del mapa
    map.value.setView([lat, lon], 10);

    // Añadir o actualizar marcador en el mapa
    if (marker.value) {
      map.value.removeLayer(marker.value); // Eliminar marcador anterior
    }
    marker.value = L.marker([lat, lon])
      .addTo(map.value)
      .bindPopup(`Address: ${display_name}`)
      .openPopup();

    // Guardar las coordenadas
    coordinates.value = { lat, lon };
  } catch (error) {
    console.error("Error fetching geolocation data:", error);
    alert("There was an error fetching the location. Please try again.");
  }
};

// Función para manejar el envío del formulario
async function submitForm() {
  // Validar que todos los campos estén completos
  if (!markerName.value || !coordinates.value.lat || !coordinates.value.lon) {
    alert('Please fill out all fields correctly.');
    return;
  }

  // Obtener el email del mapa desde el contexto actual o como un parámetro
  const email = 'user@example.com'; // Esto debe obtenerse de alguna forma (como un parámetro o contexto)

  // Crear el objeto con los datos del marcador
  const markerData = {
    locationName: markerName.value,
    coordinates: coordinates.value,
    imageURL: moviePosterUrl.value,
  };

  try {
    // Hacer una petición POST para añadir el marcador
    const response = await axios.post('/api/map/user@example.com/markers', markerData);


    // Manejar la respuesta del servidor
    if (response.status === 201) {
      alert('Marker added successfully!');
    }
  } catch (error) {
    console.error('Error adding marker:', error);
    alert('There was an error adding the marker. Please try again.');
  }
}
</script>

<template>
  <form @submit.prevent="submitForm" class="space-y-6 p-6 border rounded-lg shadow-lg">
    <!-- Nombre del marcador -->
    <div>
      <input
        type="text"
        v-model="markerName"
        placeholder="Enter marker name"
        class="p-2 border rounded w-full mb-2"
      />
    </div>

    <!-- Campo para dirección y geocoding -->
    <div>
      <input
        type="text"
        v-model="address"
        placeholder="Enter an address"
        class="p-2 border rounded w-full mb-2"
      />
      <button @click="findLocation" class="p-2 bg-blue-500 text-white rounded">
        Search
      </button>
    </div>

    <!-- Mapa -->
    <div class="flex items-center space-y-4 md:w-1/3 w-full">
      <div class="w-full max-w-4xl"> <!-- Centrado y limitación de ancho en pantallas grandes -->
        <div id="map" style="height: 500px; width: 100%;"></div>
      </div>
    </div>

    <!-- Componente para subir imagen -->
    <ImageInput @updateImageUrl="handleUpdateImageUrl" />

    <!-- Botón para enviar el formulario -->
    <button
      type="submit"
      class="w-full px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition"
    >
      Save
    </button>
  </form>
</template>

<style scoped>
/* Puedes agregar estilos específicos aquí si es necesario */
</style>
