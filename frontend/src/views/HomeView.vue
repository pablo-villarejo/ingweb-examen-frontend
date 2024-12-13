<script setup>
import { ref, onMounted } from 'vue';
import 'leaflet/dist/leaflet.css';
import { useRoute } from 'vue-router';
import router from '../router';
import axios from 'axios';
import { uploadFileToCloudinary } from '@/services/uploadService';
import MapComponent from '../components/Map.vue';

const imageSrc = ref('');

const marker = ref(null); // Marker instance
const address = ref(""); // User-entered address
const map = ref(null);

onMounted(() => {
  map.value = L.map('map').setView([34, -43], 5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map.value);
});
const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (file) {
    try {
      console.log('Subiendo archivo:', file);

      // Utilizar la función de utilidad para subir y obtener la URL
      const imageUrl = await uploadFileToCloudinary(file);

      // Actualizar la URL de la imagen
      imageSrc.value = imageUrl;
      console.log('Archivo subido exitosamente, URL de la imagen:', imageUrl);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  }
};

//Geolocalizar
const findLocation = async () => {
      if (!address.value.trim()) {
        alert("Please enter an address.");
        return;
      }

      try {
        // Fetch geocoding data from Nominatim API
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address.value
          )}`
        );
        const data = await response.json();

        if (data.length === 0) {
          alert("No results found for the given address.");
          return;
        }

        const { lat, lon, display_name } = data[0]; // Use the first result
        console.log(`Address found: ${display_name}, Lat: ${lat}, Lon: ${lon}`);

        // Update the map view
        map.value.setView([lat, lon], 10);

        // Add or update marker on the map
        if (marker.value) {
          map.value.removeLayer(marker.value); // Remove existing marker
        }
        marker.value = L.marker([lat, lon])
          .addTo(map.value)
          .bindPopup(`Address: ${display_name}`)
          .openPopup();
      } catch (error) {
        console.error("Error fetching geolocation data:", error);
        alert("There was an error fetching the location. Please try again.");
      }
    };

</script>

<template>
  <main>
    <!-- Subida de imagen -->
<div class="w-full max-w-4xl">
  <label class="block text-sm font-medium text-gray-700">Image</label>
  <div class="flex items-center space-x-4">
    <input v-model="imageSrc" type="text" readonly class="flex-1 border-2 border-gray-300 rounded-lg p-3" />
    <input type="file" @change="handleFileUpload" class="hidden" ref="fileInput" />
    <button @click="$refs.fileInput.click()"
      class="px-6 py-2 bg-primary text-background rounded-lg shadow-md">Upload</button>
  </div>
</div>
    <!-- Input for Address -->
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
    <div class="flex  items-center space-y-4 md:w-1/3 w-full">
          <!-- Mapa -->
          <div class="w-full max-w-4xl"> <!-- Centrado y limitación de ancho en pantallas grandes -->
            <div id="map" style="height: 500px; width: 100%;"></div>
          </div>
    </div>


  </main>
</template>